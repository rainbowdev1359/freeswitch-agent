import React from "react";
import {
  AuthTitle,
  AuthInput,
  ContinueButton,
  AuthFooter,
  GoogleSignInButton,
} from "../component/authentication/AuthenticationComponent";
import { AuthenticationContainer, AuthenticationBox, } from "../component/StyleComponents";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const navigate = useNavigate();
  return (
    <AuthenticationContainer $theme={theme}>
      <AuthenticationBox $theme={theme}>
        <img style={{ width: "100%", height: "84px" }} src="/logo.svg" alt="" />
        <AuthTitle
          title="FORGOT PASSWORD"
          description="Enter the email associated with your account and we will send you a link to reset your password"
        />

        <AuthInput
          placeholder="INPUT YOUR EMAIL"
          icon="/mail.svg"
          inputType="email"
        />
        <ContinueButton
          onclick={() => {
            navigate("/new_password");
          }}
        />
        <GoogleSignInButton />
        <AuthFooter
          title="Don't have an account?"
          linkName="SIGN UP NOW"
          to="/signup"
        />
      </AuthenticationBox>
    </AuthenticationContainer>
  );
}

export default ForgotPassword;
