import "./App.css";
import useGamePointsReducer from "./common/useGamePointsReducer";
import GamePanel from "./components/GamePanel/GamePanel";
import ScorePanel from "./components/ScorePanel/ScorePanel";
import { GameItem } from "./types";

function App() {
  const { items, score, dispatch } = useGamePointsReducer();
  
  const onCollect = (item: GameItem) => {
    dispatch({ type: "UPDATE_POINT", payload: item.label });
  };

  const onNewGame = () => {
    dispatch({ type: "RESET_POINT" });
  };

  return (
    <div className="main-container">
      <GamePanel items={items} onCollect={onCollect}></GamePanel>
      <ScorePanel
        items={items}
        score={score}
        onNewGame={onNewGame}
      ></ScorePanel>
    </div>
  );
}

export default App;
