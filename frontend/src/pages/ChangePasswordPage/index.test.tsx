import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChangePasswordPage } from "./index";
import * as services from "../../services";
import { RESET_SCREEN_DATA } from "@src/constants";
const mockUserData = {
  data: [
    {
      id: 1,
      name: "John Doe",
      email: "saicharan@gmail.com",
      password: "Password@123",
      availableCredit: 430563.4432,
    },
  ],
};
test("ChangePasswordPage should render with appropriate content", () => {
  jest
      .spyOn(services, "updateUserPassword")
      .mockResolvedValue(mockUserData as any);
  render(
    <BrowserRouter>
      <ChangePasswordPage />
    </BrowserRouter>
  );

  const resetPasswordText = screen.getByText("Enter Reset Code");
  const continueButton = screen.getByText("Reset Password");

  expect(resetPasswordText).toBeInTheDocument();
  expect(continueButton).toBeInTheDocument();
});

test("ChangePasswordPage should call onContinuePassword when continue button is clicked", () => {
  jest
      .spyOn(services, "updateUserPassword")
      .mockResolvedValue(mockUserData as any);
  render(
    <BrowserRouter>
      <ChangePasswordPage />
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
  fireEvent.click(eyeIcon);
  fireEvent.click(changePasswordBtn);

});
test("should render error when any api error", () => {
  jest
      .spyOn(services, "updateUserPassword")
      .mockRejectedValue(mockUserData as any);
  render(
    <BrowserRouter>
      <ChangePasswordPage />
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
  fireEvent.click(eyeIcon);
  fireEvent.click(changePasswordBtn);

});
