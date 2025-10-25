// import axios from "axios";

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   withCredentials: true, // send cookies
// });

// export default API;
import axios from "axios";

// Make sure REACT_APP_API_URL is set to your Render backend URL in .env
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://travelmate-m9g3.onrender.com/api",
  withCredentials: true, // send cookies
});

export default API;
