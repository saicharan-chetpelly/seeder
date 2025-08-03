import "@testing-library/jest-dom";

import { NAV_BAR_ITEMS } from "./NavBarUtils";
import { screen, render, fireEvent } from "@testing-library/react";
import NavBar from ".";
import { BrowserRouter } from "react-router-dom";
describe("NavBar", () => {
  beforeEach(() =>
    render(<BrowserRouter><NavBar activeElement="Home" navBarItems={NAV_BAR_ITEMS} /></BrowserRouter>)
  );
  test("should render Navbar", () => {
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });
  test("Check navigation on clicking sidebar elements", () => {
    const home = screen.getByTestId("navbar-Home");
    expect(home).toBeInTheDocument();
    fireEvent.click(home);
  });
  test("Check navigation on clicking sidebar elements", () => {
    const cashAcceleration = screen.getByTestId("navbar-Cash Acceleration");
    expect(cashAcceleration).toBeInTheDocument();
    fireEvent.click(cashAcceleration);
  });
});
