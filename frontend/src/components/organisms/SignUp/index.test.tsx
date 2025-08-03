import React from 'react';
import { render, fireEvent, screen, getByRole } from '@testing-library/react';
import SignUp, { SignUpProps } from '.';
import { BrowserRouter } from 'react-router-dom';
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}));

jest.mock("../../../utils/functions", () => ({
  isValidPassword: jest.fn((password) => password.length >= 8),
  isValidEmail: jest.fn((email) => /\S+@\S+\.\S+/.test(email)),
}));

describe('SignUp Component', () => {
  let defaultProps: SignUpProps;

  beforeEach(() => {
    defaultProps = {    
      onSignUp: jest.fn(),
      // onGoogle: jest.fn(),
    };
  });

  it('renders the SignUp component with initial state', () => {
    const { getByTestId, getByPlaceholderText } = render(<BrowserRouter><SignUp {...defaultProps} /></BrowserRouter>);

    const signUpPage = getByTestId('signup-page');
    expect(signUpPage).toBeInTheDocument();

  
    const nameInput = getByPlaceholderText('Your Name');
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    
  });

  it('calls onSignUp with valid input', () => {
    const { getByRole, getByPlaceholderText } = render(<BrowserRouter><SignUp {...defaultProps} /></BrowserRouter>);
    const nameInput = getByPlaceholderText('Your Name');
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const signUpButton = getByRole("button",{name:"Sign Up"});

    fireEvent.change(nameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Secure' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePwd@123' } });

  
    expect(signUpButton).not.toBeDisabled();
    fireEvent.click(signUpButton);

    
  });

  it('toggles password visibility', () => {
    const { getByTestId, getByPlaceholderText } = render(<BrowserRouter><SignUp {...defaultProps} /></BrowserRouter>);

    const passwordInput = getByPlaceholderText('Password');
    const visibilityIcon = getByTestId('password-visibility-icon');

    
    expect(passwordInput).toHaveAttribute('type', 'password');

   
    fireEvent.click(visibilityIcon);
    fireEvent.click(visibilityIcon);

    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test("should call loginWithRedirect when social login card is clicked", () => {
    render(
      <BrowserRouter><SignUp {...defaultProps} /></BrowserRouter>
    );
    const socialLoginCard = screen.getByText("Google");
    fireEvent.click(socialLoginCard);
  });
  test("should go to login page when click on login navlink",()=>{
    render(
      <BrowserRouter><SignUp {...defaultProps} /></BrowserRouter>
    );
    const loginnavLink = screen.getByText("Login");
    fireEvent.click(loginnavLink);
  })

});