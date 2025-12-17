import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import API from "../utils/api"
import { useNavigate, Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials) =>
      API.post("token/", credentials).then((res) => res.data),

    onSuccess: (data) => {
      login(data.access, data.refresh, data.user);
      navigate ("/");
    },

    onError: (error) => {
      const data = error.response?.data;
      if(data?.email){
        setErrorMessage(data.email[0]);
      } else if (data?.password) {
        setErrorMessage(data.password[0]);
      } else {
        setErrorMessage("Login failed. Please try again");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {errorMessage}
          </p>
        )}
        <p>Don't have an account? {" "}
          <Link to="/register">Register Here</Link>
        </p>
      </div>
  )};

  export default Login