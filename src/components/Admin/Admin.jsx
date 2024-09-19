import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Admin.css";

const Admin = () => {
  const [usersWithPayments, setUsersWithPayments] = useState([]);

  useEffect(() => {
    const fetchUsersWithPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setUsersWithPayments(response.data);
      } catch (error) {
        console.error("Error fetching users with payments:", error);
      }
    };

    fetchUsersWithPayments();
  }, []);

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/download-all",
        {
          responseType: "blob", // Important to receive the file as a Blob
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // Create a URL for the file blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "UsersWithPayments.xlsx"); // File name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the Excel file:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
      </aside>

      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Users & Payments</h1>
        </header>

        <main>
          <div className="download-btn-container">
            <button className="download-btn" onClick={handleDownloadExcel}>
              Download Excel
            </button>
          </div>

          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>House No</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {usersWithPayments.map((entry) => (
                  <tr key={entry.user._id}>
                    <td>{entry.user.name}</td>
                    <td>{entry.user.email}</td>
                    <td>{entry.user.phoneNumber}</td>
                    <td>{entry.user.houseNumber}</td>
                    <td>
                      {entry.payments.length > 0
                        ? entry.payments.map((payment) => (
                            <div key={payment.paidDate}>
                              {payment.month} / {payment.year}
                            </div>
                          ))
                        : "No payments"}
                    </td>
                    <td>
                      {entry.payments.length > 0
                        ? entry.payments.map((payment) => (
                            <div key={payment.paidDate}>{payment.status}</div>
                          ))
                        : "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
