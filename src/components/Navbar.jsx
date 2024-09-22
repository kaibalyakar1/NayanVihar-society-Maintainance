import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login-signup"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Nayan Vihar
        </Link>
        <ul className="nav-links">
          <Link to="/">
            <li>About Us</li>
          </Link>
          <Link to="/">
            <li>Moments</li>
          </Link>
          <Link to="/">
            <li>Info</li>
          </Link>
          <Link to="/">
            <li>Address</li>
          </Link>
          <Link to="/">
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
      </div>
    </nav>
  );
};

export default Navbar;
