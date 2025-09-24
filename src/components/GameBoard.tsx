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
                    <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={0} />
                    <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={1} />
                    <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={2} />
                    <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={3} />
                </div>
                <div className="dealer">
                    <div className="player">
                        <ScoreTitle playerName="Dealer" cards={[]} />
                        <div className="cards">
                            <Card open={true} rank={Rank.two} suit={Suit.club} position="dealer" index={0} />
                            <Card open={false} rank={Rank.two} suit={Suit.club} position="dealer" index={1} />
                        </div>
                    </div>
                </div>
                <div className="player">
                    <ScoreTitle playerName="Player" cards={[]} />
                    <div className="cards">
                        <Card open={true} rank={Rank.jack} suit={Suit.spade} position="player" index={0} />
                        <Card open={true} rank={Rank.five} suit={Suit.diamond} position="player" index={1} />
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
