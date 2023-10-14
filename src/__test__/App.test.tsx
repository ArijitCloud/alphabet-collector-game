/* eslint-disable @typescript-eslint/no-unsafe-call */
import { render, screen } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';

describe("App", () => {
  it("renders a new game button", () => {
    render(<App />);
    const newGameButton = screen.getByText("NEW GAME");
    expect(newGameButton).toBeInTheDocument();
  });
});
