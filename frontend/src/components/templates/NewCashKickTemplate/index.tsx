import React from "react";
import { Stack, Box } from "@mui/material";
import { theme } from "../../../theme/theme";

interface NewCashKickTemplateProps {
    sideNav: React.ReactNode;
    headerContent: React.ReactNode;
    bodyContent: React.ReactNode;
}

const NewCashKickTemplate = (props: NewCashKickTemplateProps) => {
  return (
    <Box
      data-testid="cashkick-template"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Stack direction="row" sx={{ width: "100%", height: "100%" }}>
        <Stack
          sx={{
            width: "18.30vw",
            height: "100%",
          }}
        >
          {props.sideNav}
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            width: "81.7vw",
            height: "100%",
            paddingLeft: "32px",
            marginRight: "32px",
            overflowY: "scroll",
            scrollBehavior: "smooth",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "9.24%",
              marginTop: "40px",
            }}
          >
            {props.headerContent}
          </Box>
          <Box
            sx={{
              width: "100%",
              marginTop: "16px",
            }}
          >
            {props.bodyContent}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
export default NewCashKickTemplate;