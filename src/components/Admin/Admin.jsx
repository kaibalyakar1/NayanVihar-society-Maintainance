import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [usersWithPayments, setUsersWithPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersWithPayments = async () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("role");

      // Check if token and role are present and correct
      if (!token || role !== "admin") {
        navigate("/login-signup"); // Redirect to login if not authorized
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsersWithPayments(response.data);
      } catch (error) {
        console.error("Error fetching users with payments:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("role");
          navigate("/login-signup"); // Redirect to login on unauthorized
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithPayments();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="user-list">
        {usersWithPayments.length === 0 ? (
          <p>No users found.</p>
        ) : (
          usersWithPayments.map(({ user, payments }) => (
            <div key={user.phoneNumber} className="user-card">
              <h2>{user.name}</h2>
              <p>House Number: {user.houseNumber}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              <p>Email: {user.email}</p>
              <h3>Payments:</h3>
              {payments.length === 0 ? (
                <p>No payments found.</p>
              ) : (
                <ul>
                  {payments.map((payment) => (
                    <li key={payment._id}>
                      <p>Month: {payment.month}</p>
                      <p>Year: {payment.year}</p>
                      <p>Amount: ₹{payment.amount}</p>
                      <p>Status: {payment.status}</p>
                      <p>
                        Paid Date:{" "}
                        {payment.paidDate
                          ? new Date(payment.paidDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
