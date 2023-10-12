import { useState } from "react";
import { GameItem } from "./types";

const calculateBonus = (item: GameItem): number => {
  return item.bonus &&
    item.collectCount % item.bonus.threshold === item.bonus.threshold - 1
    ? item.bonus.point - item.basePoint * item.bonus.threshold
    : 0;
};

const calculateItemCollectScore = (item: GameItem) =>
  item.basePoint + calculateBonus(item);

const calculateItemScore = (item: GameItem) => ({
  ...item,
  collectCount: item.collectCount + 1,
  itemScore: item.itemScore + calculateItemCollectScore(item),
});

const resetItemScore = (item: GameItem): GameItem => ({
  ...item,
  collectCount: 0,
  itemScore: 0,
});

const useItemScore = (initAllItems: () => Array<GameItem>) => {
  const [allItems, setAllItems] = useState(initAllItems);
  const [totalScore, setTotalScore] = useState(() => ({ total: 0, bonus: 0 }));

  const updateScore = (label: string) => {
    const currentItem = allItems.find((i) => i.label === label);
    setAllItems((prev) =>
      prev.map((item) =>
        label === item.label ? calculateItemScore(item) : item
      )
    );
    setTotalScore((prev) => {
      return {
        bonus: prev.bonus + (currentItem ? calculateBonus(currentItem) : 0),
        total:
          prev.total +
          (currentItem ? calculateItemCollectScore(currentItem) : 0),
      };
    });
  };

  const resetScore = () => {
    setAllItems((prev) => prev.map((item) => resetItemScore(item)));
    setTotalScore({ bonus: 0, total: 0 });
  };

  return { allItems, totalScore, updateScore, resetScore };
};

export default useItemScore;
