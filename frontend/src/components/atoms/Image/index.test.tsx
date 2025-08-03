import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Image from ".";
describe("Image ", () => {
  test("should have src prop", () => {
    const { getByRole } = render(
      <Image src="assets/images/LoginPageImage.svg" />
    );
    expect(getByRole("img")).toHaveAttribute(
      "src",
      "assets/images/LoginPageImage.svg"
    );
  });
  test("should have width prop", () => {
    const { getByRole } = render(
      <Image src="assets/images/LoginPageImage.svg" width="100" />
    );
    expect(getByRole("img")).toHaveAttribute("width", "100");
  });
  test("should have height prop", () => {
    const { getByRole } = render(
      <Image src="assets/images/LoginPageImage.svg" height="100" />
    );
    expect(getByRole("img")).toHaveAttribute("height", "100");
  });
});
