import { useState } from "react";
import "./App.css";
import { GameLogic } from "./components/GameLogic";
import { getShuffledDeck, Result } from "./gameUtils";
import type { Card } from "./enums";
import { Betting } from "./components/Betting";

function App() {
    const [playerBudget, setPlayerBudget] = useState(1000);
    const [playerBet, setPlayerBet] = useState<null | number>(null);
    const [youWon, setYouWon] = useState<null | number>(null);
    const [cardsInDeck, setCardsInDeck] = useState<Card[]>(getShuffledDeck(3));

    function onFinish(result: Result) {
        const currentBet = playerBet;
        let winningAmount = 0;
        if (currentBet === null) {
            throw new Error("Bet is null, but we have finished a game");
        }
        if (result == Result.blackjack) {
            winningAmount = currentBet * 2.5;
            setPlayerBudget(playerBudget + winningAmount);
        } else if (result == Result.playerWon) {
            winningAmount = currentBet * 2;
            setPlayerBudget(playerBudget + winningAmount);
        } else if (result == Result.tie) {
            winningAmount = currentBet;
            setPlayerBudget(playerBudget + winningAmount);
        }
        setYouWon(winningAmount - currentBet);
    }

    function onBetting(bet: number) {
        setPlayerBet(bet);
        setPlayerBudget(playerBudget - bet);
    }

    function onReset() {
        setPlayerBet(null);
    }

    return (
        <>
            {playerBet ? (
                <GameLogic
                    onFinish={onFinish}
                    onReset={onReset}
                    cardsInDeck={cardsInDeck}
                    setCardsInDeck={setCardsInDeck}
                />
            ) : (
                <Betting onBetting={onBetting} budget={playerBudget} youWon={youWon} />
            )}
        </>
    );
}

export default App;
