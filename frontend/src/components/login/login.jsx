import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import HorizontalsCenterBox from "g-components/box/horizontalyCenterBox/horizontalyCenterBox";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { Button, TextField } from "@mui/material";
import SmallMessageBox1 from "g-components/box/small-message-box/box1";
import "./login.scss";

import PhoneNoPicker from "g-components/inputs/phoneNo/phoneNo";
import HelperText from "g-components/text/helperText";
import { auth } from "firebase.js";
import TimeOutLoader from "g-components/text/timeOutLoader/TimeOutLoader";
import { useNavigate } from "react-router-dom";
export default function Login(props) {
  const coolDownOtpTimeOut = 30;
  const [isLoading, setLoading] = useState(false);
  const [isDisabledOtpButton, setDisabledOtpButton] = useState(false);
  const [isSignInButtonDisabled, setSignInButtonDisabled] = useState(false);
  const [isVisibleOtpContainer, setVisibleOtpContainer] = useState(false);
  const [isCaptchaCompleted, setCaptchaCompleted] = useState(false);
  const [smallMessage, setSmallMessage] = useState([
    "none",
    "please fill the form",
  ]);
  const [captcha, setCaptcha] = useState(false);
  const [captchaVerifier, setCaptchaVerifier] = useState(null);
  const [conformationCode, setConformationCode] = useState(false);
  const [isSendOtpOnCoolDown, setSendOtpOnCoolDown] = useState(false);
  //errs

  const [isNumErr, setNumErr] = useState([false, ""]);
  const [otpErr, setOtpErr] = useState([false, ""]);

  //ref

  const phoneRef = useRef(null);
  const otpRef = useRef(null);
  const otpButton = useRef(null);
  const signInButton = useRef(null);
  const recaptchaContainer = useRef(null);
  const otpSetTimeOut = useRef(null);

  //func

  const navigate = useNavigate()

  
  //effect

  useEffect(() => {
    if (captcha) return;

    const generatedCaptcha = new RecaptchaVerifier(
      recaptchaContainer.current,
      {
        size: "normal",
        callback: () => {
          setCaptchaCompleted(true);
        },
        "expired-callback": () => {
          setCaptchaCompleted(false);
        },
      },
      auth
    );

    generatedCaptcha.render();

    setCaptchaVerifier(generatedCaptcha);

    setCaptcha(true);
  }, [captcha]);

  useEffect(() => {
    return () => {
      if (otpSetTimeOut == null || otpSetTimeOut.current == null) return;

      clearTimeout(otpSetTimeOut.current);
    };
  }, []);

  //events

  const otpButtonClicked = async () => {
    if (phoneRef.current.value === 0) {
      setSmallMessage(["err", "Please Enter a valid Phone Number"]);
      return;
    }

    if (!isCaptchaCompleted) {
      setSmallMessage(["err", "Please complete the captcha"]);
      return;
    }

    //valid phone number

    setSmallMessage(["", "sending otp..."]);

    //disable button

    setSendOtpOnCoolDown(true);
    setDisabledOtpButton(true);

    otpSetTimeOut.current = setTimeout(() => {
      setSendOtpOnCoolDown(false);
      setDisabledOtpButton(false);
    }, parseInt(coolDownOtpTimeOut) * 1000);
    try {
      setLoading(true);
      const res = await signInWithPhoneNumber(
        auth,
        phoneRef.current.value,
        captchaVerifier
      );
      // success

      setConformationCode(res);
      setSmallMessage(["suc", "otp sent"]);
      setVisibleOtpContainer(true);
    } catch (error) {
      setSendOtpOnCoolDown(false);
      setDisabledOtpButton(false);
      switch (error.code) {
        case "auth/invalid-phone-number":
          setSmallMessage(["err", "Invalid Phone number !!"]);
          setNumErr([true, "Invalid Number"]);
          break;
        case "auth/too-many-requests":
          setSmallMessage([
            "err",
            "Too many requests, Please try again after some time",
          ]);
          break;

        default:
          setSmallMessage([
            "err",
            "an error occurred, please try again after some time",
          ]);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const signInButtonClicked = async () => {
    setSmallMessage(["none", ""]);
    const otp = otpRef.current.value;
    if (otp === "") {
      setSmallMessage(["err", "Please Enter OTP"]);

      return;
    }

    try {
      setLoading(true);
      setSignInButtonDisabled(true);
      const res = await conformationCode.confirm(otp);
      navigate('/')
      console.log(res);
    } catch (error) {
      setLoading(false);
      setSignInButtonDisabled(false);
      switch (error.code) {
        case "auth/invalid-verification-code":
          setSmallMessage(["err", "wrong otp"]);
          setOtpErr([true,"enter otp"])
          break;

        default:
          setSmallMessage([
            "err",
            "an error occurred,  Please try again after some time",
          ]);

          break;
      }
    }
  };

  return (
    <HorizontalsCenterBox id="login" animation={isLoading}>
      <header>Login</header>

      {smallMessage[0] !== "none" ? (
        <SmallMessageBox1 variant={smallMessage[0]} message={smallMessage[1]} />
      ) : (
        false
      )}

      <div className="phoneNumberContainer">
        <PhoneNoPicker
          label="phone number"
          name="phoneNumber"
          hiddenInputRef={phoneRef}
          error={isNumErr}
        />

        <div className="recaptchaContainer" ref={recaptchaContainer}></div>

        {isSendOtpOnCoolDown ? (
          <TimeOutLoader timeout={coolDownOtpTimeOut} text="resend OTP in" />
        ) : null}
        <Button
          disabled={isDisabledOtpButton}
          variant="contained"
          onClick={otpButtonClicked}
          ref={otpButton}
          className="otp-button button"
        >
          Send Otp
        </Button>
      </div>

      {isVisibleOtpContainer ? (
        <div className="otpContainer">
          <TextField
            required
            label="Enter OTP"
            variant="outlined"
            className="otp-container"
            inputRef={otpRef}
            helperText={
              <HelperText text={otpErr[1]} variant={otpErr[0] ? "err" : ""} />
            }
          />
          <Button
            disabled={isSignInButtonDisabled}
            variant="contained"
            onClick={signInButtonClicked}
            ref={signInButton}
            className="signIn-button button"
          >
            Sign In
          </Button>
        </div>
      ) : null}
    </HorizontalsCenterBox>
  );
}
