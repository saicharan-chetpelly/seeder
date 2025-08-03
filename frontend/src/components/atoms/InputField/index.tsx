import { FormHelperText, OutlinedInput, styled } from "@mui/material";
import React, { ReactNode } from "react";
import { theme } from "../../../theme/theme";
export interface InputFieldProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  width: string;
  height?: string;
  value?: string;
  placeholder?: string;
  padding?: string;
  color?: string;
  type?: string;
  dataTestId?:string;
}
const StyledOutlinedInput = styled(OutlinedInput)(
  ({ width }: InputFieldProps) => ({
    width: width,
    backgroundColor: `${theme.palette.grey[100]}`,
    borderRadius: "12px",
    border: `1px solid ${theme.palette.grey[600]}`,
  })
);
const InputField = ({
  endAdornment,
  startAdornment,
  errorMessage,
  padding,
  placeholder,
  color,
  value,
  width,
  height,
  type,
  onChange,
  onFocus,
  dataTestId
}: InputFieldProps) => {
  return (
    <>
      <StyledOutlinedInput
        endAdornment={endAdornment}
        startAdornment={startAdornment}
        inputProps={{
          style: {
            color: color,
            font: `${theme.typography.body1}`,
            paddingLeft: padding,
            fontWeight: "500",
          },
          "data-testid": `${dataTestId}`
        }}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        width={width}
        height={height}
      />
      {errorMessage && (
        <FormHelperText
          sx={{
            color: "red",
            margin: "0.5rem",
            font: `${theme.typography.body1}`,
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </>
  );
};
export default InputField;
