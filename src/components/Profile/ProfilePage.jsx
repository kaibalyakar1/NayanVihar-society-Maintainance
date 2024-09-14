import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        console.error("Error fetching user profile:", error);
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
    navigate("/payment");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="download-btn-container">
        <button className="download-btn">Download</button>
      </div>

      {user ? (
        <div className="cards-container">
          <div className="profile-card">
            <h1>Profile</h1>
            <div className="profile-info">
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
            </div>

            <button className="pay-btn" onClick={handlePaymentRedirect}>
              Pay Now
            </button>
          </div>

          <div className="bargraph-card">
            <h3>Monthly Payment Status</h3>
            <div className="bargraph">
              <div className="bar paid">January - Paid</div>
              <div className="bar unpaid">February - Unpaid</div>
              <div className="bar paid">March - Paid</div>
              {/* Add more months as needed */}
            </div>
          </div>
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default ProfilePage;
