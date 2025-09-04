import "./App.css";
import Card from "./components/Card";
import { Rank, Suit } from "./enums";

function App() {
    return (
        <>
            <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={0}/>
            <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={1}/>
            <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={2}/>
            <Card open={false} rank={Rank.ace} suit={Suit.heart} position="deck" index={3}/>
            <Card open={true} rank={Rank.jack} suit={Suit.spade} position="player" index={0}/>
            <Card open={true} rank={Rank.five} suit={Suit.diamond} position="player" index={1}/>
            <Card open={true} rank={Rank.two} suit={Suit.club} position="dealer" index={0}/>
            <Card open={false} rank={Rank.two} suit={Suit.club} position="dealer" index={1}/>
        </>
    );
}

export default App;
