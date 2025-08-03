import React from "react";
import LoginTemplate from "../../components/templates/LoginTemplate";
import LoginImage from "../../../public/assets/images/login-panel.svg";
import { ForgotPassword } from "../../components/organisms/ForgotPassword";

export const ForgotPasswordPage = () => {
  return <LoginTemplate src={LoginImage} rightComponent={<ForgotPassword />} />;
};
