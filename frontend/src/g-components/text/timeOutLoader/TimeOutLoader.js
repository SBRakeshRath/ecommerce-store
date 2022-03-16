import "./TimeOutLoader.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect, useRef } from "react";
export default function TimeOutLoader({ timeout, text }) {
  const timeOut = useRef(null);
  const [timeRemaining, setTimeRemaining] = useState(() => {
    return parseInt(timeout);
  });

  useEffect(() => {
    timeOut.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev - 1 <= 0) {
          clearInterval(timeOut.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timeOut.current);
    };
  }, []);

  return (
    <div className="time-out-loader-container">
      {timeRemaining <= 0 ? null : (
        <>
          <div className="scroller">
            <CircularProgress size="1rem" />
          </div>
          <div className="text">{text}</div>
          <div className="time">{timeRemaining}sec</div>
        </>
      )}
    </div>
  );
}
