import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import API from "../utils/api.js";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const userResponse = await API.post("register/", userData);
      
      const response = await API.post("token/", {
        email: userResponse.data.email,
        password: userData.password,
      });
      console.log("userResponse.data:", userResponse.data);

      return response.data;
  },

    onSuccess: (data) => {
      login(data.access, data.refresh, data.user);
      setErrorMessage("");
      navigate ("/dashboard");
    },

    onError: (error) => {
    const data = error.response?.data;
    if (data?.email) setErrorMessage(Array.isArray(data.email) ? data.email[0] : data.email);
    else if (data?.username) setErrorMessage(Array.isArray(data.username) ? data.username[0] : data.username);
    else if (data?.password) setErrorMessage(Array.isArray(data.password) ? data.password[0] : data.password);
    else if (typeof data === "string") setErrorMessage(data);
    else setErrorMessage("Registration failed. Please try again.");
  },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage("");

    registerMutation.mutate({
      username,
      email,
      password,
    });
  };

  return (
    <div className="d-flex justify-content-center mt-5 px-3">
    <div className="card shadow-sm" style={{ maxWidth: "450px", width: "100%" }}>
      <div className="card-body">

      <h3 className="text-center mb-4">Create an account</h3>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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

        {/* Confirm Password */}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-100 btn btn-brand"
          disabled={registerMutation.isLoading}
        >
          {registerMutation.isLoading ? "Creating account..." : "Register"}
        </button>
      </form>

      {/* Error message */}
      {errorMessage && (
        <p className="text-danger mt-3 text-center">{errorMessage}</p>
      )}

      {/* Login link */}
      <p className="text-center mt-3 mb-0">
        Already have an account?{" "}
        <Link to="/login" className="brand-link">Login here</Link>
      </p>

    </div>
  </div>
</div>

);
};

export default Register;
