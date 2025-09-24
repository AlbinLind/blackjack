import ActionButton from "./ActionButton";
import Card from "./Card";
import ScoreTitle from "./ScoreTitle";
import { Rank, Suit, type Card as CardType } from "../enums";

interface GameBoardProp {
    cardsInDeck: number;
    playerCards: CardType[];
    playerScore: number;
    dealerCards: CardType[];
    dealerScore: number;
    dealerClosedCards: number;
    onHitClick: () => void;
    onStandClick: () => void;
    isDone: boolean;
    onReset: () => void;
}

export function GameBoard({
    cardsInDeck,
    dealerCards,
    playerCards,
    playerScore,
    dealerClosedCards,
    dealerScore,
    isDone,
    onHitClick,
    onStandClick,
    onReset,
}: GameBoardProp) {
    cardsInDeck = Math.min(cardsInDeck, 10);

    return (
        <>
            <div className="board">
                <div className="deck">
                    {[...Array(cardsInDeck)].map((_, i) => (
                        <Card key={i} open={false} rank={Rank.ace} suit={Suit.club} position="deck" />
                    ))}
                </div>
                <div className="dealer">
                    <div className="player">
                        <ScoreTitle playerName="Dealer" score={dealerScore} />
                        <div className="cards">
                            {dealerCards.map((card, i) => (
                                <Card key={i} open={true} rank={card.rank} suit={card.suit} position="dealer" />
                            ))}
                            {[...Array(dealerClosedCards)].map((_, i) => (
                                <Card key={i} open={false} rank={Rank.ace} suit={Suit.club} position="deck" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="player">
                    <ScoreTitle playerName="Player" score={playerScore} />
                    <div className="cards">
                        {playerCards.map((card, i) => (
                            <Card key={i} open={true} rank={card.rank} suit={card.suit} position="player" />
                        ))}
                    </div>
                </div>
                <div className="actions">
                    <ActionButton name="Hit" isClickable={playerScore < 21} onClick={onHitClick} />
                    <ActionButton name="Stand" isClickable={true} onClick={onStandClick} />
                    {isDone && <ActionButton name="Reset" isClickable={true} onClick={onReset} />}
                </div>
            </div>
        </>
    );
}
