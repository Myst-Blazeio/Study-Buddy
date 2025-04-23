// src/components/CheckLogin.jsx
import React, { useState, useEffect } from "react";
import HelloWorld from "./HelloWorld"; // Path to your HelloWorld component
import AuthPopup from "./AuthPopup"; // Path to your AuthPopup component
import Toolbar from "./Toolbar"; // Path to your Toolbar component
import DraggableWindow from "./DraggableWindow"; // Path to your DraggableWindow component

const CheckLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is logged in from localStorage
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    // After successful login, set the user as authenticated
    setIsAuthenticated(true);
  };

  return isAuthenticated ? (
    <>
      {/* <Toolbar /> */}
      {/* <DraggableWindow /> */}
      <HelloWorld />
    </>
  ) : (
    <AuthPopup onLoginSuccess={handleLoginSuccess} />
  );
};

export default CheckLogin;
