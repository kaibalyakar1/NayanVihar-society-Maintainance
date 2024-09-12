import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust this value based on your navbar height
        behavior: "smooth",
      });
    }
    setIsOpen(false); // Close the hamburger menu after click
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Nayan Vihar
        </Link>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/">
            <li onClick={() => scrollToSection("about")}>About Us</li>
          </Link>
          <li onClick={() => scrollToSection("moments")}>Moments</li>
          <li onClick={() => scrollToSection("info")}>Info</li>
          <li onClick={() => scrollToSection("address")}>Address</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
          <li>
            <Link to="/login-signup" className="btn-login-signup">
              <FaUserAlt style={{ marginRight: "8px" }} />
              Login/Signup
            </Link>
          </li>
        </ul>
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
