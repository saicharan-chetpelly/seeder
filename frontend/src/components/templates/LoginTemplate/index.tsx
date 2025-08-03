import React from "react";
import { Stack, Box, styled } from "@mui/material";
import Image from "../../atoms/Image/index";
import { theme } from "../../../theme/theme";

interface LoginTemplateProps {
  src: string;
  rightComponent: React.ReactNode;
}

export const SignInRootBox = styled(Box)({
  width: "57.91vw",
  height: "100%",
  backgroundColor: theme.palette.grey[800],
});

export const SignInBox = styled(Box)(({ theme }) => ({
  padding: "7.02vw 14.86vw 0px 11.27vw",
}));

const LoginTemplate = (props: LoginTemplateProps) => {
  return (
    <Box
      data-testid="login-template"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflowY: 'hidden',
      }}
    >
      <Stack direction="row" sx={{ width: "100%", height: "100%" }}>
        <Stack sx={{ width: "42.09vw", height: "100%" }}>
          <Image src={props.src} height="100%" style={{objectFit: "cover"}}/>
        </Stack>
        <SignInRootBox>
          <SignInBox>{props.rightComponent}</SignInBox>
        </SignInRootBox>
      </Stack>
    </Box>
  );
};
export default LoginTemplate;
