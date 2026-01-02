import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});
// request interceptor to add access token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handling unauthorized 401 error to refresh token
API.interceptors.response.use(
  response => response, // successful response, just return it
  async error => {
    const originalRequest = error.config;

    // If 401 error and we haven't already tried refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh: refreshToken,
          });

          const newAccessToken = res.data.access;
          localStorage.setItem("access_token", newAccessToken);

          // Update original request with new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); // retry the request
        } catch (err) {
          // Refresh token expired → logout
          console.error("Refresh token failed:", err);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
      } else {
        // No refresh token → logout
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Request password reset email
export const requestPasswordReset = async (email) => {
  const response = await API.post("reset-password/", {
    email,
  });

  return response.data; 
};

// Submit new password with token
export const submitNewPassword = async ({ token, uid, password }) => {
  const response = await API.post(`reset-password/${token}/`, {
    uid,
    password,
  });

  return response.data;
};

export default API;
