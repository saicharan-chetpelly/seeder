import React, { useState } from "react";
import { TypographyVariant } from "../../molecules/DataBlock";
import Typography from "../../atoms/Typography";
import { Stack, styled } from "@mui/material";
import Avatar from "../../../../src/components/atoms/Avatar";
import AvatarLogo from "../../../../public/assets/images/avatar.svg";
import ArrowBottomIcom from "../../../../public/assets/icons/arrow-bottom.svg";
import Image from "../../atoms/Image";
import { InfoCard } from "../../molecules/InfoCard";
import { theme } from "../../../theme/theme";
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from "../../../utils/ThemeContext";

interface HeaderProps {
  title: string;
  titleVariant?: TypographyVariant;
  titleColor?: string;
  subtitle: string;
  subtitleVariant?: TypographyVariant;
  subtitleColor?: string;
}

const StyledStack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledLeftBar = styled(Stack)({
  gap: "2px",
});

const StyledRightBar = styled(Stack)({
  flexDirection: "row",
  gap: "12px",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
  },
});
export const Header = (props: HeaderProps) => {
  const {
    title,
    subtitle,
    titleColor = theme.palette.text.primary,
    titleVariant = "title",
    subtitleColor = theme.palette.text.disabled,
    subtitleVariant = "h3",
  } = props;

  const {currUser} = useUserContext();

  const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLDivElement>();
  const { logout } = useAuth0();

  const handleAvatarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setUserMenuAnchor(e.currentTarget);
    setIsAvatarClicked(!isAvatarClicked);
  };

  const handleOnClickLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };
  return (
    <>
      <InfoCard
        handleLogout={handleOnClickLogout}
        userName={currUser.name}
        isOpen={isAvatarClicked}
        handleClose={() => {setIsAvatarClicked(false)}}
        anchorEl={userMenuAnchor}
      />
      <StyledStack>
        <StyledLeftBar>
          <Typography variant={titleVariant} color={titleColor}>
            {title}
          </Typography>
          <Typography variant={subtitleVariant} color={subtitleColor}>
            {subtitle}
          </Typography>
        </StyledLeftBar>
        <StyledRightBar onClick={handleAvatarClick}>
          <Avatar
            src={AvatarLogo}
            variant="square"
            width={32}
            height={32}
            data-testid="user-avatar"
          />
          <Image src={ArrowBottomIcom} width="8.5px" height="8.5px" data-testid="avatar-dropdown-logo"/>
        </StyledRightBar>
      </StyledStack>
    </>
  );
};
