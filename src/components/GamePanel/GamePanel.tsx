import { GameItem } from "../../types";
import "./GamePanel.css";

interface GamePanelProps {
  readonly items: ReadonlyArray<GameItem>;
  readonly headerText?: string;
  readonly onCollect: (item: GameItem) => void;
}
const GamePanel = ({
  items,
  headerText,
  onCollect,
}: GamePanelProps) => {
  const onItemClick = (buttonLabel: string) => {
    const selectedItem = items.find((i) => i.label === buttonLabel);
    selectedItem && onCollect(selectedItem);
  };
  return (
    <div className="panel-container">
      <div className="panel-header">
        <h3>{headerText || "Collect Alphabets"}</h3>
      </div>
      <div className="panel-items">
        {items?.map((item, index) => {
          return (
            <button
              className="main-clicker"
              key={index}
              onClick={(e) =>
                onItemClick((e.target as HTMLButtonElement).innerText)
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default GamePanel;
