import { useRef, useEffect, useState } from "react";

import "./textarea.scss";
import HelperText from "g-components/text/helperText";

export default function Textarea(props) {
  const bioRef = useRef(null);
  const bioCountRef = useRef(null);
  const textAreaRefTemp = useRef(null);
  const [err, setErr] = useState([props.err || false, "error"]);
  const textAreaRef = props.inputRef || textAreaRefTemp;

  useEffect(() => {
    if (!props.err) return;

    setErr(props.err);
  }, [props.err]);
  const textChanged = (e) => {
    setErr([false, ""]);
    if (bioCountRef == null) return;
    bioCountRef.current.classList.remove("errText");

    if (props.maxLength) {
      const length = e.target.innerText.length;
      bioCountRef.current.innerText = length + "/" + props.maxLength;

      if (length > props.maxLength) {
        setErr([true, `you can enter upto ${props.maxLength} letter`]);
        bioCountRef.current.classList.add("errText");
      }
    }
    //   e.target.style.height = e.target.scrollHeight + "px"
  };
  useEffect(() => {
    if (!props.maxLength) return;
    if (textAreaRef == null) return;
    if (bioCountRef == null) return;
    bioCountRef.current.innerText =
      textAreaRef.current.innerText.length + "/" + props.maxLength;
  }, [props.maxLength, textAreaRef]);

  return (
    <div ref={bioRef} className="custom_text_area_holder">
      <div className="custom_text_area_holder_header">
        {props.header || "Write something"}
      </div>
      <div className="spanContainer">
        {props.maxLength ? (
          <div className="count" ref={bioCountRef}>
            10/20
          </div>
        ) : null}
        <span
          maxLength={props.maxLength || ""}
          ref={textAreaRef}
          contentEditable
          role="textbox"
          onInput={textChanged}
          className="spanTextArea"
          onFocus={(e)=>{
            e.target.classList.add('spanTextAreaFocused')
          }}
          onBlur = {(e)=>{
            e.target.classList.remove('spanTextAreaFocused')

          }}
        ></span>
      </div>

      {err[0] ? (
        <div className="custom_text_area_holder_errorContainer">
          <HelperText text={err[1]} variant={err[0] ? "err" : ""} />
        </div>
      ) : null}
    </div>
  );
}
