import React from "react";
import { CashAccelerationPage } from "./pages/CashAccelerationPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { Routes, Route } from "react-router-dom";
import { SignUpPage } from "./pages/SignUp";
import { HomePage } from "../src/pages/HomePage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import LoginPage from "./pages/LoginPage";
import { NewCashKick } from "./pages/NewCashKick";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/cashAcceleration" element={<CashAccelerationPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/changePassword" element={<ChangePasswordPage />} />
        <Route path="/newCashKick" element={<NewCashKick />} />
      </Routes>
    </div>
  );
}
