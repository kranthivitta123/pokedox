import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("Progress Bar Component", () => {
  test("renders learn react link", () => {
    render(<ProgressBar value="60" />);
    const progressBar = screen.queryByText("60");
    expect(progressBar).toBeInTheDocument();
  });
});
