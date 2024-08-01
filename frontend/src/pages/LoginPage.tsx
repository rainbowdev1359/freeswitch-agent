import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AuthTitle,
  AuthInput,
  GoogleSignInButton,
  ContinueButton,
  AuthFooter,
} from '../component/authentication/AuthenticationComponent';
import { AuthenticationContainer, AuthenticationBox, } from "../component/StyleComponents";
import { useSelector } from 'react-redux';
import validator from "validator";
import { RootState } from '../store';
import services from '../api';
import { useLocation } from 'react-router-dom';

interface LoginResponse {
  access: string,
  refresh: string,
  username: string,
  permissions: [],
  group: {}
}

function LoginPage() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  // State hooks for input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const [validationMsg, setValidationMsg] = useState("");

  const handleEmail = (new_email: string) => {
    setEmail(new_email);
    if (!validator.isEmail(new_email)) {
      setValidationMsg("Please, enter a valid email!");
    } else {
      setValidationMsg("");
    }
  }

  const handleLogin = () => {
    if (!validator.isEmail(email)) {
      return;
    }

    const from = new URLSearchParams(location.search).get('next') || '/';

    const credential = {
      "email": email,
      "password": password,
      "username": "-"
    };
    services.auth.login(credential)
      .then((response: AxiosResponse<LoginResponse>): void => {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
        localStorage.setItem('group', JSON.stringify(response.data.group));
        window.location.href = from
        // navigate(from, { replace: true });
      })
      .catch(error => {
        console.error('Login failed', error);
        toast.error("Ivalid email or password", {
          position: "top-right",
          autoClose: 5000, // Adjusted autoClose duration
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <AuthenticationContainer $theme={theme}>
      {/* <ToastContainer /> */}
      <AuthenticationBox $theme={theme}>
        {/* <img src={theme === "light" ? "public/Epic Caller AI@300x.png" : "public/Epic Caller AI (2).png"} style={{width: "95px", height: "80px"}}/> */}
        <AuthTitle title="LOGIN" description="" />
        <AuthInput
          placeholder="Email"
          icon="/person.svg"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          validationMsg={validationMsg}
        />
        <AuthInput
          placeholder="PASSWORD"
          icon="/lock.svg"
          inputType="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <ContinueButton text="LOG IN" onclick={handleLogin} />
        {/* <GoogleSignInButton /> */}

        <div className='d-flex justify-content-between align-items-center w-full px-2'>
          <div className='d-flex flex-row align-items-center'>
            <input type="checkbox" />
            <span className='text-white m-2'>Remember me</span>
          </div>
          <a className='text-white' href="/reset_password">Forgot password?</a>
        </div>
        <AuthFooter
          theme={theme}
          title="Don't have an account?"
          linkName="SIGN UP NOW"
          to="/signup"
        />
      </AuthenticationBox>
    </AuthenticationContainer>
  );
}

export default LoginPage;
