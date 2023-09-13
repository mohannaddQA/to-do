import React from "react";

function Footer(props) {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "2rem 1rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <p>&copy; {new Date().getFullYear()} Your Company Name</p>
        <p>123 Main Street, City, Country</p>
        <p>Email: info@yourcompany.com</p>
      </div>
    </footer>
  );
}

export default Footer;
