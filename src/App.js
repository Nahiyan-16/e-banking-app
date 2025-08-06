import React from "react";
import { Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ConfirmSignUp from "./ConfirmSignUp";
import Home from "./HomePage/Home";
import RequireAuth from "./RequireAuth";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ResendCode from "./ResendCode";

Amplify.configure(awsconfig);

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/confirm" element={<ConfirmSignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/resend-code" element={<ResendCode />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
