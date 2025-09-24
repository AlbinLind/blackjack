import { type Card, Rank, Suit } from "./enums";

export function calculateScore(cards: Card[]): number {
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
export function getShuffledDeck(nDecks: number): Card[] {
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

    for (let i = 0; i < nDecks; i++) {
        suits.forEach((suit) => {
            ranks.forEach((rank) => {
                deck.push({ suit, rank });
            });
        });
    }

    return deck.sort(() => Math.random() - 0.5);
}

export function dealCards(
    availableCards: Card[],
    numberOfCards: number
): { dealtCards: Card[]; remainingCards: Card[] } {
    const dealtCards = availableCards.slice(0, numberOfCards);
    const remainingCards = availableCards.slice(numberOfCards);
    return { dealtCards, remainingCards };
}

export enum Result {
    playerWon = "playerWon",
    dealerWon = "dealerWon",
    tie = "tie",
    bothBust = "bothBust",
    blackjack = "blackjack",
}
