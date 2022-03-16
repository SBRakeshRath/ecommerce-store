import React from "react";
import csrfAxiosApi from "g-components/axios/csrfAxios";
import { csrftoken } from "g-components/contexts/CSRFTOKEN";

export const idTokenContext = React.createContext();
export default function IdTokenContextProvider({ children }) {
  const csrfToken = React.useContext(csrftoken);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await csrfAxiosApi("/loginToken", csrfToken, {});
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  return <idTokenContext.Provider>{children}</idTokenContext.Provider>;
}
