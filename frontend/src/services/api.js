import axios from "axios";

const api = axios.create({
  baseURL: "https://campus-tracker-bakend.onrender.com",
  timeout: 5000,
});

// Add token to headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;