import React, { createContext, useState, useLayoutEffect } from "react";
import axios from "axios";

export const csrftoken = createContext();
const CSRFTOKEN = ({ children }) => {
  const [token, setToken] = useState("");
  useLayoutEffect(() => {
    const func = async () => {
      try {
        const result = await axios({
          url:
            process.env.REACT_APP_BACKEND_LINK +
            "/ProtectedRouteRouter/csrfProtected",
          method: "get",
          crossDomain: true,
          withCredentials: true,
        });
        setToken(result.data.token);
      } catch (err) {
      }
    };
    func();
  },[]);
  return <csrftoken.Provider value={token}>{children}</csrftoken.Provider>;
};

export default CSRFTOKEN;
