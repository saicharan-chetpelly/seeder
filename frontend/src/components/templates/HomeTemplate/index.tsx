import React from "react";
import { Stack, Box } from "@mui/material";
import { theme } from "../../../theme/theme";

interface TemplateProps {
  sideNav: React.ReactNode;
  headerContent: React.ReactNode;
  bodyContent: React.ReactNode;
  footerContent: React.ReactNode;
}

const HomeTemplate = (props: TemplateProps) => {
  return (
    <Box
      data-testid="home-template"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: theme.palette.grey[800],
        overflowX: "hidden",
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
            paddingLeft: "2.34vw",
            paddingRight: "2.34vw",
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
              height: "33.72%",
              marginTop: "2.34vw",
              marginBottom: "1.46vw",
            }}
          >
            {props.bodyContent}
          </Box>
          <Box
            sx={{
              width: "100%",
              marginTop: "1.46vw",
            }}
          >
            {props.footerContent}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
export default HomeTemplate;