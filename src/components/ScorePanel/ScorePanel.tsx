import {
  ScoreBonusLabel,
  ScorePanelDefaultHeading,
  ScoreTotalLabel,
} from "../../common/sharedStrings";
import { GameItem, Score } from "../../types";
import ScoreDetailView from "../ScoreDetailView/ScoreDetailView";
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
        <h2>{headerText || ScorePanelDefaultHeading}</h2>
      </div>
      <ScoreDetailView items={items} />
      <div className="score-footer">
        <div>{ScoreBonusLabel}</div>
        <data>{score?.bonus || 0}</data>
        <div>{ScoreTotalLabel}</div>
        <data>{score?.total || 0}</data>
        <button type="reset" onClick={onNewGame}>
          {"NEW GAME"}
        </button>
      </div>
    </div>
  );
};
export default ScorePanel;
