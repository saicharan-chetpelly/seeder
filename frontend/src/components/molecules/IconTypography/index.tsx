import React from "react";
import Image from "../../../../src/components/atoms/Image";
import { Stack, SxProps } from "@mui/material";
import Typography from "../../atoms/Typography";
import { TypographyVariant } from "../DataBlock";

interface IconTypographyProps {
  startIconSrc?: string;
  startIconWidth?: string;
  startIconHeight?: string;
  startIconAlt?: string;
  labelColor?: string;
  label: string;
  endIconSrc?: string;
  endIconAlt?: string;
  endIconWidth?: string;
  endIconHeight?: string;
  variant?:TypographyVariant;
  sx?: SxProps;
  gap?: string;
}

export const IconTypography = (props: IconTypographyProps) => {
  const {
    startIconAlt,
    startIconWidth,
    startIconHeight,
    startIconSrc,
    label,
    labelColor,
    endIconSrc,
    endIconHeight,
    endIconWidth,
    endIconAlt,
    variant,
    sx,
    gap,
  } = props;
  return (
    <Stack direction="row" gap={gap} alignItems="center">
      {startIconSrc != undefined && (
        <Image
          src={startIconSrc}
          alt={startIconAlt}
          width={startIconWidth}
          height={startIconHeight}
        />
      )}
      <Typography color={labelColor} variant={variant} sx={sx}>
        {label}
      </Typography>
      {endIconSrc != undefined && (
        <Image
          src={endIconSrc}
          alt={endIconAlt}
          width={endIconWidth}
          height={endIconHeight}
        />
      )}
    </Stack>
  );
};
