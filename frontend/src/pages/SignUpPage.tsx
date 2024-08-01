import React, { useState } from "react";
import { AxiosResponse } from 'axios';
import {
  AuthTitle,
  AuthInput,
  ContinueButton,
  AuthFooter,
  SignUpCheck,
} from "../component/authentication/AuthenticationComponent";
import { AuthenticationContainer, AuthenticationBox, } from "../component/StyleComponents";
import { useSelector } from "react-redux";
import validator from "validator";
import { RootState } from "../store";
import services from '../api'

interface RegisterResponse {
  username: string,
  email: string,
  access: string,
  refresh: string
}

function SignUpPage() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  // State hooks for each input field
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false); // New state for checkbox
  const [validationMsg, setValidationMsg] = useState("");

  const handleEmail = (new_email: string) => {
    setEmail(new_email);
    if (!validator.isEmail(new_email)) {
      setValidationMsg("Please, enter a valid email!");
    } else {
      setValidationMsg("");
    }
  }

  const handleSignUp = () => {
    if (!validator.isEmail(email)) {
      return;
    }

    const userData = {
      username: fullName,
      phone_number: phoneNumber,
      email: email,
      password: password,
      password2: password,
      consentGiven: isChecked
    };

    services.auth.register(userData)
      .then((response: AxiosResponse<RegisterResponse>): void => {
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('username', fullName)
        window.location.href = '/'
      })
      .catch(error => {
        console.error('Login failed', error);
      });
  };




  return (
    <AuthenticationContainer $theme={theme}>
      <AuthenticationBox $theme={theme}>
        {/* <img style={{ width: "95px", height: "80px" }} src={theme === "light" ? "public/Epic Caller AI@300x.png" : "public/Epic Caller AI (2).png"} alt="" /> */}
        <AuthTitle
          title="SIGN UP"
          description="Create your free account"
         />
        <AuthInput placeholder="FULL NAME" icon="/person.svg" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <AuthInput placeholder="PHONE NUMBER" icon="/phone.svg" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <AuthInput
          placeholder="INPUT YOUR EMAIL"
          icon="/mail.svg"
          inputType="email"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          validationMsg={validationMsg}
         />
        <AuthInput
          placeholder="SET YOUR PASSWORD"
          icon="/lock.svg"
          inputType="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
         />
        <SignUpCheck
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <ContinueButton text="SIGN UP" onclick={handleSignUp} />
        <AuthFooter
          theme={theme}
          title="Have an account?"
          linkName="LOGIN NOW"
          to="/login"
         />
      </AuthenticationBox>
    </AuthenticationContainer>
  );
}

export default SignUpPage;
