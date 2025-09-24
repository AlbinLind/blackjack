import { useState } from "react";
import "./App.css";
import { GameBoard } from "./components/GameBoard";
import { type Card, Rank, Suit } from "./enums";

function App() {
    const [cardsInDeck, setCardsInDeck] = useState<Card[]>(getShuffledDeck());
    const [playerCards, setPlayerCards] = useState<Card[]>([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerCards, setDealerCards] = useState<Card[]>([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [winner, setWinner] = useState("");

    if (playerCards.length == 0) {
        const { remainingCards } = dealCardsTo("player", 2, cardsInDeck, playerCards);
        dealCardsTo("dealer", 1, remainingCards, dealerCards);
    }

    function hit() {
        dealCardsTo("player", 1, cardsInDeck, playerCards);
    }

    function dealCardsTo(
        dealTo: "dealer" | "player",
        nCards: number,
        remainingCards: Card[],
        currentCards: Card[]
    ): { remainingCards: Card[] } {
        let setCardFunction = setPlayerCards;
        let setScoreFunction = setPlayerScore;
        if (dealTo == "dealer") {
            setCardFunction = setDealerCards;
            setScoreFunction = setDealerScore;
        }
        const dealt = dealCards(remainingCards, nCards);
        const newCards = [...currentCards, ...dealt.dealtCards];

        setCardsInDeck(dealt.remainingCards);
        setCardFunction(newCards);
        const newScore = calculateScore(newCards);
        setScoreFunction(newScore);
        return { remainingCards: dealt.remainingCards };
    }

    function stand() {
        function dealerTurn(currentDealerCards: Card[], currentDeck: Card[]) {
            const score = calculateScore(currentDealerCards);
            if (score < 17) {
                const { dealtCards, remainingCards } = dealCards(currentDeck, 1);
                const newDealerCards = [...currentDealerCards, ...dealtCards];
                setDealerCards(newDealerCards);
                setDealerScore(calculateScore(newDealerCards));
                setCardsInDeck(remainingCards);
                // Continue dealer's turn after state updates
                setTimeout(() => dealerTurn(newDealerCards, remainingCards), 500);
            }
            if (score >= 17) {
                if (score <= 21 && playerScore == score) {
                    setWinner("a tie");
                } else if (score > 21 && playerScore <= 21) {
                    setWinner("the Player winning");
                } else if (score <= 21 && playerScore > 21) {
                    setWinner("the dealer winning");
                } else if (score > 21 && playerScore > 21) {
                    setWinner("a tie");
                } else if (score > playerScore) {
                    setWinner("the Dealer winning");
                } else if (playerScore <= 21 && playerScore > score) {
                    setWinner("the Player winning");
                }
            }
        }
        dealerTurn(dealerCards, cardsInDeck);
    }

    function reset() {
        const remainingCards = dealCardsTo("player", 2, cardsInDeck, []);
        dealCardsTo("dealer", 1, remainingCards.remainingCards, []);
        setWinner("");
    }

    return (
        <>
            <h1 className="winning-title">{winner.length != 0 ? "Game resulted in " + winner : ""}</h1>
            <GameBoard
                cardsInDeck={cardsInDeck.length}
                playerCards={playerCards}
                playerScore={playerScore}
                dealerCards={dealerCards}
                dealerClosedCards={dealerCards.length == 1 ? 1 : 0}
                dealerScore={dealerScore}
                onHitClick={hit}
                onStandClick={stand}
                isDone={winner.length != 0}
                onReset={reset}
            />
        </>
    );
}

function calculateScore(cards: Card[]): number {
    let aces = 0;
    let score = 0;

    cards.forEach((card) => {
        if (card.rank == Rank.ace) {
            aces += 1;
            return;
        }
        if (card.rank == Rank.jack || card.rank == Rank.king || card.rank == Rank.queen || card.rank == Rank.ten) {
            score += 10;
            return;
        }
        if (card.rank == Rank.two) {
            score += 2;
            return;
        }
        if (card.rank == Rank.three) {
            score += 3;
            return;
        }
        if (card.rank == Rank.four) {
            score += 4;
            return;
        }
        if (card.rank == Rank.five) {
            score += 5;
            return;
        }
        if (card.rank == Rank.six) {
            score += 6;
            return;
        }
        if (card.rank == Rank.seven) {
            score += 7;
            return;
        }
        if (card.rank == Rank.eight) {
            score += 8;
            return;
        }
        if (card.rank == Rank.nine) {
            score += 9;
            return;
        }
    });
    for (let i = 0; i < aces; i++) {
        if (score > 11) {
            score += 1;
        } else {
            score += 11;
        }
    }

    return score;
}

function dealCards(availableCards: Card[], numberOfCards: number): { dealtCards: Card[]; remainingCards: Card[] } {
    const dealtCards = availableCards.slice(0, numberOfCards);
    const remainingCards = availableCards.slice(numberOfCards);
    return { dealtCards, remainingCards };
}

function getShuffledDeck(): Card[] {
    const deck: Card[] = [];
    const suits = [Suit.club, Suit.diamond, Suit.heart, Suit.spade];
    const ranks = [
        Rank.ace,
        Rank.two,
        Rank.three,
        Rank.four,
        Rank.five,
        Rank.six,
        Rank.seven,
        Rank.eight,
        Rank.nine,
        Rank.ten,
        Rank.jack,
        Rank.queen,
        Rank.king,
    ];

    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            deck.push({ suit, rank });
        });
    });

    return deck.sort(() => Math.random() - 0.5);
}

export default App;
