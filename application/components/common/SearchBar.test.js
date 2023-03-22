import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import user from "@testing-library/user-event";

describe("Search Bar", () => {
  test("renders learn react link", () => {
    render(<SearchBar />);
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
  });

  test("check textbox value", async () => {
    user.setup();
    render(<SearchBar />);
    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "bulba");
    expect(searchInput).toHaveValue("bulba");
  });
});
