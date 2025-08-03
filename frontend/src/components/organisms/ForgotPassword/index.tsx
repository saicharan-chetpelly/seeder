import React, { useState } from "react";
import { Box, Link, Stack, styled } from "@mui/material";
import Typography from "../../atoms/Typography";
import { theme } from "../../../theme/theme";
import InputField from "../../atoms/InputField";
import Image from "../../atoms/Image";
import EmailIcon from "../../../../public/assets/icons/EmailIcon.svg";
import ButtonComponent from "../../atoms/Button";
import {
  CONTINUE,
  EMAIL_REGEX,
  ENTER_YOUR_EMAIL_ID,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_PAGE_CAPTION,
  GO_BACK_TO,
  LOGIN,
  RESET_EMAIL_SENT,
  RESET_PASSWORD,
  RESET_PASSWORD_INSTRUCTIONS_TEXT,
  VALID_EMAIL,
  WE_HAVE_MAIL_TO,
} from "../../../constants";
import EmailSentCard from "../../molecules/Card";
import TickCircle from "../../../../public/assets/icons/TickCircle.svg";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../../services";

const StyledOuterStack = styled(Stack)({
  flexDirection: "row",
  height: "90vh",
});

const StyledButton = styled(ButtonComponent)({
  textTransform: "none",
  height: "59px",
  width: "100%",
  borderRadius: "12px",
  marginTop: "24px",
  marginBottom: "32px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.grey[500],
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.Mui-disabled": {
    color: theme.palette.grey[500],
    background: theme.palette.primary[600],
  },
});

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isSentOtp, setIsSentOtp] = useState<boolean>(false);
  const [errorMessage,setErrorMessage] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorMessage("")
  };

  const isEmailValid = (email: string): boolean => {
    return EMAIL_REGEX.test(email) && email.indexOf("@@") === -1;
  };

  const handleResetPassword = async() => {
    try{
      const response = await getUserByEmail(email);
      console.log(response);
      if(response.status==200){
        console.log(response)
        setIsSentOtp(true);
      }
    }
    catch(error:any){
      if(error.response && error.response.status == 400){
        setErrorMessage("Not a registered email,Please try with other email")
      }
    }
  };
  const handleContinue = () => {
    navigate("/changePassword",{state:{email:email}})
  }

  const handleLogin = () => {
    navigate("/")
  }
  
  return (
    <StyledOuterStack>
      <Box>
        <Stack gap="4px" marginBottom="40px">
          <Typography variant="title" color={theme.palette.text.primary}>
            {FORGOT_PASSWORD}
          </Typography>
          <Typography variant="h3" color={theme.palette.text.disabled}>
            {FORGOT_PASSWORD_PAGE_CAPTION}
          </Typography>
        </Stack>
        {!isSentOtp ? (
          <>
            <InputField
              width="100%"
              startAdornment={<Image src={EmailIcon} />}
              placeholder={ENTER_YOUR_EMAIL_ID}
              value={email}
              onChange={handleEmailChange}
              padding={theme.spacing(3)}
              height="56px"
            />
            {!isEmailValid(email) && email !== "" && (
              <Typography variant="caption" color={"red"}>
                {VALID_EMAIL}
              </Typography>
            )}
            {errorMessage!="" && (
              <Typography variant="caption" color={"red"}>
                {errorMessage}
              </Typography>
            )}
          </>
        ) : (
          <EmailSentCard
            tickIcon={TickCircle}
            email={email}
            emailSentTo={WE_HAVE_MAIL_TO}
            resetPasswordData={RESET_PASSWORD_INSTRUCTIONS_TEXT}
            passwordState={RESET_EMAIL_SENT}
          />
        )}
        <StyledButton
          data-testid="reset-password"
          onClick={!isSentOtp ? handleResetPassword : handleContinue}
          label={!isSentOtp ? RESET_PASSWORD : CONTINUE}
          disabled={!isEmailValid(email)}
          textColor={theme.palette.grey[500]}
        />
        {!isSentOtp && (
          <Typography variant="h3" color={theme.palette.text.disabled}>
            {GO_BACK_TO}
            <Link href="#" underline="none" data-testid="login">
              <Typography variant="button1" color={theme.palette.primary[400]} onClick={handleLogin}>
                {LOGIN}
              </Typography>
            </Link>
          </Typography>
        )}
      </Box>
    </StyledOuterStack>
  );
};
