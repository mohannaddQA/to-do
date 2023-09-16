import React, { useContext } from "react";
import { When } from "react-if";

import { AuthContext } from "./authContext";

function Auth(props) {
  const authContext = useContext(AuthContext);
  // we can do destructuring ==>  const { loggedIn, can } = useContext(LoginContext);
  const isLoggedIn = authContext.isLoggedIn;
  const canDo = props.capability ? authContext.can(props.capability) : true;
  const okToRender = isLoggedIn && canDo;

  return <When condition={okToRender}>{props.children}</When>;
}

export default Auth;
