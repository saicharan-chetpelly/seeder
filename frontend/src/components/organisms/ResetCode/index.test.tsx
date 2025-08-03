import { render, fireEvent, screen } from "@testing-library/react";
import ResetPassword from ".";
import { RESET_SCREEN_DATA } from "../../../constants/index";
import { BrowserRouter } from "react-router-dom";

describe("ResetPassword component testcases", () => {
  const mockOnContinuePassword = jest.fn();
  it("should render screen to enter otp", () => {
    render(
      <BrowserRouter>
        <ResetPassword onContinuePassword={mockOnContinuePassword} />
      </BrowserRouter>
    );
    const otpInput = screen.getByPlaceholderText(
      RESET_SCREEN_DATA.RESET_PASSWORD
    );
    fireEvent.change(otpInput, { target: { value: "44444444" } });
    const resetBtn = screen.getByRole("button", {
      name: RESET_SCREEN_DATA.BUTTON1_TEXT,
    });
    fireEvent.click(resetBtn);
  });
  it("should render screen to enter password and confirm password", () => {
    render(
      <BrowserRouter>
        <ResetPassword onContinuePassword={mockOnContinuePassword} />
      </BrowserRouter>
    );
    const otpInput = screen.getByPlaceholderText(
      RESET_SCREEN_DATA.RESET_PASSWORD
    );
    fireEvent.change(otpInput, { target: { value: "22222222" } });
    const resetBtn = screen.getByRole("button", {
      name: RESET_SCREEN_DATA.BUTTON1_TEXT,
    });
    expect(resetBtn).toBeEnabled();
    fireEvent.click(resetBtn);
    const changePasswordBtn = screen.getByRole("button", {
      name: RESET_SCREEN_DATA.BUTTON2_TEXT,
    });
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "saicharan" } });
    fireEvent.change(passwordInput, { target: { value: "Saicharan@311" } });
    const confirmPasswordInput = screen.getByTestId("confirm-password");
    fireEvent.change(confirmPasswordInput, { target: { value: "saicharan" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Saicharan@311" },
    });
    const eyeIcon = screen.getByTestId("password-visibility-icon");
    const confirmPasswordEyeIcon = screen.getByTestId("confirm-password-visibility-icon");
    fireEvent.click(eyeIcon);
    fireEvent.click(eyeIcon);
    fireEvent.click(confirmPasswordEyeIcon);
    fireEvent.click(confirmPasswordEyeIcon);
    fireEvent.click(changePasswordBtn);
  });
  it("should render screen to enter password and confirm password", () => {
    render(<BrowserRouter><ResetPassword onContinuePassword={mockOnContinuePassword} /></BrowserRouter>);
    const loginBtn = screen.getByTestId("login");
    fireEvent.click(loginBtn);
  });
});
