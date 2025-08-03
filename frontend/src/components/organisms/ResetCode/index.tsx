import {
  Grid,
  Link,
  Stack,
  styled,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import TypographyComponent from "../../atoms/Typography";
import InputField from "../../atoms/InputField";
import ButtonComponent from "../../atoms/Button";
import { theme } from "../../../../src/theme/theme";
import moreicon from "../../../../public/assets/icons/more.svg";
import moreOff from "../../../../public/assets/icons/moreOff.svg";
import LockIcon from "../../../../public/assets/icons/Lock.svg";
import LockOff from "../../../../public/assets/icons/LockOff.svg";
import Visibility from "../../../../public/assets/icons/VisibleOff.svg";
import VisibilityOff from "../../../../public/assets/icons/VisibilityIcon.svg";
import {
  RESET_SCREEN_DATA,
  FORGOT_PASSWORD,
  EMAIL_SENT_TO,
  PASSWORD_STATE,
  LOGIN_NOW_BUTTON_LABEL,
  PASSWORD_DOESNOT_MATCH,
} from "../../../constants/index";
import Image from "../../atoms/Image";
import EmailSentCard from "../../molecules/Card";
import { useNavigate } from "react-router-dom";
import TickCircle from "../../../../public/assets/icons/TickCircle.svg";

const {
  RESET_PASSWORD,
  RESET_CODE_INSTRUCTIONS,
  CHANGE_PASSWORD,
  PLACEHOLDER_TEXT,
  PASSWORD_RULE,
  BUTTON1_TEXT,
  BUTTON2_TEXT,
  GO_BACK,
  LOGIN,
  VALID_PASSWORD,
  PASSWORD_REGEX,
} = RESET_SCREEN_DATA;

const StyledButton = styled(ButtonComponent)({
  height: "60px",
  borderRadius: theme.spacing(3),
  textTransform: "none",
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
    background: theme.palette.primary[600],
  },
  width: "100%",
});
interface Props {
  onContinuePassword: (userpassword: string) => void;
}

const ResetPassword = ({ onContinuePassword }: Props) => {
  const [inputValue, setInputValue] = React.useState("");
  const [pass1, setPass1] = React.useState("");
  const [pass2, setPass2] = React.useState("");
  const [reset, setReset] = React.useState(false);
  const [changePasswordSuccessful, setChangePasswordSuccessful] =
    React.useState(false);
  const navigate = useNavigate();
  const [passwordEndIcon, setPasswordEndIcon] = useState(Visibility);
  const [confirmPasswordEndIcon, setConfirmPasswordEndIcon] = useState(Visibility);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
    setPasswordEndIcon(passwordVisible ? Visibility : VisibilityOff);
  };
  const handleConfirmPasswordVisibilityToggle = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
    setConfirmPasswordEndIcon(confirmPasswordVisible ? Visibility : VisibilityOff);
  };

  const isValidPassword = (pass: string): boolean => PASSWORD_REGEX.test(pass);

  const handleReset = (): void => {
    setReset(true);
  };

  const handleContinue = (): void => {
    onContinuePassword(pass1);
    setChangePasswordSuccessful(true);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPass1(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPass2(event.target.value);
  };

  const handleLogin = () => navigate("/");

  const renderPasswordFields = () => (
    <Grid item>
      <Grid item>
        <InputField
          dataTestId="password"
          startAdornment={
            pass1.length > 0 ? <Image src={LockIcon} /> : <Image src={LockOff} />
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="password-visibility-icon"
                onClick={handlePasswordVisibilityToggle}
              >
                <Image alt="eye-icon" src={passwordEndIcon} />
              </IconButton>
            </InputAdornment>
          }
          onChange={handlePasswordChange}
          height="56px"
          placeholder="&nbsp;"
          type={passwordVisible ? "text" : "password"}
          width="31.77vw"
          padding={theme.spacing(3)}
        />
        {!isValidPassword(pass1) && pass1 !== "" && (
          <TypographyComponent variant="caption" color="red">
            {VALID_PASSWORD}
          </TypographyComponent>
        )}
      </Grid>
      <Grid item paddingTop={theme.spacing(5)}>
        <InputField
          dataTestId="confirm-password"
          startAdornment={
            pass2.length > 0 ? <Image src={LockIcon} /> : <Image src={LockOff} />
          }
          onChange={handleConfirmPasswordChange}
          type={!confirmPasswordVisible ? "text" : "password"}
          padding={theme.spacing(3)}
          width="31.77vw"
          height="56px"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="confirm-password-visibility-icon"
                onClick={handleConfirmPasswordVisibilityToggle}
              >
                <Image alt="eye-icon" src={confirmPasswordEndIcon} />
              </IconButton>
            </InputAdornment>
          }
        />
        {pass1 !== pass2 && (
          <TypographyComponent variant="caption" color="red">
            {PASSWORD_DOESNOT_MATCH}
          </TypographyComponent>
        )}
      </Grid>
      <Grid item paddingTop={theme.spacing(5)}>
        <TypographyComponent
          variant="body2"
          color={theme.palette.text.disabled}
        >
          {PASSWORD_RULE}
        </TypographyComponent>
      </Grid>
    </Grid>
  );

  const renderContent = () => (
    <>
      <Grid item>
        {!reset ? (
          <Stack spacing={theme.spacing(2)}>
            <TypographyComponent
              variant="title"
              color={theme.palette.text.primary}
              data-testid="resetcode"
            >
              {RESET_PASSWORD}
            </TypographyComponent>
            <TypographyComponent
              variant="h3"
              color={theme.palette.text.disabled}
              data-testid="enterresetcode"
            >
              {RESET_CODE_INSTRUCTIONS}
            </TypographyComponent>
          </Stack>
        ) : (
          <TypographyComponent
            variant="title"
            color={theme.palette.text.primary}
          >
            {CHANGE_PASSWORD}
          </TypographyComponent>
        )}
      </Grid>

      <Grid item paddingTop={theme.spacing(8)}>
        {!reset ? (
          <Grid item>
            <InputField
              startAdornment={
                inputValue.length > 0 ? (
                  <Image src={moreOff} />
                ) : (
                  <Image src={moreicon} />
                )
              }
              data-testid="input-field"
              value={inputValue}
              placeholder={PLACEHOLDER_TEXT}
              onChange={handleInputChange}
              height="56px"
              width="31.77vw"
              padding={theme.spacing(3)}
            />
          </Grid>
        ) : renderPasswordFields()}

        <Grid item sx={{ flex: 1 }} paddingTop={theme.spacing(6)}>
          <StyledButton
            data-testid="button"
            label={!reset ? BUTTON1_TEXT : BUTTON2_TEXT}
            textColor="white"
            color="primary"
            disabled={
              !reset
                ? !/^\d{8}$/.exec(String(inputValue))!
                : !(pass1 === pass2 && isValidPassword(pass1))
            }
            onClick={!reset ? handleReset : handleContinue}
          />
        </Grid>
      </Grid>
      {!reset && (
        <Grid item paddingTop={theme.spacing(8)}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TypographyComponent color={theme.palette.text.disabled}>
                {GO_BACK}
              </TypographyComponent>
            </Grid>
            <Grid item>
              <Link
                href="#"
                underline="none"
                data-testid="login"
                onClick={handleLogin}
              >
                <TypographyComponent
                  variant="subtitle1"
                  color={theme.palette.primary[400]}
                >
                  {LOGIN}
                </TypographyComponent>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );

  const renderChangePasswordSuccessfulContent = () => (
    <Box>
      <Stack marginBottom="40px">
        <TypographyComponent
          variant="title"
          color={theme.palette.text.primary}
        >
          {FORGOT_PASSWORD}
        </TypographyComponent>
      </Stack>
      <Stack marginBottom="24px">
        <EmailSentCard
          tickIcon={TickCircle}
          emailSentTo={EMAIL_SENT_TO}
          passwordState={PASSWORD_STATE}
        />
      </Stack>
      <StyledButton
        label={LOGIN_NOW_BUTTON_LABEL}
        textColor="white"
        onClick={handleLogin}
      />
    </Box>
  );

  return (
    <Grid
      container
      display="flex"
      direction="column"
      width="31.77vw"
      bgcolor={theme.palette.grey[800]}
    >
      {!changePasswordSuccessful
        ? renderContent()
        : renderChangePasswordSuccessfulContent()}
    </Grid>
  );
};

export default ResetPassword;
