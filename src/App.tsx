import "./App.css";
import GamePanel from "./components/GamePanel/GamePanel";
import ScorePanel from "./components/ScorePanel/ScorePanel";
import GameItems from "./mocks/GameItems";
import useItemScore from "./useItemScore";

function App() {
  // const onCollect = (item: GameItem) => {
  // };

  // const onNewGame = () => {};
  const { allItems, totalScore, updateScore, resetScore } =
    useItemScore(GameItems);

  return (
    <div className="main-container">
      <GamePanel
        items={allItems}
        onCollect={(item) => updateScore(item.label)}
      ></GamePanel>
      <ScorePanel
        items={allItems}
        score={totalScore}
        onNewGame={resetScore}
      ></ScorePanel>
    </div>
  );
}

export default App;
