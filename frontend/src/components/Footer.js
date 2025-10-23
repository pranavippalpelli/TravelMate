import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light mt-5 py-3">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="f-info-socials mb-2 mb-md-0">
          <i className="fa-brands fa-facebook me-2"></i>
          <i className="fa-brands fa-square-instagram me-2"></i>
          <i className="fa-brands fa-linkedin me-2"></i>
          <i className="fa-brands fa-square-twitter"></i>
        </div>
        <div className="f-info-brand mb-2 mb-md-0">
          &copy; TravelMate Private Limited
        </div>
        <div className="f-info-links">
          Developed by: Pranav Ippalpelli
          {/* <a href="/Privacy">Privacy</a> &nbsp;&nbsp;
          <a href="/Terms">Terms</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
