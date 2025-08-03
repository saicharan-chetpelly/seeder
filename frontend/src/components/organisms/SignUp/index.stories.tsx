import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SignUp, { SignUpProps } from ".";


export default {
  title: "organisms/SignUp",
  component: SignUp,
} as Meta;

const Template: StoryFn<SignUpProps> = (args) => <SignUp {...args} />;

export const primary = Template.bind({});
primary.args = {
 
};