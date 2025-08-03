import React from "react";
import SignUpImage from "../../../public/assets/images/SignupImage.svg";
import SignUp from "../../../src/components/organisms/SignUp";
import { Grid } from "@mui/material";

import LoginTemplate from "../../../src/components/templates/LoginTemplate";
import { getUserByEmail, registerUser } from "../../services";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const navigate = useNavigate()
  const handleSignup = async(email:string,name:string,password:string) => {
    try{
      const response = await getUserByEmail(email);
      if(response.status == 200){
        alert("User already exists");
      }
    }
    catch(error){
      const user = {
        name: name,
        email: email,
        password: password,
      }
      await registerUser(user);
      navigate("/");
    }
  }
  return (
    <Grid data-testid="SignUpPage">
      <LoginTemplate
        src={SignUpImage}
        rightComponent={
          <SignUp onSignUp={handleSignup}/>
        }
      />
    </Grid>
  );
};
