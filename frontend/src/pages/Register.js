// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";
// import Layout from "../components/Layout";

// const Register = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/register", form);
//       // user info returned from backend
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.error || "Registration failed");
//     }
//   };

//   return (
//     <Layout>
//       <h3 className="mt-3">Register</h3>
//       <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input name="name" type="text" value={form.name} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" required />
//         </div>
//         <button className="btn btn-success">Register</button>
//       </form>
//     </Layout>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Layout from "../components/Layout";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      await API.get("/auth/me"); // cookie check
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Layout>
      <h3 className="mt-3">Register</h3>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
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
        <button className="btn btn-success">Register</button>
      </form>
    </Layout>
  );
};

export default Register;
