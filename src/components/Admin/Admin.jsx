import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

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

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? "No payment" : parsedDate.toLocaleDateString();
  };

  const handleDownloadExcel = () => {
    // Create a new workbook and add a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      usersWithPayments.map((entry) => ({
        Name: entry.user.name,
        Email: entry.user.email,
        "Phone No": entry.user.phoneNumber,
        "House No": entry.user.houseNumber,
        "Payment Date": formatDate(entry.paymentDate),
      }))
    );

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Users with Payments");

    // Write the workbook to a file
    XLSX.writeFile(wb, "UsersWithPayments.xlsx");
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Users</li>
            <li>Payments</li>
            <li>Settings</li>
          </ul>
        </nav>
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
                </tr>
              </thead>
              <tbody>
                {usersWithPayments.map((entry) => (
                  <tr key={entry.user._id}>
                    <td>{entry.user.name}</td>
                    <td>{entry.user.email}</td>
                    <td>{entry.user.phoneNumber}</td>
                    <td>{entry.user.houseNumber}</td>
                    <td>{formatDate(entry.paymentDate)}</td>
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
