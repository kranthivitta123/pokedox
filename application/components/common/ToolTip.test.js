import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import ToolTip from "./ToolTip";

describe("ToolTip Component", () => {
  test("tooltip text dispalyed", () => {
    const { container } = render(<ToolTip description="Text content" />);
    const progressBar = container.getElementsByTagName("section");
    expect(progressBar[0]).toHaveTextContent("Text content");
  });

  // test("close method called", async () => {
  //   user.setup();
  //   const close = jest.fn();
  //   const { container } = render(<ToolTip onClick={close} />);
  //   const element = container.getElementsByTagName("span");
  //   console.log(element);
  //   await user.click(element[0]);
  //   expect(close).toHaveBeenCalledTimes(1);
  // });
});
