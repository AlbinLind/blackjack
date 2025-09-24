import ActionButton from "./ActionButton";
import Card from "./Card";
import ScoreTitle from "./ScoreTitle";
import { Rank, Suit } from "../enums";

function onHitClick() {}

function onStandClick() {}

export function GameBoard() {
    return (
        <>
            <div className="board">
                <div className="deck">
                    <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" />
                    <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" />
                    <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" />
                    <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" />
                </div>
                <div className="dealer">
                    <div className="player">
                        <ScoreTitle playerName="Dealer" cards={[]} />
                        <div className="cards">
                            <Card open={true} rank={Rank.two} suit={Suit.club} position="dealer" />
                            <Card open={false} rank={Rank.two} suit={Suit.club} position="dealer" />
                        </div>
                    </div>
                </div>
                <div className="player">
                    <ScoreTitle playerName="Player" cards={[]} />
                    <div className="cards">
                        <Card open={true} rank={Rank.jack} suit={Suit.spade} position="player" />
                        <Card open={true} rank={Rank.five} suit={Suit.diamond} position="player" />
                    </div>
                </div>
                <div className="actions">
                    <ActionButton name="Hit" isClickable={true} onClick={onHitClick} />
                    <ActionButton name="Stand" isClickable={true} onClick={onStandClick} />
                </div>
            </div>
        </>
    );
}
