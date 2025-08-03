import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignInPage from ".";
import LoginImage from "../../../public/assets/images/LoginImage.svg";
import { checkUsers } from "../../services";
import { BrowserRouter as Router } from "react-router-dom";
import * as services from "../../services";
const mockUserResponse = {
  data: [
    {
      id: 1,
      name: 'Sai Charan Chetpelly',
      email: 'saicharan.chetpelly@gmail.com',
      password: 'Password@123',
      availableCredit:880000
    }
  ],
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};


test("renders the SignInPage component", () => {
  jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
  jest
  .spyOn(services, 'checkUsers')
  .mockResolvedValue(mockUserResponse as any);
  jest
  .spyOn(services, 'login')
  .mockResolvedValue(mockUserResponse as any);
  jest
  .spyOn(services, 'getUserFundsById')
  .mockResolvedValue(mockUserResponse as any);

  render(
    <Router>
      <SignInPage />
    </Router>
  );

  const login_screen = screen.getByTestId("loginPage");
  expect(login_screen).toBeInTheDocument();
  expect(LoginImage).toBeInTheDocument;
});

test("handles successful sign-in", async () => {
  jest
  .spyOn(services, 'checkUsers')
  .mockResolvedValue(mockUserResponse as any);
  jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
  render(
    <Router>
      <SignInPage />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText("Enter your email id");
  const passwordInput = screen.getByPlaceholderText("Enter your password");
  const loginButton = screen.getByTestId("continue");
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "Password@123" } });
  fireEvent.click(loginButton);
});

test("handles failed sign-in", async () => {
  jest
  .spyOn(services, 'checkUsers')
  .mockResolvedValue(mockUserResponse as any);
  jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
  render(
    <Router>
      <SignInPage />
    </Router>
  );

  const emailInput = screen.getByPlaceholderText("Enter your email id");
  const passwordInput = screen.getByPlaceholderText("Enter your password");
  const loginButton = screen.getByTestId("continue");

  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "Password@123456" } });
  fireEvent.click(loginButton);
});