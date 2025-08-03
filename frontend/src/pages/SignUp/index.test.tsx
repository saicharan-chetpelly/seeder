import { screen, render, fireEvent } from "@testing-library/react";
import { SignUpPage } from ".";
import { BrowserRouter } from "react-router-dom";
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
const mockEmptyUserResponse = {
  data: [
    
  ],
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};

describe("SignUpPage Component", () => {
  test("renders SignUpPage component with correct elements", () => {
    jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
  jest.spyOn(services, 'registerUser').mockResolvedValue(mockUserResponse as any);
    const { getByTestId } = render(<BrowserRouter><SignUpPage /></BrowserRouter>);

    const signUpPageElement = getByTestId("SignUpPage");
    expect(signUpPageElement).toBeInTheDocument();

    const accountPresent = screen.getByText("Already have an account");
    expect(accountPresent).toBeInTheDocument();

    const signup = screen.getByText("Sign Up ✨");
    expect(signup).toBeInTheDocument();

    const or = screen.getByText("Or");
    expect(or).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(nameInput, { target: { value: "john@example.com" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password@123" } });

    const signupBtn = screen.getByRole("button",{name:"Sign Up"});
    fireEvent.click(signupBtn)
  });
  test("user not exists trying ti login", () => {
    jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockEmptyUserResponse as any);
  jest.spyOn(services, 'registerUser').mockResolvedValue(mockUserResponse as any);
    const { getByTestId } = render(<BrowserRouter><SignUpPage /></BrowserRouter>);

    const signUpPageElement = getByTestId("SignUpPage");
    expect(signUpPageElement).toBeInTheDocument();

    const accountPresent = screen.getByText("Already have an account");
    expect(accountPresent).toBeInTheDocument();

    const signup = screen.getByText("Sign Up ✨");
    expect(signup).toBeInTheDocument();

    const or = screen.getByText("Or");
    expect(or).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(nameInput, { target: { value: "john@example.com" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password@123" } });

    const signupBtn = screen.getByRole("button",{name:"Sign Up"});
    fireEvent.click(signupBtn)
  });
  test("should signup new user", () => {
    jest
  .spyOn(services, 'getUserByEmail')
  .mockRejectedValue(mockEmptyUserResponse as any);
  jest.spyOn(services, 'registerUser').mockResolvedValue(mockUserResponse as any);
    const { getByTestId } = render(<BrowserRouter><SignUpPage /></BrowserRouter>);

    const signUpPageElement = getByTestId("SignUpPage");
    expect(signUpPageElement).toBeInTheDocument();

    const accountPresent = screen.getByText("Already have an account");
    expect(accountPresent).toBeInTheDocument();

    const signup = screen.getByText("Sign Up ✨");
    expect(signup).toBeInTheDocument();

    const or = screen.getByText("Or");
    expect(or).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(nameInput, { target: { value: "john@example.com" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password@123" } });

    const signupBtn = screen.getByRole("button",{name:"Sign Up"});
    fireEvent.click(signupBtn)
  });
});
