import React from "react";
import { render, screen } from "@testing-library/react";
import ImageWithTypographyAndButton from "./index";
import FinancePlanning from "../../../../public/assets/images/FinancePlanning.svg";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: () => ({
    palette: {
      elevation: {
        color1: "#201F24",
      },
      primary: {
        "400": "#B4A9FF",
      },
    },
  }),
}));

describe("ImageWithTypographyAndButton component", () => {
  it("should renders the component with an image and body", () => {
    render(
      <ImageWithTypographyAndButton
        image={FinancePlanning}
        body={<div>Sample Body</div>}
      />
    );
    const image = screen.getByAltText("heading");
    const body = screen.getByText("Sample Body");
    expect(image).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it("should renders a button if buttonLabel is provided", () => {
    render(
      <ImageWithTypographyAndButton
        image={FinancePlanning}
        body={<div>Sample Body</div>}
        buttonLabel="Click Me"
      />
    );
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  it("should not render a button if buttonLabel is not provided", () => {
    render(
      <ImageWithTypographyAndButton
        image={FinancePlanning}
        body={<div>Sample Body</div>}
      />
    );
    const button = screen.queryByText("Click Me");
    expect(button).toBeNull();
  });
});