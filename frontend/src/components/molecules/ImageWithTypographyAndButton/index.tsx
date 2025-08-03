import { Box, styled } from "@mui/material";
import React from "react";
import ButtonComponent from "../../atoms/Button";
import Image from "../../atoms/Image";
import { theme } from "../../../theme/theme";

export interface ImageWithTypographyAndButtonProps {
  image: string;
  buttonLabel?: string;
  body: React.ReactNode;
}

const RootBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: theme.spacing(252.75),
  height: theme.spacing(108.25),
  gap: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
}));

const TypoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(3),
});

const ImageWithTypographyAndButton = ({
  image,
  body,
  buttonLabel,
}: ImageWithTypographyAndButtonProps) => {

  return (
    <RootBox data-testid="image-typography">
      <Image src={image} alt={"heading"} width="231.72px" height="160px" />
      <TypoBox>
        {body}
        {buttonLabel && (
          <ButtonComponent
            label={buttonLabel}
            textColor={theme.palette.primary[400]}
            textVariant="body2"
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.elevation.color1,
              },
              textTransform: "none",
            }}
          />
        )}
      </TypoBox>
    </RootBox>
  );
};

export default ImageWithTypographyAndButton;