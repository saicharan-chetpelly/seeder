import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Login, { LoginProps } from "./index";

export default {
  title: "organisms/Login",
  component: Login,
} as Meta;

const Template: StoryFn<LoginProps> = (args) => <Login {...args} />;

export const LoginOrganism = Template.bind({});
LoginOrganism.args = {
  onContinue: () => {
    alert("Clicked on Continue");
  },
};
