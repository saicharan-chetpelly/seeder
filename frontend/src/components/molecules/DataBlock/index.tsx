import React from "react";
import { Stack, SxProps, styled } from "@mui/material";
import Image from "../../../components/atoms/Image";
import { IconTypography } from "../IconTypography";
import Typography from "../../atoms/Typography";
import { theme } from "../../../theme/theme";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body1"
  | "body2"
  | "subtitle1"
  | "subtitle2"
  | "caption1"
  | "caption2"
  | "caption3"
  | "caption4"
  | "button2"
  | "button1"
  | "title";

export interface DataBlockProps {
  logoSrc: string;
  logoAlt?: string;
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  titleVariant?: TypographyVariant;
  titleColor?: string;
  titleSx?: SxProps;
  caption?: string;
  captionVariant?: TypographyVariant;
  captionSx?: SxProps;
  captionColor?: string;
  titleInfoGap?: string;
  titleCaptionGap?: string;
}

const StyledBox = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  width: "5.85vw",
  height: "5.85vw",
  backgroundColor: theme.palette.grey[100],
  borderRadius: "0.87vw",
  border: `1px solid ${theme.palette.grey[300]}`,
});

export const DataBlock = (props: DataBlockProps) => {
  const {
    logoSrc,
    logoAlt,
    iconSrc,
    iconAlt,
    title,
    titleVariant,
    titleColor,
    titleSx,
    caption,
    captionVariant,
    captionSx,
    captionColor,
    titleInfoGap,
    titleCaptionGap,
  } = props;

  return (
    <Stack justifyContent={"space-between"} gap="1.75vw" >
      <StyledBox>
        <Image src={logoSrc} alt={logoAlt} />
      </StyledBox>
      <Stack gap={titleCaptionGap}>
        <IconTypography
          label={title}
          variant={titleVariant}
          labelColor={titleColor}
          endIconAlt={iconAlt}
          endIconSrc={iconSrc}
          gap={titleInfoGap}
          sx={titleSx}
        />
        <Typography
          variant={captionVariant}
          sx={captionSx}
          color={captionColor}
        >
          {caption}
        </Typography>
      </Stack>
    </Stack>
  );
};
