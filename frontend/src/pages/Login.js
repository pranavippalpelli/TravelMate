// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";
// import Layout from "../components/Layout";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", form);
//       // user info returned from backend
//       navigate("/");
//       window.location.reload(); // optional: refresh to update Navbar
//     } catch (err) {
//       alert(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <Layout>
//       <h3 className="mt-3">Login</h3>
//       <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" required />
//         </div>
//         <button className="btn btn-success">Login</button>
//       </form>
//     </Layout>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Layout from "../components/Layout";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/login", form);
      await API.get("/auth/me"); // confirms cookie works
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Layout>
      <h3 className="mt-3">Login</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-success">Login</button>
      </form>
    </Layout>
  );
};

export default Login;
