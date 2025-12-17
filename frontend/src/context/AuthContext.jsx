import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  const [user, setUser] = useState("")
  
  const login = (token, refreshToken, userData) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    setUser(userData);
    setIsLoggedIn(true);
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };