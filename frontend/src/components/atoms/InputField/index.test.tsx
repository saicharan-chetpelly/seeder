import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import InputField from "./index";
describe("InputField", () => {
  test("should show the textField", () => {
    render(<InputField placeholder="email" width={"434px"} />);
    const textElement = screen.getByPlaceholderText("email");
    expect(textElement).toBeInTheDocument();
  });
  test("should handles the value change of the input field", () => {
    const handleChange = jest.fn((event) => {
      return {
        target: {
          value: event.target.value,
        },
      };
    });
    render(
      <InputField
        placeholder="Test Input"
        onChange={handleChange}
        width={"434px"}
      />
    );
    const inputElement = screen.getByPlaceholderText("Test Input");
    const value = "test";
    fireEvent.change(inputElement, { target: { value: value } });
    expect(handleChange).toHaveBeenCalled();
  });
  test("should show the helper text id the errorMessage is true", () => {
    render(
      <InputField
        placeholder="Test Input"
        errorMessage="email id is incorrect"
        width={"434px"}
      />
    );
    expect(screen.getByText("email id is incorrect")).toBeInTheDocument();
  });
});
