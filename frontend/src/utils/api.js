// import axios from "axios";

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   withCredentials: true, // send cookies
// });

// export default API;
// src/utils/api.js
import axios from "axios";

// ✅ Make sure to set this in your Vercel dashboard under Settings → Environment Variables
// Key: REACT_APP_API_URL
// Value: https://travelmate-m9g3.onrender.com/api
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://travelmate-m9g3.onrender.com/api",
  withCredentials: true, // 💥 Critical for sending cookies
});

export default API;
