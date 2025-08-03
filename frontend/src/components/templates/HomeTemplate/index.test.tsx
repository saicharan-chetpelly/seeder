import React from "react";
import HomeTemplate from ".";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

describe("tests for the home template", () => {
  test("should render the home template", () => {
    render(
      <HomeTemplate
        sideNav={"nav"}
        headerContent={"header"}
        bodyContent={"body"}
        footerContent={"footer"}
      />
    );
    const template = screen.getByTestId("home-template");
    expect(template).toBeInTheDocument();
  });
});