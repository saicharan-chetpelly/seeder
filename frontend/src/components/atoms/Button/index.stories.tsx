import React from "react";
import { Box } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";
import ButtonComponent from ".";
import { theme } from "../../../theme/theme";

export default {
  title: "Atoms/Button",
  component: ButtonComponent,
} as Meta<typeof ButtonComponent>;

const Template: StoryFn<typeof ButtonComponent> = (args) => (
  <Box>
    <ButtonComponent {...args} />
  </Box>
);

export const SignUp = Template.bind({});
SignUp.args = {
  variant: "contained",
  label: "Sign Up",
  textColor: theme.palette.grey[500],
  textVariant: "body2",
  onClick: () => window.alert("Clicked!"),
  sx: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      border: "none",
    },
    backgroundColor: theme.palette.primary.main,
    textTransform: "none",
    width: theme.spacing(128),
    height: theme.spacing(14),
    borderRadius: theme.spacing(3),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
};

export const Login = Template.bind({});
Login.args = {
  variant: "text",
  label: "Login",
  textColor: theme.palette.primary[400],
  textVariant: "subtitle2",
  onClick: () => window.alert("Clicked!"),
  sx: {
    textTransform: "none",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "contained",
  label: "Reset",
  textColor: theme.palette.grey[600],
  textVariant: "body2",
  disabled: true,
  onClick: () => window.alert("Clicked!"),
  sx: {
    color: theme.palette.elevation.color2,
    textTransform: "none",
    width: theme.spacing(16.25),
    borderRadius: theme.spacing(3),
  },
};