import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IconButton } from ".";

describe("Social Card", () => {
  test("should render the Social Card", () => {
    const { getByText } = render(
      <IconButton
        title="Google"
        iconSrc="/public/assets/icons/google.svg"
        iconAlt="Google"
        disabled={false}
        onClick={() => {}}
      />
    );
    expect(getByText("Google")).toBeInTheDocument();
  });

  test("should all onClick when the component is not disabled", () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <IconButton
        title={"Google"}
        iconSrc="/public/assets/icons/google.svg"
        disabled={false}
        onClick={mockOnClick}
      />
    );
    const socialCardElement = getByTestId("social-card");
    fireEvent.click(socialCardElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should render the disabled component", () => {
    const { getByText } = render(
      <IconButton
        title={"Google"}
        iconSrc="/public/assets/icons/google.svg"
        iconAlt="Google"
        disabled={true}
      />
    );
    expect(getByText("Google")).toBeInTheDocument();
  });
});
