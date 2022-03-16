import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "components/login/login";
import Dashboard from "components/dashboard/dashboard";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
