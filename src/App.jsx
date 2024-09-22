import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginSignup from "./components/Auth/LoginSignup";
import ProfilePage from "./components/Profile/ProfilePage";
import Admin from "./components/Admin/Admin";
import PaymentForm from "./components/Payment/PaymentForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {loading && <div className="loading">Loading...</div>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login-signup"
          element={
            <LoginSignup onLogin={handleLogin} setLoading={setLoading} />
          }
        />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin-dashboard" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
