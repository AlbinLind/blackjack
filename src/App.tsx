import "./App.css";
import Card from "./components/Card";
import { Rank, Suit } from "./enums";

function App() {
    return (
        <>
            <Card open={false} rank={Rank.ace} suit={Suit.heart} />
            <Card open={true} rank={Rank.five} suit={Suit.diamond} />
            <Card open={true} rank={Rank.jack} suit={Suit.spade} />
        </>
    );
}

export default App;
