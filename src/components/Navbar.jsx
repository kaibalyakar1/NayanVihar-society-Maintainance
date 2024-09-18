import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to check token and update isLoggedIn state
  const checkAuthToken = () => {
    const token = localStorage.getItem("authToken");
    console.log("Tokennnqwe:", token);
    setIsLoggedIn(!!token); // Set isLoggedIn based on the existence of the token
  };

  // Check token on component mount
  useEffect(() => {
    checkAuthToken(); // Check token on component mount

    // Listen to localStorage changes to detect login/logout across tabs
    window.addEventListener("storage", checkAuthToken);

    return () => {
      // Cleanup the event listener on component unmount
      window.removeEventListener("storage", checkAuthToken);
    };
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token from localStorage
    checkAuthToken(); // Update the state to reflect the logout immediately
    navigate("/login-signup"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Nayan Vihar
        </Link>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => scrollToSection("about")}>
            <li>About Us</li>
          </Link>
          <Link to="/" onClick={() => scrollToSection("moments")}>
            <li>Moments</li>
          </Link>
          <Link to="/" onClick={() => scrollToSection("info")}>
            <li>Info</li>
          </Link>
          <Link to="/" onClick={() => scrollToSection("address")}>
            <li>Address</li>
          </Link>
          <Link to="/" onClick={() => scrollToSection("contact")}>
            <li>Contact</li>
          </Link>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn-login-signup">
                Logout
              </button>
            ) : (
              <Link to="/login-signup" className="btn-login-signup">
                <FaUserAlt style={{ marginRight: "8px" }} />
                Login/Signup
              </Link>
            )}
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
