import { render, screen, shallow } from "@testing-library/react";
import user from "@testing-library/user-event";
import CustomDropDown from "./CustomDropDown";

describe("Custom Dropdown Component", () => {
  test("renders custom dropdown", () => {
    render(<CustomDropDown />);
    const dropdown = screen.getByRole("Combobox");
    expect(dropdown).toBeInTheDocument();
  });

  test("renders custom dropdown", async () => {
    user.setup();
    render(<CustomDropDown />);
    const element = screen.getByRole("button");
    await user.click(element);
    //expect(comp.showPanel).toBeTruthy();
  });

  // test("no of list items", () => {
  //   render(<CustomDropDown />);
  //   const list = screen.findAllByRole("listitem");
  //   console.log(list);
  //   expect(list).toHaveLength(3);
  // });
});
