import React from "react";
import { NavLink } from "@mantine/core";
import { Link } from "react-router-dom";
import Login from "../../auth/components/login";
import Auth from "../../auth/components/auth";

function Header(props) {
  return (
    <header
      data-testid="todo-header"
      style={{
        backgroundColor: "#007BFF",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}> Logo</h1>
      </div>

      {/* Conditionally render the Login and Auth components */}
      <Auth>
        <nav>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
            }}
          >
            <li style={{ marginRight: "1rem" }}>
              <NavLink label="Home" component="a" href="/" />
              {/* <Link to="/">home</Link> */}
            </li>
            <li>
              <NavLink label="Settings" component="a" href="/settings" />
              {/* <Link to="/settings">settings</Link> */}
            </li>
          </ul>
        </nav>
      </Auth>

      {/* Conditionally render the Login component */}
      <Login />
    </header>
  );
}

export default Header;
