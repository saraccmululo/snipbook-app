import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"
import LoginLogoutBtn from "./LoginLogoutBtn"
import logo from "../assets/snipbook-logo-clear.png"

const Header = () => {
  const{ user, isLoggedIn } = useContext(AuthContext);

  return (
    <header className="bg-light border-bottom">
      <div className="container d-flex align-items-center justify-content-between p-2 border-bottom bg-light">
        <img src={logo} alt="Snipbook Logo" className="img-fluid" style={{ maxWidth: "200px" }}/>
        <div className="d-flex flex-column align-items-end">
          {isLoggedIn && user && (
            <p className="mb-0 mx-3">Welcome, {user.username}</p>
          )}
          <LoginLogoutBtn />
          </div>
      </div>
      
        
    </header>
  )
}

export default Header