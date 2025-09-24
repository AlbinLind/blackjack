import { useState } from "react";

interface BettingProps {
    budget: number;
    onBetting: (bet: number) => void;
    youWon: number | null;
}

export function Betting({ onBetting, budget, youWon }: BettingProps) {
    const [playerBet, setPlayerBet] = useState(100);

    return (
        <div className="betting-container">
            {youWon !== null && (
                <h2 className={youWon > 0 ? "win" : youWon < 0 ? "lose" : "tie"}>
                    {youWon > 0 ? `You won $${youWon}` : youWon < 0 ? `You lost $${-youWon}` : "It's a tie!"}
                </h2>
            )}
            <h2>Your budget: ${budget}</h2>
            <h2>Your bet: ${playerBet}</h2>
            <div className="change-bet-container">
                <div className="bet-controls">
                    {[10, 50, 100, 500].map((amount) => (
                        <button className="action-button" key={amount} onClick={() => setPlayerBet(playerBet + amount)}>
                            +${amount}
                        </button>
                    ))}
                </div>
                <div className="bet-controls">
                    {[-10, -50, -100, -500].map((amount) => (
                        <button
                            className="action-button"
                            key={amount}
                            onClick={() => setPlayerBet(Math.max(0, playerBet + amount))}
                        >
                            {amount}$
                        </button>
                    ))}
                </div>
                <div className="bet-controls">
                    <button className="action-button" onClick={() => setPlayerBet(0)}>
                        Reset
                    </button>
                    <button
                        className="action-button"
                        onClick={() => onBetting(playerBet)}
                        disabled={playerBet > budget || playerBet <= 0}
                    >
                        Place Bet
                    </button>
                </div>
            </div>
        </div>
    );
}
