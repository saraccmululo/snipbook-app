import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  
  const login = (token, refreshToken) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    setIsLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };