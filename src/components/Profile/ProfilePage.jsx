import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paidMonths, setPaidMonths] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

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

        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "Your session has expired. Please log in again.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch user profile.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    // Fetch user payments
    const fetchUserPayments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Tokennnn:", token);
        if (!token) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You must be logged in to fetch payments.",
          });
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/user/payments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const payments = response.data;

        // Use the months array to map the month number to the month name
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const monthsPaid = payments.map((payment) => {
          return {
            month: months[payment.month - 1], // Get the month name
            year: payment.year,
            status: payment.status, // Add status to display if payment is pending or completed
          };
        });

        setPaidMonths(monthsPaid);
      } catch (error) {
        console.error("Error fetching user payments:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch payment history.",
        });
      }
    };

    fetchUserProfile();
    fetchUserPayments();
  }, []);

  const handlePaymentRedirect = () => {
    navigate("/payment");
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You must be logged in to download the file.",
        });
        return;
      }

      const response = await axios.get(
        "http://localhost:8080/api/user/download-self",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "your-payments.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to download the file.",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="profile-container">
      <div className="download-btn-container">
        <button className="download-btn" onClick={handleDownload}>
          Download
        </button>
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
            <div className="payment-status-grid">
              {paidMonths.length > 0 ? (
                paidMonths.map(({ month, year, status }, index) => (
                  <div
                    key={index}
                    className={`payment-status-block ${
                      status === "Paid" ? "paid" : "pending"
                    }`}
                  >
                    {month} {year} - {status}
                  </div>
                ))
              ) : (
                <div>No payments recorded</div>
              )}
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
