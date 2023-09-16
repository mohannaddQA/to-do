import React from "react";
import Header from "./components/Header/Header.jsx";
import ToDo from "./components/todo/todo.jsx";
import { SettingsProvider } from "./context/settings/index.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SettingsPage from "./components/SettingsForm/SittingsForm.jsx";
// import Example from "../Example.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import AuthProvider from "./auth/components/authContext.jsx";

function App() {
  return (
    <>
      {" "}
      {/* <Example value="hello">                    
       // this is a way of sending the elements throught the children property to the parent component and access them there
        <h1>this element is sent from the app to the example </h1>  // these two represent the children 
        <h2>this is also sent from the app</h2>
      </Example> */}{" "}
      <MantineProvider>
        <AuthProvider>
          <SettingsProvider>
            <Header />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<ToDo />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </BrowserRouter>
            ;
            <Footer />
            {/* whatever here is considered {children} and sent to the SettingsProvider component */}
          </SettingsProvider>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}

export default App;
