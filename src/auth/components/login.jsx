import React, { useState, useContext } from "react";
import { When } from "react-if";
import { AuthContext } from "./authContext";
import "./login.css"; // Import your CSS file for styling

function Login(props) {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    authContext.login(username, password);
  };

  return (
    <div className="login-container">
      <When condition={authContext.isLoggedIn}>
        <button className="logout-button" onClick={authContext.logout}>
          Log Out
        </button>
      </When>

      <When condition={!authContext.isLoggedIn}>
        <div className="login-form">
          <input
            className="input-field"
            placeholder="Username"
            name="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="login-button" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </When>
    </div>
  );
}

export default Login;
