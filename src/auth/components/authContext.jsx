import React, { useState, useEffect, createContext } from "react";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import axios from "axios"; // refactotr this code using a real login api with axios
import superagent from "superagent";
import base64 from "base-64";

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
    console.log("this is the setted user", user);
    setError(error || null);
    cookie.save("auth", token);
    cookie.save("user", user); // this is only because the token doesn't contain the data so we will have to save the user itself ==> this is bad for security
  };
  /* important note :
the best practice is to take the token from the api ==> use it for any data you need access to 
but the problem , the used api doesn't send a token that doesn't contain the required data (capabilities) so we will have to use the user from the responce and ret it to local sstorage 
then read from local storage
*/
  const can = (capability) => {
    // this syntax is called conditional chaining ==> dont procceed until checking the condition
    //user?.capabilities?.includes(capability);
    return user?.capabilities?.includes(capability);
  };

  const validateToken = (token, user) => {
    // we aren't supposed to send the user ==> but the tocken doesn't contain the needed data
    try {
      let validUser = jwt_decode(token); // since the tocken doesn't contain all the needed data , i will send the hall user for now not the valid user , the correct practice is to set the user from the tocken
      setLoginState(true, token, user);
      console.log("validating the token", validUser);
      /* since the capabilities aren't sent with the token ==> we will send them hard coded from the response.user and we will put them in local storage  */
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.log("Token Validation Error", e);
    }
  };
  /**/
  let signup = async (username, password, role) => {
    const obj = {
      username: username,
      password: password,
      role: role,
    };
    try {
      const url = `https://auth-api-33k1.onrender.com/signup`;
      const res = await axios.post(url, obj);
      console.log(res.data);
      console.log("successful hit");
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.error(e);
      console.log("bad hit");
    }
  };
  /**/
  const login = async (username, password) => {
    // /* old way without an api */
    // const auth = testUsers[username];
    // if (auth && auth.password === password) {
    //   try {
    //     validateToken(auth.token);
    //   } catch (error) {
    //     setLoginState(isLoggedIn, token, user, error);
    //     console.error(error);
    //   }
    // }

    try {
      const response = await superagent
        .post("https://auth-api-33k1.onrender.com/signin")
        .set(
          "authorization",
          `Basic ${base64.encode(`${username}:${password}`)}`
        );
      console.log("body.user>>>>>", response.body.user);
      validateToken(response.body.token, response.body.user); // best practice ==> only send the token and the token will contain all the needed data
    } catch (err) {
      console.log("///////");
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  // "componentDidMount"
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const cookieUser = cookie.load("user"); // this is not a good practice
    const token = qs.get("token") || cookieToken || null;
    const user = qs.get("user") || cookieUser || null;
    console.log("user from cookie", user);
    console.log("hi");
    validateToken(token, user);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, can, error, signup }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
