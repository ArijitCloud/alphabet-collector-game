import { Score, GameItem } from ".";

export type PointAction =
  | { type: "UPDATE_POINT"; payload: string }
  | { type: "RESET_POINT" };

export type GameItemsState = {
  items: GameItem[];
  score: Required<Score>;
};
