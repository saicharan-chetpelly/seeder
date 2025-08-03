import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "../src/theme/theme";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { CLIENT_ID, DOMAIN, REDIRECT_URL } from "./constants";
import { UserContext } from './utils/ThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
     <BrowserRouter>
      <Auth0Provider
        domain={DOMAIN}
        clientId={CLIENT_ID}
        authorizationParams={REDIRECT_URL}>
        <UserContext>
          <App />
        </UserContext>
      </Auth0Provider>
    </BrowserRouter>
  </ThemeProvider>
);