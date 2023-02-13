import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light py-3">
      <div className="container">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Todo App
        </p>
      </div>
    </footer>
  );
};

export default Footer;
