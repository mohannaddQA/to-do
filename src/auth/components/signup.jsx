import React, { useState, useContext } from "react";
import { When } from "react-if";
import { AuthContext } from "./authContext";
import "./signup.css";
function SignUp(props) {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    authContext.signup(username, password, role);
  };

  return (
    <When condition={!authContext.isLoggedIn}>
      <div className="signup-container">
        <div className="signup-form">
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
          <input
            className="input-field"
            placeholder="user , writer , editor , admin"
            name="role"
            onChange={(event) => setRole(event.target.value)}
          />
          <button className="signup-button" onClick={handleSubmit}>
            signup
          </button>
        </div>{" "}
      </div>
    </When>
  );
}

export default SignUp;
