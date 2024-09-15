import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginSignup from "./components/Auth/LoginSignup";
import ProfilePage from "./components/Profile/ProfilePage";
import Admin from "./components/Admin/Admin";
import PaymentForm from "./components/Payment/PaymentForm"; // If needed
// Import other components if needed

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin-dashboard" element={<Admin />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
