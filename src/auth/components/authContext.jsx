import React, { useState, useEffect, createContext } from "react";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
// import axios from "axios"; // refactotr this code using a real login api with axios

const testUsers = {
  Administrator: {
    // note in the starter code it's written ==> Admininistrator
    password: "admin",
    name: "Administrator",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ",
  },
  Editor: {
    password: "editor",
    name: "Editor",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s",
  },
  Writer: {
    password: "writer",
    name: "Writer",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68",
  },
  User: {
    password: "user",
    name: "User",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go",
  },
};

export const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(undefined);

  const setLoginState = (loggedIn, token, user, error) => {
    setIsLoggedIn(loggedIn);
    setToken(token);
    setUser(user);
    setError(error || null);
    cookie.save("auth", token);
  };

  const can = (capability) => {
    // this syntax is called conditional chaining ==> dont procceed until checking the condition
    console.log(capability);
    console.log(user.capabilities);
    console.log(user.capabilities.includes(capability));
    return user.capabilities.includes(capability);
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoginState(true, token, validUser);
      console.log(validUser);
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.log("Token Validation Error", e);
    }
  };

  const login = async (username, password) => {
    const auth = testUsers[username];
    if (auth && auth.password === password) {
      try {
        validateToken(auth.token);
      } catch (error) {
        setLoginState(isLoggedIn, token, user, error);
        console.error(error);
      }
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  // "componentDidMount"
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, can, error }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
