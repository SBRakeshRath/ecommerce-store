import HorizontalsCenterBox from "g-components/box/horizontalyCenterBox/horizontalyCenterBox";
import { useState, useRef, useEffect } from "react";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import HelperText from "g-components/text/helperText";
import "./newUser.scss";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import SmallMessageBox1 from "g-components/box/small-message-box/box1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "firebase.js";
import FPL from "g-components/animations/fullPAgeLoading/fpl";

export default function NewUSerStep() {
  // const selector = useSelector();
  const navigate = useNavigate();
  //state

  const [isLoading, setLoading] = useState(true);
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [smallMessage, setSmallMessage] = useState([
    "none",
    "please fill the form",
  ]);

  //ref

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);

  //select
  const loading = useSelector((state) => state.userDataReducer.loading);
  const fLogin = useSelector((state) => state.userDataReducer.fLogin);
  const loggedIn = useSelector((state) => state.userDataReducer.isLoggedIn);


  useEffect(() => {

    if (!loading && !fLogin) {
      return ;
    }
  
    if(loggedIn){
      return ;
    }
    if (loading !== isLoading) {
      setLoading(loading);
    }
  }, [loading]);
  //effect

  const submit = async () => {
    setSmallMessage(["none", ""]);
    setNameErr([false, ""]);
    setEmailErr([false, ""]);
    const gender = genderRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const name = nameRef.current.value.trim();

    if (name === "") {
      setSmallMessage(["err", "Please Enter Name"]);
      setNameErr([true, "Please Enter Name"]);

      return;
    }

    if (name.length > 20) {
      setSmallMessage(["err", "name can contain only 20 letters"]);
      setNameErr([true, "name can contain only 20 letters"]);
      return;
    }

    if (email.length > 20) {
      setSmallMessage(["err", "email can contain only 20 letters"]);
      setEmailErr([true, "email can contain only 20 letters"]);

      return;
    }

    //api request
    const data = {
      idToken: auth.currentUser.accessToken,
      name: name,
      gender: gender,
    };

    if (email !== "") {
      data["email"] = email;
    }
    const config = {
      url: process.env.REACT_APP_BACKEND_LINK + "newUser",
      // headers: {
      //   "csrf-token": token,
      // },
      method: "POST",
      withCredentials: true,
      data: data,
    };

    setLoading(true);
    try {
      await axios(config);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);

      switch (error.code || error.response.data.code) {
        case "DATA_EXITS":
          navigate("/");
          break;
        case "INSUFFICIENT_DATA":
          setSmallMessage(["err", "please enter all the valid data"]);
          break;

        case "INVALID_DATA_FORMAT":
          const data = error.response.data;

          if (data.message === "error in name") {
            nameErr([true, "please Enter valid name under 20 letters"]);
            setSmallMessage(["err", "please enter all the valid data"]);
            return;
          }
          if (data.message === "error in message") {
            nameErr([true, "please Enter valid email under 20 letters"]);
            setSmallMessage(["err", "please enter all the valid data"]);
            return;
          }

          setSmallMessage(["err", "please enter all the valid data"]);

          break;

        case "ERR_TOKEN":
          navigate("/login");
          break;
        default:
          setSmallMessage([
            "err",
            "an error occurred,  Please try again after some time",
          ]);

          break;
      }
    } finally {
    }
  };

 

  useEffect(()=>{
    if (!loading && !fLogin) {
      navigate("/login");
      return ;
    }
  
    if(loggedIn){
      navigate("/");
      return ;
    }

  },[fLogin, loading, loggedIn, navigate])

  if(loading){
    return <FPL />
  }


  return (
    <HorizontalsCenterBox id="newUSerStep" animation={isLoading}>
      <header>Profile Data</header>

      {smallMessage[0] !== "none" ? (
        <SmallMessageBox1 variant={smallMessage[0]} message={smallMessage[1]} />
      ) : (
        false
      )}
      <div className="inputs">
        <TextField
          required
          label="Enter Name"
          variant="outlined"
          inputRef={nameRef}
          className = "input-text-field"
          helperText={
            <HelperText text={nameErr[1]} variant={nameErr[0] ? "err" : ""} />
          }
        />

        <TextField
          label="Enter Email"
          variant="outlined"
          inputRef={emailRef}
          className = "input-text-field"
          helperText={
            <HelperText text={emailErr[1]} variant={emailErr[0] ? "err" : ""} />
          }
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="male"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              inputRef={genderRef}
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </div>

      <Button
        variant="contained"
        className="profile-data-submit-button button"
        onClick={submit}
      >
        Submit
      </Button>
    </HorizontalsCenterBox>
  );
}
