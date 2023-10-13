import { useState } from "react";
import "./App.css";
import useGamePointsReducer from "./common/useGamePointsReducer";
import GamePanel from "./components/GamePanel/GamePanel";
import PanelToggleButton from "./components/PanelToggleButton/PanelToggleButton";
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

  const [menuOpen, setMenuOpen] = useState(() => false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="main-container">
      <GamePanel items={items} onCollect={onCollect}></GamePanel>
      <ScorePanel
        isOpen={menuOpen}
        items={items}
        score={score}
        onNewGame={onNewGame}
      ></ScorePanel>
      <PanelToggleButton onButtonClick={toggleMenu}></PanelToggleButton>
    </div>
  );
}

export default App;
