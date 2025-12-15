import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginLogout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    navigate("login/");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <button onClick = {isLoggedIn? handleLogout: handleLogin}> {isLoggedIn? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default LoginLogout;
