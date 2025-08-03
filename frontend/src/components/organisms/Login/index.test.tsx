import { render, screen, fireEvent } from "@testing-library/react";
import Login from ".";
import { BrowserRouter } from "react-router-dom";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}));

describe("Login Component", () => {
  it("should render the login form correctly", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(getByTestId("login-to-seeder")).toBeInTheDocument();
    expect(getByTestId("enter-mail")).toBeInTheDocument();
    expect(getByTestId("password-visibility-icon")).toBeInTheDocument();
    expect(getByTestId("continue")).toBeInTheDocument();
    expect(getByTestId("forgot-password")).toBeInTheDocument();
  });

  it("should call the onContinue function when Continue button is clicked", () => {
    const handleContinueMock = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
      <BrowserRouter>
        <Login onContinue={handleContinueMock} />
      </BrowserRouter>
    );
    const visibilityIcon = getByTestId("password-visibility-icon");
    const inputField = getByPlaceholderText("Enter your email id");
    const passwordField = getByPlaceholderText("Enter your password");

    fireEvent.change(inputField, { target: { value: "test@gmail" } });
    fireEvent.change(inputField, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordField, { target: { value: "example" } });
    fireEvent.change(passwordField, { target: { value: "Example@123" } });
    fireEvent.click(visibilityIcon);
    fireEvent.click(visibilityIcon);

    const continueButton = getByTestId("continue");
    fireEvent.click(continueButton);

    expect(handleContinueMock).toHaveBeenCalledTimes(1);
  });

  it("should call the onForgot function when Forgot Password is clicked", () => {
    const handleForgotMock = jest.fn();

    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const forgotPasswordLink = getByTestId("forgot-password");

    fireEvent.click(forgotPasswordLink);

  });

  test("should call loginWithRedirect when social login card is clicked", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const socialLoginCard = screen.getByText("Google");
    fireEvent.click(socialLoginCard);
  });
  test("handleSignup should navigate to signUp", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signupButton = screen.getByText("Sign Up");
    fireEvent.click(signupButton);
  });
});
