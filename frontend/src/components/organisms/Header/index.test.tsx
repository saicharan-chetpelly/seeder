import { screen, render, fireEvent } from "@testing-library/react";
import { Header } from ".";
import { DEFAULT_DATE, DEFAULT_SALUATION, LOGOUT } from "@src/constants";
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn()
}));

const logoutMock = jest.fn();
(useAuth0 as jest.Mock).mockReturnValue({
  logout: logoutMock
});
describe("Header component", () => {
  it("should render Header component with title and subtitle", () => {
    render(<Header title={DEFAULT_SALUATION} subtitle={DEFAULT_DATE} />);
    const title = screen.getByText(DEFAULT_SALUATION);
    expect(title).toBeInTheDocument();
    const subtitle = screen.getByText(DEFAULT_DATE);
    expect(subtitle).toBeInTheDocument();
  });
  it("should render Header component with user data", async() => {
    render(<Header title={DEFAULT_SALUATION} subtitle={DEFAULT_DATE} />);
    const avatar = screen.getByRole("img");
    fireEvent.click(avatar);
    const logoutBtn = screen.getByText(LOGOUT);
    fireEvent.click(logoutBtn);
  });
});