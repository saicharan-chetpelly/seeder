import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chip from ".";
describe("CustomChip ", () => {
  test("Render Chip with label", () => {
    const testLabel = "Test Label";
    const { getByText } = render(<Chip label={testLabel} />);
    expect(getByText(testLabel)).toBeInTheDocument();
  });

  test("should have small size", () => {
    const { getByText } = render(<Chip label="Test Chip" size="small" />);
    expect(getByText("Test Chip")).toHaveClass("MuiChip-labelSmall");
  });
  test("should have  medium size", () => {
    const { getByText } = render(<Chip label="Test Chip" />);
    expect(getByText("Test Chip")).toHaveClass("MuiChip-labelMedium");
  });
});
