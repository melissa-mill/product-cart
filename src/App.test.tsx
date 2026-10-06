import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("adds a product to the cart", async () => {
    const user = userEvent.setup();

    render(<App />);

    const addButton = screen.getByRole("button", {
      name: /add to cart waffle/i,
    });

    await user.click(addButton);

    expect(
      screen.getByRole("heading", { name: /your cart \(1\)/i }),
    ).toBeInTheDocument();

    const cart = screen
      .getByRole("heading", { name: /your cart \(1\)/i })
      .closest("div");

    expect(cart).not.toBeNull();
    expect(within(cart as HTMLElement).getByText("Waffle with Berries"));
  });

  it("adds the same product twice and updates the cart quantity to 2", async () => {
    const user = userEvent.setup();

    render(<App />);

    const addButton = screen.getByRole("button", {
      name: /add to cart waffle/i,
    });

    await user.click(addButton);

    const increaseButton = screen.getByRole("button", {
      name: /add to cart waffle/i,
    });

    await user.click(increaseButton);

    const cartHeading = screen.getAllByRole("heading", {
      name: /your cart \(\d+\)/i,
    });

    expect(
      cartHeading.at(-1),
      "the cart should show the latest quantity",
    ).toHaveTextContent("Your cart (2)");
  });
});
