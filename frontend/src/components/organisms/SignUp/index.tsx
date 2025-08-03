import {
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
  import Smile from "../../../../public/assets/icons/smile.svg";
  import emailImage from "../../../../public/assets/icons/EmailIcon.svg"
  import Lock from "../../../../public/assets/icons/Lock.svg";
  import VisibilityIcon from "../../../../public/assets/icons/VisibilityIcon.svg";
  import VisibilityOffIcon from "../../../../public/assets/icons/VisibleOff.svg";
  import Google from "../../../../public/assets/icons/google.svg";
  import Stripe from "../../../../public/assets/icons/stripe.svg";
  import Xero from "../../../../public/assets/icons/xero.svg";
  import LockOffIcon from "../../../../public/assets/icons/LockOff.svg";
  import Image from "../../atoms/Image";
import { ALREADY_HAVE_ACCOUNT, EMAIL_ADDRESS, EMAIL_REGEX, LOGIN, OR_TEXT, PASSWORD, SIGNUP, SIGNUP_TITLE, YOUR_NAME, RESET_SCREEN_DATA, VALID_EMAIL } from "../../../../src/constants";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
const {
  PASSWORD_REGEX,
  VALID_PASSWORD
} = RESET_SCREEN_DATA;

  
  export interface SignUpProps {
    onSignUp?: (username: string, name:string,password:string) => void;
    // onGoogle: () => void;
  }
  
  const StyledButtonComponent = styled(ButtonComponent)({
    height: 65,
    width: "434px",
    borderRadius: "12px",
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

  const StyledDividerBlock = styled(Grid)({
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
  
  const SignUp = (props: SignUpProps) => {
    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();
    const [name, setName] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = () => {
      navigate("/")
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      };
    function handlePasswordChange(
      event: React.ChangeEvent<HTMLInputElement>
    ): void {
      setPassword(event.target.value);
    }
  
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordEndIcon, setPasswordEndIcon] = useState(VisibilityIcon);
    const handleVisibilityToggle = () => {
      setPasswordVisible(!passwordVisible);
      setPasswordEndIcon(passwordVisible ? VisibilityIcon : VisibilityOffIcon);
    };
  
    const isValidEmail = (inputValue: string): boolean => {
      return EMAIL_REGEX.test(inputValue) && inputValue.indexOf("@@") === -1;
    };
  
    const isPasswordValid = (pass1: string): boolean => {
      return PASSWORD_REGEX.test(pass1);
    };
    const handleSignUp = () => {
      if (isPasswordValid(password) && isValidEmail(inputValue)) {
        if (props.onSignUp) {
          props.onSignUp(inputValue,name, password);
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
        data-testid="signup-page"
      >
        <Grid item>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <TypographyComponent
                color={theme.palette.text.primary}
                variant="h1"
                data-testid="sign up"
              >
                {SIGNUP_TITLE}
              </TypographyComponent>
            </Grid>
          </Grid>
        </Grid>
  
        <Grid item marginTop={theme.spacing(2)}>
          <Grid container direction={"column"} spacing={5}>
            <Grid item>
              <InputField
                startAdornment={<Image src={Smile} />}
                placeholder={YOUR_NAME}
                height="56px"
                value={name}
                onChange={handleNameChange}
                data-testid="input"
                width="434px"
                padding={theme.spacing(3)}
              ></InputField>
            </Grid>
            <Grid item>
              <InputField
                placeholder={EMAIL_ADDRESS}
                value={inputValue}
                startAdornment={<Image src={emailImage} />}
                height="56px"
                width="434px"
                padding={theme.spacing(3)}
                onChange={handleInputChange}
              />
              {!isValidEmail(inputValue) && inputValue !== "" && (
              <TypographyComponent variant="caption" color={"red"}>
                {VALID_EMAIL}
              </TypographyComponent>
            )}
            </Grid>

            <Grid item>
              <InputField
                placeholder={PASSWORD}
                value={password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      data-testid="password-visibility-icon"
                      onClick={handleVisibilityToggle}
                    >
                      <img src={passwordEndIcon} />
                    </IconButton>
                  </InputAdornment>
                }
                startAdornment={
                  password.length > 4 ? (
                    <Image src={Lock} />
                  ) : (
                    <Image src={LockOffIcon} />
                  )
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                  handlePasswordChange(e);
                }}
                type={passwordVisible ? "text" : "password"}
                height="56px"
                width="434px"
                padding={theme.spacing(3)}
              />
              {!isPasswordValid(password) && password !== "" && (
                <TypographyComponent variant="caption" color={"red"}>
                  {VALID_PASSWORD}
                </TypographyComponent>
              )}
            </Grid>
          </Grid>
        </Grid>
  
        <Grid item marginTop={theme.spacing(4)}>
          <StyledButtonComponent
            data-testid="sign up"
            onClick={handleSignUp}
            label={SIGNUP}
            textColor={theme.palette.grey[500]}
            color="primary"
            disabled={password.length < 4 || !(isValidEmail(inputValue)) || name.length <1}
          />
        </Grid>
        <Grid item>
          <StyledDividerBlock container>
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
          </StyledDividerBlock>
        </Grid>
        <Grid item>
          <Grid container color={theme.palette.text.secondary}>
            <Grid item flex={1}>
              <IconButtonComponent
                onClick={()=>loginWithRedirect()}
                iconSrc={Google}
                title="Google"
                iconAlt="Google"
                disabled={false}
                width="129.67px"
                height="96px"
              ></IconButtonComponent>
            </Grid>
            <Grid item flex={1}>
              <IconButtonComponent
                iconSrc={Stripe}
                title="Stripe"
                disabled={true}
                width="129.67px"
                height="96px"
              ></IconButtonComponent>
            </Grid>
            <Grid item flex={1}>
              <IconButtonComponent
                iconSrc={Xero}
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
                {ALREADY_HAVE_ACCOUNT}
              </TypographyComponent>
            </Grid>
            <Grid item>
              <Link
                href="#"
                underline="none"
                data-testid="signUp"
                onClick={handleLogin}
              >
                <TypographyComponent
                  variant="button1"
                  color={theme.palette.primary[400]}
                >
                  {LOGIN}
                </TypographyComponent>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default SignUp;