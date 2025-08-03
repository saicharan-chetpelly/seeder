import { screen, render, fireEvent } from "@testing-library/react";
import { CustomSlider } from ".";

describe("Custom slider testcases", () => {
  it("should trigger onChange fn when slider value changes", () => {
    const mockHandleChange = jest.fn();
    render(<CustomSlider onChange={mockHandleChange} max={100} />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "50" } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });
});
