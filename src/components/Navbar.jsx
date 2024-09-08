import React, { useState } from "react";
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
        <h1 className="logo" onClick={() => scrollToSection("about")}>
          Nayan Vihar
        </h1>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <li onClick={() => scrollToSection("about")}>About Us</li>
          <li onClick={() => scrollToSection("moments")}>Moments</li>
          <li onClick={() => scrollToSection("info")}>Info</li>
          <li onClick={() => scrollToSection("address")}>Address</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </div>
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
