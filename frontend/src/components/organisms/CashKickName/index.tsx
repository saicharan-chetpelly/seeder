import React, { useState } from "react";
import { Box, Modal, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "../../../theme/theme";
import Typography from "../../atoms/Typography";
import InputTextField from "../../atoms/InputField";
import {
  ADD_NEW_CASHKICK,
  CANCEL,
  CASHKICK_NAME,
  CREATE_CASHKICK,
  NAME_CASHKICK,
  NAME_PLACEHOLDER,
} from "../../../constants/index";
import ButtonComponent from "../../atoms/Button";
interface NameCashKickProps {
  handleClose?: () => void;
  handleSubmit?: () => void;
  onNameChange: (newName: string) => void;
  isOpen:boolean;
}
export const CenteredModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});
export const NameCashkick = ({
  handleClose,
  handleSubmit,
  onNameChange,
  isOpen
}: NameCashKickProps) => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    if (newName.trim() === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    onNameChange(newName);
  };
  const handleCloseModal = () => {
    setName("");
    handleClose?.();
  }
  return (
    <CenteredModal open={isOpen}>
    <Box
      bgcolor={theme.palette.grey[100]}
      width="640px"
      display="flex"
      flexDirection={"column"}
      borderRadius={3}
      padding="1.3rem 2.5rem 1.3rem 2.5rem"
    >
      <Box
        display="flex"
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" flexDirection={"column"}>
          <Typography variant="h1" sx={{ color: theme.palette.text.primary }}>
            {NAME_CASHKICK}{" "}
          </Typography>
          <Typography variant="h3" sx={{ color: theme.palette.text.disabled }}>
            {ADD_NEW_CASHKICK}
          </Typography>
        </Box>
        <CloseIcon sx={{ color: "#D4D2DE" }} onClick={handleCloseModal} />
      </Box>
      <Box
        display="flex"
        flexDirection={"column"}
        gap={1}
        width="100%"
        marginTop={"48px"}
      >
        <Typography
          variant="body1"
          sx={{
            color: buttonDisabled
              ? theme.palette.text.disabled
              : theme.palette.primary[400],
          }}
        >
          {CASHKICK_NAME}
        </Typography>
        <InputTextField
          type={"text"}
          placeholder={NAME_PLACEHOLDER}
          value={name}
          onChange={handleNameChange}
          width={"100%"}
          color={theme.palette.text.disabled}
        />
      </Box>
      <Box
        display="flex"
        justifyContent={"flex-end"}
        gap={"0.5rem"}
        paddingTop={"56px"}
      >
        <ButtonComponent
          variant="contained"
          sx={{
            width: "8.313rem",
            height: "3.75rem",
            bgcolor: theme.palette.elevation.color2,
            color: theme.palette.text.secondary,
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: theme.palette.elevation.color2,
            },
            textTransform: "none",
          }}
          onClick={handleCloseModal}
          label={CANCEL}
          textColor={""}
        >
          {CANCEL}
        </ButtonComponent>
        <ButtonComponent
          variant="contained"
          disabled={buttonDisabled}
          sx={{
            color: theme.palette.grey[500],
            bgcolor: theme.palette.primary.main,
            width: "13rem",
            height: "3.75rem",
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
            "&:disabled": {
              color: theme.palette.grey[500],
              backgroundColor: theme.palette.primary.main,
              opacity: 0.6,
            },
            textTransform: "none",
          }}
          onClick={handleSubmit}
          label={CREATE_CASHKICK}
          textColor={""}
        >
          {CREATE_CASHKICK}
        </ButtonComponent>
      </Box>
    </Box>
    </CenteredModal>
  );
};
