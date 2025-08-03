import React from "react";
import { Slider, SliderProps, SxProps, styled } from "@mui/material";
import { theme } from "../../../theme/theme";

interface CustomSliderProps extends SliderProps {
  onChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  max?: number;
  sx?: SxProps;
}

const StyledSlider = styled(Slider)({
  color: theme.palette.primary.main,
  "&.MuiSlider-root": {
    padding: 0,
  },
  "& .MuiSlider-rail": { color: `${theme.palette.grey[200]}` },
  "& .MuiSlider-thumb": {
    borderRadius: "8px",
    border: `3px solid ${theme.palette.primary[400]}`,
    "&:hover,&.Mui-focusVisible": {
      boxShadow: "none",
    },
    "&.Mui-active": {
      boxShadow: "none",
    },
  },
  width: "20.93vw",
  height: "8px",
});

export const CustomSlider = (props: CustomSliderProps) => {
  const { max, onChange, sx,...rest } = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (onChange) {
      onChange(event, newValue, 0);
    }
  };

  return <StyledSlider max={max} onChange={handleChange} sx={sx} {...rest} />;
};
