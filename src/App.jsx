import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage"; // Ensure this is defined
import LoginSignup from "./components/Auth/LoginSignup";
// Import other components if needed

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
