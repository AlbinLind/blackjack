import { useState, type Dispatch, type SetStateAction } from "react";
import { GameBoard } from "./GameBoard";
import type { Card } from "../enums";
import { dealCards, calculateScore, Result } from "../gameUtils";

export interface GameLogicProps {
    onFinish: (result: Result) => void;
    onReset: () => void;
    cardsInDeck: Card[];
    setCardsInDeck: Dispatch<SetStateAction<Card[]>>;
}

export function GameLogic({ onFinish, onReset, cardsInDeck, setCardsInDeck }: GameLogicProps) {
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
                if (playerScore == 21 && score != 21) {
                    onFinish(Result.blackjack);
                    setWinner("the player winning");
                } else if (score <= 21 && playerScore == score) {
                    setWinner("a tie");
                    onFinish(Result.tie);
                } else if (score > 21 && playerScore <= 21) {
                    setWinner("the Player winning");
                    onFinish(Result.playerWon);
                } else if (score <= 21 && playerScore > 21) {
                    setWinner("the dealer winning");
                    onFinish(Result.dealerWon);
                } else if (score > 21 && playerScore > 21) {
                    setWinner("a tie");
                    onFinish(Result.bothBust);
                } else if (score > playerScore) {
                    setWinner("the Dealer winning");
                    onFinish(Result.dealerWon);
                } else if (playerScore <= 21 && playerScore > score) {
                    setWinner("the Player winning");
                    onFinish(Result.playerWon);
                } else {
                    throw new Error("Are we ever here?");
                }
            }
        }
        dealerTurn(dealerCards, cardsInDeck);
    }

    function reset() {
        const remainingCards = dealCardsTo("player", 2, cardsInDeck, []);
        dealCardsTo("dealer", 1, remainingCards.remainingCards, []);
        setWinner("");
        onReset();
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
