import { render, screen } from "@testing-library/react";
import Chips from "./Chips";

describe("Chips Component", () => {
  test("renders learn react link", () => {
    render(<Chips value="grass" />);
    const content = screen.getByText(/grass/i);
    expect(content).toBeInTheDocument();
  });
});
