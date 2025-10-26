
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://travelmate-m9g3.onrender.com/api",
});

// Attach token automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
