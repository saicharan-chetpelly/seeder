import React from "react";
import {
  Button,
  ButtonProps,
  Typography,
  TypographyProps,
} from "@mui/material";

export interface ButtonComponentProps extends ButtonProps {
  label: string;
  textColor: string;
  textVariant?: TypographyProps["variant"];
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const { label, textColor, textVariant, ...extraProps } = props;

  return (
    <Button data-testid="button" type="button" {...extraProps} disableRipple disableTouchRipple>
      <Typography color={textColor} variant={textVariant}>
        {label}
      </Typography>
    </Button>
  );
};

export default ButtonComponent;