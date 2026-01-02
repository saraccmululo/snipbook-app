import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../utils/api";
import { useNavigate } from "react-router-dom"; 

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const resetMutation = useMutation({
    mutationFn: requestPasswordReset,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetMutation.mutate(email.trim());
  };

  return (
    <div className="d-flex justify-content-center mt-5 px-3">
      <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body"> 
          <h3 className="text-center mb-4">Reset Your Password</h3>
          
          {!resetMutation.isSuccess ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={resetMutation.isLoading}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-brand w-100"
                disabled={resetMutation.isLoading}
              >
                {resetMutation.isLoading ? "Sending..." : "Send Reset Email"}
              </button>
            </form>
          ) : (
            <p className="text-success text-center mt-2">{resetMutation.data.message}</p>
            )}

            {/* Back to login */}
            <div className="text-center mt-3">
              <button
                className="btn btn-link brand-link mt-3"
                onClick={() => navigate("/login")}
              >
                Back to Login
            </button>
            </div>
            {/* Error message */}
            {resetMutation.isError && (
            <p className="text-danger text-center mt-2">
              {resetMutation.error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
