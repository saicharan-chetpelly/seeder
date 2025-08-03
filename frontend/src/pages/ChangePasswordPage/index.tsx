import React from "react";
import LoginTemplate from "../../components/templates/LoginTemplate";
import LoginImage from "../../../public/assets/images/login-panel.svg";
import ResetPassword from "../../components/organisms/ResetCode";
import { useLocation } from "react-router-dom";
import { updateUserPassword } from "../../services";

export const ChangePasswordPage = () => {
  const {state} = useLocation();
  const { email } = state || {};
  const handleContinuePassword = async(userpassword: string) => {
    try{
      const response = await updateUserPassword(email,userpassword);
      return response;
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <LoginTemplate
      src={LoginImage}
      rightComponent={
        <ResetPassword onContinuePassword={handleContinuePassword} />
      }
    />
  );
};
