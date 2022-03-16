import HelperText from "g-components/text/helperText";

import "./phneno.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import en from "react-phone-number-input/locale/en.json";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
export default function PhoneNoPicker(props) {
  const [value, setValue] = useState("");
  const [phoneNum, setPhoneNum] = useState(0);
  const [phoneNoErr, setPhoneNoErr] = useState(props.error || [false, ""]);
  const [countryValue, setCountryValue] = useState("IN");
  const countrySelectRef = useRef(null);
  const countryArray = useMemo(() => {
    const arr = [];
    getCountries().forEach((val) => {
      const obj = {};
      obj[val] = en[val];
      arr.push(obj);
    });

    return arr.sort((a, b) =>
      Object.values(a)[0].localeCompare(Object.values(b)[0])
    );
  }, []);
  useEffect(() => {
    setPhoneNoErr(props.error);
  }, [props.error]);

  // number
  //PHONE NUMBER VALIDATOR FUNCTION

  useEffect(() => {
    if (phoneNoErr[0] || value === "") {
      setPhoneNum(0);
      return;
    }

    setPhoneNum("+" + getCountryCallingCode(countryValue) + value);
  }, [countryValue, phoneNoErr, value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value === "") {
      setPhoneNoErr([false, ""]);

      return;
    }
    function numberValidator() {
      const number = "+" + getCountryCallingCode(countryValue) + value;

      if (!isPossiblePhoneNumber(number)) {
        setPhoneNoErr([true, "Invalid Number"]);
        return false;
      } else {
        setPhoneNoErr([false, ""]);

        return true;
      }
    }
    numberValidator();
  }, [countryValue, value]);

  const countryImageLink = "https://flag.pk/flags/4x3/" + countryValue + ".svg";

  return (
    <div id="phoneNoPicker">
      <div className="countryCodeContainer">
        <div className="flagContainer">
          <div className="flag">
            <img
              src={countryImageLink}
              alt={"+" + getCountryCallingCode(countryValue)}
            />
          </div>
          <div className="icon">
            <ArrowDropDownIcon />
          </div>
        </div>
        <select
          className="countryCodeInput"
          ref={countrySelectRef}
          onChange={(e) => {
            setCountryValue(e.target.value);
            // numberValidator();
          }}
          value={countryValue}
        >
          {countryArray.map((item) => {
            const name = Object.values(item)[0];
            const code = Object.keys(item)[0];
            return (
              <option key={code} value={code}>
                {name + " (" + getCountryCallingCode(code) + ")"}
              </option>
            );
          })}
        </select>
      </div>

      <TextField
        // error={phoneNoErr[0]}
        required={props.required || true}
        label={props.label || "phone number"}
        variant="outlined"
        className="text-field phoneNumberInput"
        onChange={handleChange}
        type="number"
        value={value}
        // inputRef={phoneNo}
        helperText={
          <HelperText
            text={phoneNoErr[1]}
            variant={phoneNoErr[0] ? "err" : ""}
          />
        }
      />
      <input
        type="hidden"
        id=""
        ref={props.hiddenInputRef || null}
        name={props.name || "phoneNumber"}
        value={phoneNum}
      />
    </div>
  );
}
