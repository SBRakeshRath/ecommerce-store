import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "components/login/login";
import Dashboard from "components/dashboard/dashboard";
import NewUSerStep from "components/login/newUserStep";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebase.js";
import axios from "axios";
import userDataActions from "redux-local/actions/userData.actions";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const config = {
        url: process.env.REACT_APP_BACKEND_LINK + "login",
        method: "POST",
        withCredentials: true,
        data: {
          idToken: user.accessToken,
        },
      };

      try {
        const res2 = await axios(config);
        dispatch(
          userDataActions.setData(true, true, false, res2.name, res2.gender)
        );
      } catch (error) {
        dispatch(userDataActions.setData(false, true, false, "Guest", "male"));
      }
    } else {
      dispatch(userDataActions.setLoading(false));
    }
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/newUser" element={<NewUSerStep />}></Route>
      </Routes>
    </div>
  );
}

export default App;
