import type { Card } from "../enums";

interface ScoreTitleProps {
    playerName: string;
    cards: Card[];
}

export default function ScoreTitle({playerName, cards}: ScoreTitleProps) {
    const score = calculateScore(cards);
    return <div className="score-container"><p>{playerName} ({score})</p></div>

} 

function calculateScore(cards: Card[]): number {
    if (cards) {
        return 1.0
    }
    return 0.0
}