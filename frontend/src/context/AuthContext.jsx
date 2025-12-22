import { createContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient(); 
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser? JSON.parse(storedUser): null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  
  
  const login = (token, refreshToken, userData) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
    queryClient.clear();
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
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