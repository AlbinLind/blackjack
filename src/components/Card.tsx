import { Suit, Rank } from "../enums";

interface CardProps {
    open: boolean;
    rank: Rank;
    suit: Suit;
    position: "dealer" | "deck" | "player";
    index: number;
}

export default function Card({ open, rank, suit}: CardProps) {
    let isBlackSuit = false;
    if (suit === Suit.club || suit === Suit.spade) {
        isBlackSuit = true;
    }
    return (
        <div className={"card" + (open ? "" : " closed")}>
            {open ? (
                <div className={isBlackSuit ? "black" : "red"}>
                    <p className="rank">{rank}</p>
                    <p className="suit">{suit}</p>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
