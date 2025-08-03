import React from "react";
import LoginTemplate from ".";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import LoginImage from "../../../../public/assets/images/LoginImage.svg";

describe("tests for the login template", () => {
  test("should render the login template", () => {
    render(
      <LoginTemplate 
        src={LoginImage}
        rightComponent={"right"}
      />
    );
    const template = screen.getByTestId("login-template");
    expect(template).toBeInTheDocument();
  });
});