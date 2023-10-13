import { GamePanelDefaultHeading } from "../../common/sharedStrings";
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
        <h2>{headerText || GamePanelDefaultHeading}</h2>
      </div>
      <div className="panel-items">
        {items?.map((item, index) => {
          return (
            <button type="button"
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
