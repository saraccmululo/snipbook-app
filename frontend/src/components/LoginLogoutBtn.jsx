import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginLogout = () => {

  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="header-logout-btn">
      <button className="btn btn-brand" onClick = {isLoggedIn? handleLogout: handleLogin} style={{ borderRadius: "0.40rem"}}> {isLoggedIn? "Logout" : "Login"} 
      </button>
    </div>
  );
}

export default LoginLogout;
