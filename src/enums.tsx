export enum Suit {
    heart = "♥",
    diamond = "♦",
    club = "♣",
    spade = "♠",
}

export type BlackSuits = Suit.club | Suit.spade;
export type RedSuits = Suit.heart | Suit.diamond;

export enum Rank {
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6,
    seven = 7,
    eight = 8,
    nine = 9,
    ten = 10,
    jack = "J",
    queen = "Q",
    king = "K",
    ace = "A",
}

export interface Card {
    suit: Suit;
    rank: Rank;
}