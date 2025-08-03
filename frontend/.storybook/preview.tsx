import type { Preview } from "@storybook/react";
import "./preview.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../src/theme/theme";
import React from "react";
import { BrowserRouter } from "react-router-dom";


const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter><Story /></BrowserRouter>
      </ThemeProvider>
    ),
  ],

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
