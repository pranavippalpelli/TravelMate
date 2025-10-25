
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../utils/api";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     API.get("/auth/me")
//       .then(res => setUser(res.data))
//       .catch(() => setUser(null));
//   }, []);

//   const handleLogout = async () => {
//     await API.post("/auth/logout");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <nav className="navbar navbar-expand-md bg-body-tertiary border-bottom sticky-top">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           <i className="fa-regular fa-compass"></i> TravelMate
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav me-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link className="nav-link" to="/listings">All Listings</Link>
//             </li> */}

//             {user && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/listings/new">Add Your Property</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/my-bookings">My Bookings</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/owner/dashboard">Dashboard</Link>
//                 </li>
//               </>
//             )}
//           </ul>

//           <ul className="navbar-nav">
//             {user ? (
//               <>
//                 <li className="nav-item nav-link">Hi, {user.name || user.email}</li>
//                 <li className="nav-item">
//                   <button className="btn btn-outline-dark" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/auth/login">Login</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/auth/register">Register</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary border-bottom sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TravelMate</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            {user && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/listings/new">Add Your Property</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/my-bookings">My Bookings</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/owner/dashboard">Dashboard</Link></li>
              </>
            )}
          </ul>

          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item nav-link">Hi, {user.name || user.email}</li>
                <li className="nav-item">
                  <button className="btn btn-outline-dark" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/auth/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/auth/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
