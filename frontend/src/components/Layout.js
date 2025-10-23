// import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const Layout = ({ children }) => {
//   return (
//     <>
//       <main className="container my-4">{children}</main>
//       <Footer />
//     </>
//   );
// };

// export default Layout;

import React from "react"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
    
      <main className="container my-4 flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

