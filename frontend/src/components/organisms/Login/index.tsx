import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  styled,
} from "@mui/material";
import { useState } from "react";
import { theme } from "../../../theme/theme";
import TypographyComponent from "../../atoms/Typography";
import ButtonComponent from "../../atoms/Button";
import InputField from "../../atoms/InputField";
import { IconButton as IconButtonComponent } from "../../molecules/IconButton/index";
import EmailIcon from "../../../../public/assets/icons/EmailIcon.svg";
import LockIcon from "../../../../public/assets/icons/Lock.svg";
import Visibility from "../../../../public/assets/icons/VisibleOff.svg";
import GoogleIcon from "../../../../public/assets/icons/google.svg";
import StripeIcon from "../../../../public/assets/icons/stripe.svg";
import XeroIcon from "../../../../public/assets/icons/xero.svg";
import VisibilityOff from "../../../../public/assets/icons/VisibilityIcon.svg";
import LockOff from "../../../../public/assets/icons/LockOff.svg";
import Image from "../../atoms/Image";
import { useAuth0 } from '@auth0/auth0-react';
import {
  LOGIN_TITLE,
  LOGIN_DESCRIPTION,
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  FORGOT_PASSWORD_TEXT,
  CONTINUE_BUTTON_LABEL,
  OR_TEXT,
  SIGNUP_TEXT,
  DONT_HAVE_ACCOUNT,
  EMAIL_REGEX,
  VALID_EMAIL,
  RESET_SCREEN_DATA
} from "../../../constants/index";
const {
  PASSWORD_REGEX,
  VALID_PASSWORD
} = RESET_SCREEN_DATA;

import { useNavigate } from "react-router-dom";

export interface LoginProps {
  onContinue?: (username: string, password: string) => void;
}

const StyledButton = styled(ButtonComponent)({
  height: 65,
  width: theme.spacing(108.5),
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
});

const DividerBlock = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "434px",
});

const Divider = styled("hr")({
  width: "200px",
  border: `1px solid ${theme.palette.grey[600]}`,
});

const Login = (props: LoginProps) => {
  const { loginWithRedirect } = useAuth0();
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signUp');
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  function handlePasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPassword(event.target.value);
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordEndIcon, setPasswordEndIcon] = useState(VisibilityOff);
  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
    setPasswordEndIcon(passwordVisible ? VisibilityOff : Visibility);
  };

  const isEmailValid = (inputValue: string): boolean => {
    return EMAIL_REGEX.test(inputValue) && inputValue.indexOf("@@") === -1;
  };

  const isPasswordValid = (pass1: string): boolean => {
    return PASSWORD_REGEX.test(pass1);
  };

  const handleContinue = () => {
    if (isPasswordValid(password) && isEmailValid(inputValue)) {
      if (props.onContinue) {
        props.onContinue(inputValue, password);
      }
    }
  };

  return (
    <Grid
      container
      spacing={8}
      padding={theme.spacing(5)}
      direction={"column"}
      maxWidth={theme.spacing(130)}
      bgcolor={theme.palette.grey[800]}
      data-testid="login-page"
    >
      <Grid item>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <TypographyComponent
              color={theme.palette.text.primary}
              variant="h1"
              data-testid="login-to-seeder"
            >
              {LOGIN_TITLE}
            </TypographyComponent>
          </Grid>
          <Grid item>
            <TypographyComponent
              color={theme.palette.text.disabled}
              variant="h3"
              data-testid="enter-mail"
            >
              {LOGIN_DESCRIPTION}
            </TypographyComponent>
          </Grid>
        </Grid>
      </Grid>

      <Grid item marginTop={theme.spacing(2)}>
        <Grid container direction={"column"} spacing={4}>
          <Grid item>
            <InputField
              startAdornment={<Image src={EmailIcon} />}
              placeholder={EMAIL_PLACEHOLDER}
              height="56px"
              value={inputValue}
              onChange={handleInputChange}
              data-testid="input"
              width={theme.spacing(108.5)}
              padding={theme.spacing(3)}
            ></InputField>
            {!isEmailValid(inputValue) && inputValue !== "" && (
              <TypographyComponent variant="caption" color={"red"}>
                {VALID_EMAIL}
              </TypographyComponent>
            )}
          </Grid>
          <Grid item>
            <InputField
              placeholder={PASSWORD_PLACEHOLDER}
              value={password}
              startAdornment={
                password.length > 1 ? (
                  <Image src={LockIcon} />
                ) : (
                  <Image src={LockOff} />
                )
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    data-testid="password-visibility-icon"
                    onClick={handlePasswordVisibilityToggle}
                  >
                    <img src={passwordEndIcon} />
                  </IconButton>
                </InputAdornment>
              }
              type={passwordVisible ? "text" : "password"}
              height="56px"
              width={theme.spacing(108.5)}
              padding={theme.spacing(3)}
              onChange={(e) => {
                setPassword(e.target.value);
                handlePasswordChange(e);
              }}
            />
            {!isPasswordValid(password) && password !== "" && (
                <TypographyComponent variant="caption" color={"red"}>
                  {VALID_PASSWORD}
                </TypographyComponent>
              )}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        sx={{
          cursor: "pointer",
        }}
      >
        <Box onClick={()=>handleForgotPassword()} data-testid="forgot-password">
          <TypographyComponent
            variant="body2"
            marginTop={theme.spacing(-2)}
            color={theme.palette.primary[400]}
          >
            {FORGOT_PASSWORD_TEXT}
          </TypographyComponent>
        </Box>
      </Grid>

      <Grid item>
        <StyledButton
          data-testid="continue"
          onClick={handleContinue}
          label={CONTINUE_BUTTON_LABEL}
          textColor={theme.palette.grey[500]}
          color="primary"
          disabled={password.length < 1 || inputValue.length < 1}
        />
      </Grid>
      <Grid item>
        <DividerBlock container>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <TypographyComponent
              variant="body2"
              children={OR_TEXT}
              color={`${theme.palette.text.secondary}`}
            />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
        </DividerBlock>
      </Grid>
      <Grid item>
        <Grid container color={theme.palette.text.secondary}>
          <Grid item flex={1}>
            <IconButtonComponent
              onClick={()=>loginWithRedirect()}
              iconSrc={GoogleIcon}
              title="Google"
              iconAlt="Google"
              disabled={false}
              width="129.67px"
              height="96px"
            ></IconButtonComponent>
          </Grid>
          <Grid item flex={1}>
            <IconButtonComponent
              iconSrc={StripeIcon}
              title="Stripe"
              disabled={true}
              width="129.67px"
              height="96px"
            ></IconButtonComponent>
          </Grid>
          <Grid item flex={1}>
            <IconButtonComponent
              iconSrc={XeroIcon}
              title="Xero"
              disabled={true}
              width="129.67px"
              height="96px"
            ></IconButtonComponent>
          </Grid>
        </Grid>
      </Grid>
      <Grid item marginTop={theme.spacing(2)}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item>
            <TypographyComponent
              variant="h3"
              color={theme.palette.text.disabled}
            >
              {DONT_HAVE_ACCOUNT}
            </TypographyComponent>
          </Grid>
          <Grid item>
            <Link
              href="#"
              underline="none"
              data-testid="login"
              onClick={handleSignup}
            >
              <TypographyComponent
                variant="button1"
                color={theme.palette.primary[400]}
              >
                {SIGNUP_TEXT}
              </TypographyComponent>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
