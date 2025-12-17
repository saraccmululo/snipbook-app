import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import API from "../utils/api.js";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

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
      navigate ("/");
    },

    onError: (error) => {
      const data = error.response?.data;
      if (data?.email) {
      setErrorMessage(data.email[0]);
      } else if (data?.username) {
      setErrorMessage(data.username[0]);
      }else if (data?.password) {
      setErrorMessage(data.password[0]);
      } else {
      setErrorMessage("Registration failed. Please try again.");
      }
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
    <div>
      <h2>Create an account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <input
          type="password"
          placeholder="Confirm password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />

        <button type="submit" disabled={registerMutation.isLoading}>
          {registerMutation.isLoading ? "Creating account..." : "Register"}
        </button>
      </form>
       {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {errorMessage}
          </p>
        )}
    </div>
  );
}

export default Register;
