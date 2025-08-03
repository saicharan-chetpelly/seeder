import { Box, Grid, styled } from "@mui/material";
import { useState } from "react";
import { IconTypography } from "../../molecules/IconTypography";
import SEEDERLOGO from "../../../../public/assets/icons/seederlogo.svg";
import FLASH from "../../../../public/assets/icons/flash.svg";

import { theme } from "../../../theme/theme";

import { NAV_BAR_FOOTER, NavBarType} from "./NavBarUtils";
import { useNavigate } from "react-router-dom";
export interface NavBarProps {
  activeElement: string;
  navBarItems: NavBarType[];
}
const NavbarContainer = styled(Grid)({
  position: "fixed",
  width: "18.30vw",
  height: "100vh",
  padding: "40px 1.46vw 20px 1.46vw",
  backgroundColor: theme.palette.elevation.color1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
});
const StyledGrid = styled(Grid)({
  width: "100%",
  height: "49px",
  gap: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "16px",
  backgroundColor: theme.palette.elevation.color1,
});
const StyledBox = styled(Box)({
  width: "100%",
  height: "49px",
  padding: "16px",
  color: theme.palette.text.disabled,
  cursor: "pointer",
  backgroundColor: theme.palette.elevation.color1,
  "&:hover": {
    color: theme?.palette?.text?.secondary,
    backgroundColor: theme.palette.elevation.color1,
  },
  "&.active": {
    backgroundColor: theme.palette.elevation.color2,
    color: theme.palette.text.primary,
    borderRadius: "12px",
  },
});
const NavBar = (props: NavBarProps) => {
  const navigate = useNavigate();
  const { activeElement, navBarItems } = props;
  const [activePage, setActivePage] = useState<string>(activeElement);
  const onClick = (title: string) => {
    setActivePage(title);
    if(title=="Home"){
      navigate("/homePage")
    }else if(title == "Cash Acceleration"){
      navigate("/cashAcceleration")
    }
  };

  return (
    <NavbarContainer data-testid="navbar">
      <div>
        <IconTypography
          label="Seeder"
          labelColor={theme.palette.text.primary}
          startIconSrc={SEEDERLOGO}
          startIconWidth="29px"
          startIconHeight="29px"
          variant="h2"
          gap="8px"
        ></IconTypography>
        <StyledGrid>
          {navBarItems.map((item) => {
            return (
              <StyledBox
                key={item.title}
                className={activePage === item.title ? "active" : ""}
                onClick={() => {
                  onClick(item.title);
                }}
                data-testid={`navbar-${item.title}`}
              >
                <IconTypography
                  label={item.title}
                  startIconSrc={
                    activePage === item.title ? item.activeIcon : item.icon
                  }
                  variant="button2"
                  key={item.title}
                  gap="12px"
                ></IconTypography>
              </StyledBox>
            );
          })}
        </StyledGrid>
      </div>
      <StyledBox>
        <IconTypography
          label={NAV_BAR_FOOTER}
          startIconSrc={FLASH}
          startIconWidth="16px"
          startIconHeight="16px"
          variant="body2"
          gap="12px"
        ></IconTypography>
      </StyledBox>
    </NavbarContainer>
  );
};
export default NavBar;
