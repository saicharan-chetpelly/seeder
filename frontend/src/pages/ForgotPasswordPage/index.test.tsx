import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { ForgotPasswordPage } from ".";
import {
  CONTINUE,
  ENTER_YOUR_EMAIL_ID,
  RESET_PASSWORD,
  VALID_EMAIL,
} from "@src/constants";
import { BrowserRouter } from "react-router-dom";
import * as services from "../../services";
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

describe("Forgotpassword page component", () => {
  it("should render forgotpassword page", async() => {
    jest
    .spyOn(services, "getUserByEmail")
    .mockResolvedValue(mockUserData as any);
    render(<BrowserRouter><ForgotPasswordPage /></BrowserRouter>);
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
});
