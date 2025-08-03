import React from "react";
import HomeTemplate from ".";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

describe("tests for the cashkick template", () => {
  test("should render the cashkick template", () => {
    render(
      <HomeTemplate
        sideNav={"nav"}
        headerContent={"header"}
        bodyContent={"body"}
      />
    );
    const template = screen.getByTestId("cashkick-template");
    expect(template).toBeInTheDocument();
  });
});