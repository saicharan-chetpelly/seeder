import React from 'react';
import { render, screen } from '@testing-library/react';
import EmailSentCard, { EmailSentCardProps } from './index';
import TickCircle from "../../../../public/assets/icons/TickCircle.svg";

const mockProps: EmailSentCardProps = {
  email: 'example@email.com',
  emailSentTo: 'user@example.com',
  resetPasswordData: 'Reset password data',
  passwordState: 'Password Reset Successful',
  tickIcon: TickCircle
};

test('should renders EmailSentCard with correct data', () => {
  render(<EmailSentCard {...mockProps} />);
  expect(screen.getByText('Password Reset Successful')).toBeInTheDocument();
  expect(screen.getByTestId('emailsentto')).toHaveTextContent('user@example.com example@email.com Reset password data');
  expect(screen.getByAltText('TickCircle')).toBeInTheDocument();
  const tickIcon = screen.getByAltText('TickCircle') as HTMLImageElement;
  expect(tickIcon).toBeInTheDocument();
  expect(tickIcon.src).toBe('http://localhost/');
});