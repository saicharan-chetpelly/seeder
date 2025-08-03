import React from "react";
import { render, screen } from "@testing-library/react";
import Typography from ".";
describe("Typography", () => {
  test("should show the text correctly", () => {
    render(<Typography variant="h6">bootcamp-135-seeder</Typography>);
    const element = screen.getByText("bootcamp-135-seeder");
    expect(element).toBeInTheDocument;
    expect(element.tagName.toLowerCase()).toBe("h6");
  });
});