import React from "react";
import LoginImage from "../../../public/assets/images/LoginImage.svg";
import Login from "../../../src/components/organisms/Login";
import { Box } from "@mui/material";
import LoginTemplate from "../../../src/components/templates/LoginTemplate";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, login, getUserFundsById } from "../../services";
import { LOGIN_FAILED } from "../../constants";
import { useUserContext } from "../../utils/ThemeContext";

const LoginPage = () => {
  const {handleUpdateCurrUser} = useUserContext();
  const navigate = useNavigate();
  const handleLogin = async (email: string, password: string) => {
    try{
    const loginResponse = await login(email, password);
    if (loginResponse.status == 200) {
      const response: any = await getUserByEmail(email);
      const userFundId = response.data.userFundDashboardId
      if(response.status == 200){
        const userFundResponse = await getUserFundsById(userFundId,loginResponse.data);
        handleUpdateCurrUser(
          response.data.id,
          response.data.name,
          response.data.email,
          userFundResponse.data.availableCredit
        );
        const result = await login(email, password);
        localStorage.setItem("token", result.data);
        navigate("/homePage");
      }
    } else {
      window.alert(LOGIN_FAILED);
    }
    }
    catch(error:any){
      window.alert(LOGIN_FAILED);
    }
  };

  return (
    <Box data-testid="loginPage">
      <LoginTemplate
        src={LoginImage}
        rightComponent={<Login onContinue={handleLogin} />}
      />
    </Box>
  );
};

export default LoginPage;