import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage"; // Ensure this is defined
import LoginSignup from "./components/Auth/LoginSignup";
import ProfilePage from "./components/Profile/ProfilePage";
import PaymentForm from "./components/Payment/PaymentForm";
// Import other components if needed

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment" element={<PaymentForm />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
