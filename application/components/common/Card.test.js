import { render, screen } from "@testing-library/react";
import Card from "./Card";
import user from "@testing-library/user-event";

describe("Image Card", () => {
  test("renders card to Ui", async () => {
    user.setup();
    const onclick = jest.fn();
    const { container } = render(<Card onClick={onclick} />);
    const element = container.getElementsByTagName("div");
    await user.click(element[0]);
    expect(onclick).toHaveBeenCalled();
  });
});
