import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"
import LoginLogoutBtn from "./LoginLogoutBtn"
import logo from "../assets/snipbook-logo-clear.png"
import { Link } from "react-router-dom";

const Header = () => {
  const{ user, isLoggedIn } = useContext(AuthContext);

  return (
    <header className="bg-light border-bottom">
      <div className="container d-flex align-items-center justify-content-between p-2 border-bottom bg-light">
        
        <Link to={isLoggedIn ? "/dashboard": "/"}><img src={logo} alt="Snipbook Logo" className="img-fluid" style={{ maxWidth: "250px" }}/></Link>
        <div className="d-flex align-items-center">
          {isLoggedIn && user && (
            <p className="mb-0 me-3"><strong>{user.display_name}</strong>
            </p>
          )}
          <LoginLogoutBtn />
          </div>
      </div>
    </header>
  )
}

export default Header