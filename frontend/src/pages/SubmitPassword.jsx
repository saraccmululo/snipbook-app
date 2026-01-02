import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { submitNewPassword } from "../utils/api";

const SubmitNewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

   // Get token & uid from url with useLocation
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  const mutation = useMutation({
    mutationFn: submitNewPassword,
    onSuccess: () => {
      navigate("/login", {
        state: {successMessage: "Your password was reset successfully. Please login with your new password."}
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ token, uid, password: password.trim() });
  };

  return (
    <div className="d-flex justify-content-center mt-5 px-3">
      <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <div className="card p-4">
            <h3 className="text-center mb-4">Set New Password</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

                <button
                  type="submit"
                  className="btn btn-brand w-100"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Submitting..." : "Reset Password"}
                </button>
            </form>

            {mutation.isError && (
              <p className="text-danger text-center mt-3">
                {mutation.error.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitNewPassword;
