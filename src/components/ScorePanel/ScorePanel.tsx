import { GameItem, Score } from "../../types";
import "./ScorePanel.css";

interface ScorePanelProps {
  readonly items: ReadonlyArray<GameItem>;
  readonly score: Score;
  readonly headerText?: string;
  readonly onNewGame: () => void;
}
const ScorePanel = ({
  items,
  score,
  headerText,
  onNewGame,
}: ScorePanelProps) => {
  return (
    <div className="score-container">
      <div className="score-header">
        <h3>{headerText || "My Items"}</h3>
      </div>
      <div className="score-detail-view">
        {items?.map((item, index) => {
          return (
            <div className="item-row" key={index}>
              {item.label+"-"+item.collectCount+"-"+item.itemScore}
            </div>
          );
        })}
      </div>
      <div className="score-footer">
        <div className="score-bonus">{score?.bonus || 0}</div>
        <div className="score-total">{score?.total || 0}</div>
        <button className="btn-new-game" onClick={onNewGame}>
          {"NEW GAME"}
        </button>
      </div>
    </div>
  );
};
export default ScorePanel;
