import useGamePointsReducer from "./useGamePointsReducer";
import { act, renderHook } from "@testing-library/react";

describe("useGamePointsReducer", () => {
  it("should initialize with the correct items object structure", () => {
    const { result } = renderHook(() => useGamePointsReducer());
    const { items } = result.current;
    expect(items[0]).toHaveProperty("label");
    expect(items[0]).toHaveProperty("basePoint");
    expect(items[0]).toHaveProperty("bonus");
    expect(items[0]).toHaveProperty("collectCount");
    expect(items[0]).toHaveProperty("itemScore");
  });
  it("should initialize with the correct score object structure", () => {
    const { result } = renderHook(() => useGamePointsReducer());
    const { score } = result.current;
    expect(score).toHaveProperty("total");
    expect(score).toHaveProperty("bonus");
  });
  it("should initialize with the correct state", () => {
    const { result } = renderHook(() => useGamePointsReducer());
    const { items, score } = result.current;
    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(score.total).toBe(0);
    expect(score.bonus).toBe(0);
  });

  it("should update the score correctly when an item is collected", () => {
    const { result } = renderHook(() => useGamePointsReducer());
    const { dispatch } = result.current;

    act(() => {
      dispatch({ type: "UPDATE_POINT", payload: "A" });
    });

    const { items, score } = result.current;
    expect(items[0].collectCount).toBe(1);
    expect(items[0].itemScore).toBe(50);
    expect(score.total).toBe(50);
    expect(score.bonus).toBe(0);
  });
  it("should update the score correctly when an item is collected multiple times", () => {
    const { result } = renderHook(() => useGamePointsReducer());
    const { dispatch } = result.current;

    // Collect item A twice
    act(() => {
      dispatch({ type: "UPDATE_POINT", payload: "A" });
      dispatch({ type: "UPDATE_POINT", payload: "A" });
    });

    const { items, score } = result.current;
    expect(items[0].collectCount).toBe(2);
    expect(items[0].itemScore).toBe(100);
    expect(score.total).toBe(100);
    expect(score.bonus).toBe(0);
  });
  it("should update the score correctly when items with a bonus is collected", () => {
    const { result } = renderHook(() => useGamePointsReducer());
    const { dispatch } = result.current;

    // Collect item B then A then B
    act(() => {
      dispatch({ type: "UPDATE_POINT", payload: "B" });
      dispatch({ type: "UPDATE_POINT", payload: "A" });
      dispatch({ type: "UPDATE_POINT", payload: "B" });
    });

    const { items, score } = result.current;
    const itemB = items.find((i) => i.label === "B");
    expect(itemB?.collectCount).toBe(2);
    expect(itemB?.itemScore).toBe(90);
    expect(score.total).toBe(140);
    expect(score.bonus).toBe(30);
  });

  it("should reset the score correctly", () => {
    const { result } = renderHook(() => useGamePointsReducer());
    const { dispatch } = result.current;

    // Collect item B then A then B
    act(() => {
      dispatch({ type: "UPDATE_POINT", payload: "B" });
      dispatch({ type: "UPDATE_POINT", payload: "A" });
      dispatch({ type: "UPDATE_POINT", payload: "B" });
    });

    // Reset
    act(() => {
      dispatch({ type: "RESET_POINT" });
    });

    const { items, score } = result.current;
    expect(items[0].collectCount).toBe(0);
    expect(items[0].itemScore).toBe(0);
    expect(score.total).toBe(0);
    expect(score.bonus).toBe(0);
  });
});
