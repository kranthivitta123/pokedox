import { render, screen } from "@testing-library/react";
import Banner from "./Banner";

describe("Poekmon Banner", () => {
  test("renders learn react link", () => {
    render(<Banner />);
    const pageHeader = screen.getByText("Pokédex");
    const pageContent = screen.getByText(
      "Search for any Pokémon that exists on the planet"
    );
    expect(pageHeader).toBeInTheDocument();
    expect(pageContent).toBeInTheDocument();
  });
});
