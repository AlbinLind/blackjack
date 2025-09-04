import "./App.css";
import Card from "./components/Card";
import { Rank, Suit } from "./enums";
import ActionButton from "./components/ActionButton";
import ScoreTitle from "./components/ScoreTitle";

function onHitClick() {}

function onStandClick() {}

function App() {
    return (
        <>
            <ScoreTitle playerName="Dealer" cards={[]} />
            <ScoreTitle playerName="Player" cards={[]} />
            <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={0} />
            <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={1} />
            <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={2} />
            <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={3} />
            <Card open={true} rank={Rank.jack} suit={Suit.spade} position="player" index={0} />
            <Card open={true} rank={Rank.five} suit={Suit.diamond} position="player" index={1} />
            <Card open={true} rank={Rank.two} suit={Suit.club} position="dealer" index={0} />
            <Card open={false} rank={Rank.two} suit={Suit.club} position="dealer" index={1} />
            <ActionButton name="Hit" isClickable={true} onClick={onHitClick} position={{ left: 200, top: 500 }} />
            <ActionButton name="Stand" isClickable={true} onClick={onStandClick} position={{ left: 300, top: 500 }} />
        </>
    );
}

export default App;
