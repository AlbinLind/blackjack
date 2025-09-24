interface ScoreTitleProps {
    playerName: string;
    score: number;
}

export default function ScoreTitle({ playerName, score }: ScoreTitleProps) {
    const isBust = score > 21;
    return (
        <div className="score-container">
            <p style={isBust ? { color: "red" } : {}}>
                {playerName} {isBust ? "is bust" : ""} ({score})
            </p>
        </div>
    );
}
