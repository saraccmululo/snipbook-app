import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import API from "../utils/api"
import { useNavigate, Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Form, Button, Card } from "react-bootstrap";

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
      navigate ("/dashboard");
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
    <div className="d-flex justify-content-center mt-5 px-3">
      <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">

        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-100 btn btn-brand"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Error message */}
      {errorMessage && (
        <p className="text-danger mt-3 text-center">{errorMessage}</p>
      )}

      {/* Register link */}
      <p className="text-center mt-3 mb-0">
        Don’t have an account?{" "}
        <Link to="/register" className="brand-link">Register here</Link>
      </p>

    </div>
  </div>
</div>

  );
};

  export default Login