import { Fragment } from "react";
import { ScoreDetailViewHeaderLabels } from "../../common/sharedStrings";
import { GameItem } from "../../types";
import "./ScoreDetailView.css";

interface ScoreDetailViewProps {
  readonly items: ReadonlyArray<GameItem>;
}
const ScoreDetailView = ({ items }: ScoreDetailViewProps) => {
  return (
    <div className="score-detail-view">
      <div className="header">
        {ScoreDetailViewHeaderLabels.map((headerLabel, index) => (
          <h3 key={index}>{headerLabel}</h3>
        ))}
      </div>
      <div className="body">
        {items?.length > 0 &&
          items.map((item, index) => {
            return item.collectCount > 0 ? (
              <div className="item-row" key={index}>
                <div>{item.label}</div>
                <data>{item.collectCount}</data>
                <data>{item.itemScore}</data>
              </div>
            ) : (
              <Fragment key={index}></Fragment>
            );
          })}
      </div>
    </div>
  );
};
export default ScoreDetailView;
