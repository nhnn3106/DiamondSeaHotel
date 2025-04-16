import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const NavigateContext = createContext([]);

const NavigateProvider = ({ children }) => {
  const paths = {
    home: "/",
    contact: "/contact",
    about: "/about",
    hotelhot: "/hotelhot",
    login: "/login",
    register: "/register",
    profile: "/profile"
  };

  return (
    <NavigateContext.Provider value={{ paths }}>
      {children}
    </NavigateContext.Provider>
  );
};

export default NavigateProvider;
