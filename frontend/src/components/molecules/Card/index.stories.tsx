import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import EmailSentCard, { EmailSentCardProps } from './index';
import TickCircle from "../../../../public/assets/icons/TickCircle.svg";

export default {
  title: 'molecules/EmailSentCard',
  component: EmailSentCard,
} as Meta;

const Template: StoryFn<EmailSentCardProps> = (args) => <EmailSentCard {...args} />;

export const ResetMail = Template.bind({});
ResetMail.args = {
  email: 'example@example.com',
  emailSentTo: 'We have sent mail to',
  resetPasswordData: 'with reset password instructions',
  passwordState: 'Reset email sent',
  tickIcon: TickCircle
};

export const ResetSuccessful = Template.bind({});
ResetSuccessful.args = {
  emailSentTo: 'Click on button below to proceed to login',
  passwordState: 'Password reset successful',
  tickIcon: TickCircle
};

