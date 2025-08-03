import { screen, render, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { ForgotPassword } from ".";
import {
  CONTINUE,
  ENTER_YOUR_EMAIL_ID,
  RESET_PASSWORD,
  VALID_EMAIL,
  FORGOT_PASSWORD,
} from "@src/constants";
import { BrowserRouter } from "react-router-dom";
import * as services from "../../../services";
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
  status:200
};
const mockUserErrorResponse = {
  status:400
}

const mockEmptyUserData = {
  data:[]
}
describe("Forgotpassword", () => {
  it("should render forgot password component", () => {
    jest
      .spyOn(services, "getUserByEmail")
      .mockResolvedValue(mockUserData as any);
    render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
    const title = screen.getByText(FORGOT_PASSWORD);
    expect(title).toBeInTheDocument();
  });
  it("should render error message if invalid email is entered", () => {
    jest
    .spyOn(services, "getUserByEmail")
    .mockResolvedValue(mockUserData as any);
    render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText(ENTER_YOUR_EMAIL_ID);
    fireEvent.change(emailInput, { target: { value: "saicharan@gmail" } });
    const errorMessage = screen.getByText(VALID_EMAIL);
    expect(errorMessage).toBeInTheDocument();
  });
  it("should send otp on clicking resetpassword button", async() => {
    jest
    .spyOn(services, "getUserByEmail")
    .mockResolvedValue(mockUserData as any);
    render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText(ENTER_YOUR_EMAIL_ID);
    const resetPasswordButton = screen.getByRole("button", {
      name: RESET_PASSWORD,
    });
    expect(resetPasswordButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: "saicharan@gmail.com" } });
    expect(resetPasswordButton).toBeEnabled();
    fireEvent.click(resetPasswordButton);
    await waitFor(()=>{
      screen.getByRole("button", {
          name: CONTINUE,
        });
    })
    const continueButton = screen.getByRole("button", {
      name: CONTINUE,
    });
    expect(continueButton).toBeInTheDocument();
    fireEvent.click(continueButton)
  });
  it("should display error message if invalid user logs in", () => {
    jest
    .spyOn(services, "getUserByEmail")
    .mockRejectedValue(mockUserErrorResponse as any);
    render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText(ENTER_YOUR_EMAIL_ID);
    const resetPasswordButton = screen.getByRole("button", {
      name: RESET_PASSWORD,
    });
    expect(resetPasswordButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: "saicharan@gmail.com" } });
    expect(resetPasswordButton).toBeEnabled();
    fireEvent.click(resetPasswordButton);
  });
  it("should render error if any any api error occurs", () => {
    jest
    .spyOn(services, "getUserByEmail")
    .mockRejectedValue(mockEmptyUserData as any);
    render(<BrowserRouter><ForgotPassword /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText(ENTER_YOUR_EMAIL_ID);
    const resetPasswordButton = screen.getByRole("button", {
      name: RESET_PASSWORD,
    });
    expect(resetPasswordButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: "saicharan@gmail.com" } });
    expect(resetPasswordButton).toBeEnabled();
    fireEvent.click(resetPasswordButton);
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
  });
});
