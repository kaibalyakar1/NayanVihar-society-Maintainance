import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./profile.css"; // Ensure this path is correct

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You must be logged in to view this page.",
          });
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error); // Debugging info
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message || "Failed to fetch user profile.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handlePaymentRedirect = () => {
    navigate("/payment"); // Redirect to PaymentForm page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-details">
          <h1>Profile</h1>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>House Number:</strong> {user.houseNumber}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          {/* Button to redirect to PaymentForm */}
          <button className="pay-btn" onClick={handlePaymentRedirect}>
            Go to Payment Form
          </button>
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default ProfilePage;
