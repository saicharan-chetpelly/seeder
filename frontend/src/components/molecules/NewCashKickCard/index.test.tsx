import React from "react";
import { render, screen } from "@testing-library/react";
import NewCashkickCard from "./index";

describe("NewCashkickCard component", () => {
  it("should renders with provided props", () => {
    const balanceAmount = "$880.000.00";
    const cashKickHeader = "Your new Cash kick";
    const buttonLabel = "Click Me";
    const handleClick = jest.fn();

    render(
      <NewCashkickCard
        balanceAmount={balanceAmount}
        cashKickHeader={cashKickHeader}
        buttonLabel={buttonLabel}
        handleClick={handleClick}
      />
    );
    const headerElement = screen.getByText(cashKickHeader);
    const balanceElement = screen.getByText(balanceAmount);
    const buttonElement = screen.getByText(buttonLabel);
    expect(headerElement).toBeInTheDocument();
    expect(balanceElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
