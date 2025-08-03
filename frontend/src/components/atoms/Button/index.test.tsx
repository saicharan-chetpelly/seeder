import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonComponent from ".";

describe("Button component", () => {
  it("should render button component", () => {
    const fn = jest.fn();
    render(<ButtonComponent label={"Continue"} onClick={fn} textColor={""} />);

    const button = screen.getByText("Continue");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});