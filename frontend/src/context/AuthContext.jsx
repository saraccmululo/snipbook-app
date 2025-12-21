import { createContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient(); 
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  const [user, setUser] = useState("");
  
  const login = (token, refreshToken, userData) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    setUser(userData);
    setIsLoggedIn(true);
    queryClient.clear();
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    setUser("");
    queryClient.clear(); // clear React Query cache
    navigate("/"); 
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };