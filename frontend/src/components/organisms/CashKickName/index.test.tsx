import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NameCashkick } from ".";
describe("NameCashkick", () => {
  const mockChange=jest.fn();
  test("should render without errors", () => {
    render(<NameCashkick onNameChange={mockChange} isOpen={true} />);
  });
  test("should render input field", () => {
    const { getByPlaceholderText } = render(<NameCashkick onNameChange={mockChange} isOpen={true}/>);
    const inputElement = getByPlaceholderText("Ex: marketing expenses");
    expect(inputElement).toBeInTheDocument();
  });

  test("should enable Submit button when a name is entered", () => {
    const { getByPlaceholderText, getByText } = render(<NameCashkick onNameChange={mockChange} isOpen={true}/>);
    const inputElement = getByPlaceholderText("Ex: marketing expenses");
    const submitButton = getByText("Create Cash Kick");
    fireEvent.change(inputElement, { target: { value: "Test Cashkick" } });
    expect(submitButton).toBeEnabled();
  });
  test("should render close button", () => {
    const { getByText } = render(<NameCashkick onNameChange={mockChange} isOpen={true}/>);
    const closeButton = getByText("Cancel");
    fireEvent.click(closeButton);
  });

  test("should render submit button", () => {
    const { getByPlaceholderText, getByText } = render(<NameCashkick onNameChange={mockChange} isOpen={true}/>);
    const inputElement = getByPlaceholderText("Ex: marketing expenses");
    const submitButton = getByText("Create Cash Kick");
    fireEvent.change(inputElement, { target: { value: "Test Cashkick" } });
    fireEvent.click(submitButton);
  });
});