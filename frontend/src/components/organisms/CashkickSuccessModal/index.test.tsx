import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CashKickSuccess from ".";
describe("CashKickSuccess", () => {
  test("should render without errors", () => {
    render(<CashKickSuccess isOpen={true} />);
  });
  test("should render close button", () => {
    const { getByText } = render(<CashKickSuccess isOpen={true}/>);
    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
  });
  test("should render text", () => {
    const { getByText } = render(<CashKickSuccess isOpen={true}/>);
    const successHeader = getByText("Cash kick launched successfully!");
    expect(successHeader).toBeInTheDocument();
  });
  test("should render View Cashkicks button", () => {
    const { getByText } = render(<CashKickSuccess isOpen={true}/>);
    const viewCashkicksButton = getByText("View Cash Kicks");
    fireEvent.click(viewCashkicksButton);
  });
});
