import React from "react";
import Header from "./components/Header/Header.jsx";
import ToDo from "./components/todo/todo.jsx";
import { SettingsProvider } from "./context/settings/index.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import Example from "../Example.jsx";

function App() {
  return (
    <>
      {" "}
      {/* <Example value="hello">                    
       // this is a way of sending the elements throught the children property to the parent component and access them there
        <h1>this element is sent from the app to the example </h1>  // these two represent the children 
        <h2>this is also sent from the app</h2>
      </Example> */}
      <SettingsProvider>
        {/* <Header /> */}
        <ToDo />
        {/* <Footer /> */}
        {/* whatever here is considered {children} and sent to the SettingsProvider component */}
      </SettingsProvider>
    </>
  );
}

export default App;
