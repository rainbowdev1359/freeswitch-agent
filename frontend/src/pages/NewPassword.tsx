import React from "react";
import {
  AuthTitle,
  AuthInput,
  ContinueButton,
  AuthFooter,
} from "../component/authentication/AuthenticationComponent";
import { AuthenticationContainer, AuthenticationBox, } from "../component/StyleComponents";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function NewPassword() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <AuthenticationContainer $theme={theme}>
      <AuthenticationBox $theme={theme}>
        <img style={{ width: "100%", height: "84px" }} src="/logo.svg" alt="" />
        <AuthTitle
          title="FORGOT PASSWORD"
          description="Enter the email associated with your account and we will send you a link to reset your password"
        />
        <AuthInput
          placeholder="SET NEW PASSWORD"
          icon="/lock.svg"
          inputType="email"
        />
        <AuthInput
          placeholder="CONFIRM NEW PASSWORD"
          icon="/lock.svg"
          inputType="email"
        />
        <ContinueButton />
        <AuthFooter
          title="Don't have an account?"
          linkName="SIGN UP NOW"
          to="/signup"
        />
      </AuthenticationBox>
    </AuthenticationContainer>
  );
}

export default NewPassword;
