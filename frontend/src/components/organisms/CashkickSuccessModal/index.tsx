import React from "react";
import { Box, Button, Stack } from "@mui/material";
import Typography from "../../atoms/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {
  CASHKICK_INFO,
  CASHKICK_REVIEW,
  CASHKICK_STATUS,
  CASHKICK_SUCCESS,
  CLOSE,
  VIEW_CASHKICKS,
} from "../../../constants";
import Preloader from "../../../../public/assets/animations/cashlick_in_review.gif";
import { theme } from "../../../theme/theme";
import { styled } from "@mui/material/styles";
import { Gif } from "../../atoms/Gif";
import { CenteredModal } from "../CashKickName";

interface CashKickSuccessProps {
  handleClose?: () => void;
  handleViewCashKickClick?: () => void;
  isOpen:boolean;
}
const PopUpInner = styled(Box)({
  backgroundColor: `${theme.palette.grey[100]}`,
  width: "670px",
  height: "560px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  borderRadius: "12px",
  padding: "30px",
});
const CloseButton = styled(Button)({
  width: "133px",
  height: "60px",
  backgroundColor: `${theme.palette.elevation.color2}`,
  color: "#C9C8CC",
  borderRadius: "12px",
  "&:hover": {
    backgroundColor: `${theme.palette.elevation.color2}`,
  },
  textTransform:"none"
});
const ButtonStack = styled(Stack)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  marginTop: "auto",
  flexDirection: "row",
  gap: "8px",
});
const ViewCashKicksButton = styled(Button)({
  color: `${theme.palette.grey[500]}`,
  backgroundColor: `${theme.palette.primary.main}`,
  width: "208px",
  height: "60px",
  borderRadius: "12px",
  "&:hover": {
    backgroundColor: `${theme.palette.primary.main}`,
  },
  "&:disabled": {
    color: `${theme.palette.grey[500]}`,
    backgroundColor: `${theme.palette.primary.main}`,
    opacity: 0.6,
  },
  textTransform:"none"
});
const CashKickSuccess: React.FC<CashKickSuccessProps> = ({
  handleClose,
  handleViewCashKickClick,
  isOpen
}) => {
  return (
    <CenteredModal open={isOpen}>
      <PopUpInner><Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={"1.25rem"}
      >
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h1"
            sx={{ color: `${theme.palette.text.primary}` }}
          >
            {CASHKICK_SUCCESS}
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: `${theme.palette.text.disabled}` }}
          >
            {CASHKICK_STATUS}
          </Typography>
        </Box>
        <CloseIcon sx={{ color: "#D4D2DE" }} onClick={handleClose} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={"1rem"}
      >
        <Gif src={Preloader} height="172px" alt="Loader GIF" />
        <Typography
          variant="h2"
          sx={{ color: `${theme.palette.text.primary}`, paddingTop: "24px" }}
        >
          {CASHKICK_REVIEW}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: `${theme.palette.text.disabled}`, textAlign: "center" }}
        >
          {CASHKICK_INFO}
        </Typography>
      </Box>
      <ButtonStack>
        <CloseButton
          data-testid="close"
          onClick={handleClose}
          variant="contained"
        >
          {CLOSE}
        </CloseButton>
        <ViewCashKicksButton
          onClick={handleViewCashKickClick}
          disabled={false}
          variant="contained"
        >
          {VIEW_CASHKICKS}
        </ViewCashKicksButton>
      </ButtonStack></PopUpInner>
    </CenteredModal>
  );
};
export default CashKickSuccess;
