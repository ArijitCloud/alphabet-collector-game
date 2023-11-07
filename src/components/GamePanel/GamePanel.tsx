import { useEffect, useState } from "react";
import { GamePanelDefaultHeading } from "../../common/sharedStrings";
import { GameItem } from "../../types";
import "./GamePanel.css";

interface GamePanelProps {
  readonly items: ReadonlyArray<GameItem>;
  readonly headerText?: string;
  readonly onCollect: (item: GameItem) => void;
}

const randomPosition = () => {
  return {
    transform: `translateX(${Math.floor(
      Math.random() * 100-50
    )}%)  translateY(${Math.floor(
      Math.random() * 200-50
    )}%) rotate(${Math.floor(Math.random() * 180)}deg)`,
  };
};

const GamePanel = ({ items, headerText, onCollect }: GamePanelProps) => {
  const onItemClick = (buttonLabel: string) => {
    const selectedItem = items.find((i) => i.label === buttonLabel);
    selectedItem && onCollect(selectedItem);
  };

  const [buttonStyles, setButtonStyles] = useState(() =>
    items.map(() => randomPosition())
  );

  // Update button styles every 1 second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newStyles = items?.map(() => randomPosition());
      setButtonStyles(newStyles);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [items]);

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h2>{headerText || GamePanelDefaultHeading}</h2>
      </div>
      <div className="panel-items">
        {items?.map((item, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) =>
                onItemClick((e.target as HTMLButtonElement).innerText)
              }
              style={buttonStyles[index]}
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
