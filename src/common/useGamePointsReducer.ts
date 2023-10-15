import { Reducer, useReducer } from "react";
import MockGameItems from "../mocks/GameItems";
import { GameItem, GameItemsState, PointAction } from "../types";

/**
 * Calculate bonus points based on item bonus threshold
 */
const calculateBonus = (item: GameItem): number => {
  return item.bonus &&
    item.collectCount % item.bonus.threshold === item.bonus.threshold - 1
    ? item.bonus.point - item.basePoint * item.bonus.threshold
    : 0;
};

/**
 * Calculate point for collecting an item
 */
const calculateItemCollectScore = (item: GameItem) =>
  item.basePoint + calculateBonus(item);

/**
 * Calculate collect count and item level point score for an item
 */
const calculateItemScore = (item: GameItem) => ({
  ...item,
  collectCount: item.collectCount + 1,
  itemScore: item.itemScore + item.basePoint + calculateBonus(item),
});

/**
 * Reset Item level score
 */
const resetItemScore = (item: GameItem): GameItem => ({
  ...item,
  collectCount: 0,
  itemScore: 0,
});

/**
 * Reducer function for points calculations
 */
const pointReducer = (state: GameItemsState, action: PointAction) => {
  switch (action.type) {
    case "UPDATE_POINT": {
      const currentItem = state.items.find((i) => i.label === action.payload);
      return {
        ...state,
        items: state.items.map((item) =>
          action.payload === item.label ? calculateItemScore(item) : item
        ),
        score: {
          bonus:
            state.score.bonus + (currentItem ? calculateBonus(currentItem) : 0),
          total:
            state.score.total +
            (currentItem ? calculateItemCollectScore(currentItem) : 0),
        },
      };
    }
    case "RESET_POINT":
      return {
        ...state,
        items: state.items.map((item) => resetItemScore(item)),
        score: {
          bonus: 0,
          total: 0,
        },
      };
    default:
      return state;
  }
};

/**
 * init reducer state with mock game items
 */
const initItems = (): GameItemsState => ({
  items: MockGameItems(),
  score: {
    total: 0,
    bonus: 0,
  },
});

/**
 * Game points reducer 
 */
const useGamePointsReducer = () => {
  const [state, dispatch] = useReducer<
    Reducer<GameItemsState, PointAction>,
    undefined
  >(pointReducer, undefined, initItems);

  return { items: state.items, score: state.score, dispatch };
};

export default useGamePointsReducer;
