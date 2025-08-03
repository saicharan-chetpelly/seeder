import React from "react";
import { Box } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import Image from "../../../../src/components/atoms/Image";
import { theme } from "../../../theme/theme";
interface CommonSocialCardProps {
  title: string;
  iconSrc: string;
  iconAlt?: string;
  width?: string;
  height?: string;
}

interface EnabledSocialCardProps extends CommonSocialCardProps {
  disabled: false;
  onClick: () => void;
}
interface DisabledSocialCardProps extends CommonSocialCardProps {
  disabled: true;
}
type SocialCardProps = EnabledSocialCardProps | DisabledSocialCardProps;

export const IconButton = (props: SocialCardProps) => {
  return (
    <Box
      bgcolor={theme.palette.elevation.color1}
      width={props.width}
      height={props.height}
      display="flex"
      flexDirection={"column"}
      gap={2}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={3}
      onClick={props.disabled ? undefined : props.onClick}
      sx={{
        cursor: props.disabled ? "default" : "pointer",
      }}
      data-testid="social-card"
    >
      <Image
        src={props.iconSrc}
        alt={props.iconAlt ?? ""}
        height="20rem"
        width="20rem"
      ></Image>
      <TypographyComponent
        fontStyle="Gilroy"
        fontWeight="600"
        fontSize="16px"
        color={theme.palette.text.secondary}
      >
        {props.title}
      </TypographyComponent>
    </Box>
  );
};
