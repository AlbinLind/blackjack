import { Suit, Rank } from "../enums";

interface CardProps {
    open: boolean;
    rank: Rank;
    suit: Suit;
    position: "dealer" | "deck" | "player";
    index: number;
}

export default function Card({ open, rank, suit, index, position }: CardProps) {
    let isBlackSuit = false;
    if (suit === Suit.club || suit === Suit.spade) {
        isBlackSuit = true;
    }
    const offset = position === "deck" ? 4 : 110
    const stackingOffset = index * offset;

    const positions = {
        deck: { top: 20 + stackingOffset, right: 100 + stackingOffset},
        dealer: { top: 100, left: 200 + stackingOffset },
        player: { top: 350, left: 200 + stackingOffset },
    };

    return (
        <div className={"card" + (open ? "" : " closed")} style={positions[position]}>
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
