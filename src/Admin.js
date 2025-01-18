import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminPanel = () => {
  const navigate = useNavigate();

  // State για γραφήματα και φίλτρα
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [unit, setUnit] = useState("kWh");

  // Δεδομένα παραδείγματος
  const data = [
    { date: "2025-01-01", value: 100 },
    { date: "2025-01-02", value: 120 },
    { date: "2025-01-03", value: 130 },
    // Περισσότερα δεδομένα
  ];

  // Φιλτράρισμα δεδομένων βάσει ημερομηνιών
  const filteredData = data.filter(
    (d) =>
      new Date(d.date) >= startDate &&
      new Date(d.date) <= endDate
  );

  // Μετατροπή μονάδων
  const convertUnit = (value) => {
    if (unit === "MWh") return (value / 1000).toFixed(2);
    return value.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    alert("Έχετε αποσυνδεθεί με επιτυχία.");
    navigate("/");
  };

  // Νέα λειτουργία για πλοήγηση στη σελίδα User Management
  const handleManageUsersClick = () => {
    navigate("/user-management"); // Πλοήγηση στη διαδρομή User Management
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="btn-logout">
          Αποσύνδεση
        </button>
      </header>

      <main className="admin-main">
        {/* Σύστημα Υγείας */}
        <section className="system-health">
          <h2>System Health Monitoring</h2>
          <p>
            Status: <span className="status">Good</span>
          </p>
          <p>
            Last Maintenance: <span className="date">2025-01-01</span>
          </p>
        </section>

        {/* Γραφήματα */}
        <section className="data-visualization">
          <h2>Data Visualization</h2>
          <div>
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <LineChart width={600} height={300} data={filteredData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </section>

        {/* Εξατομίκευση Μονάδων */}
        <section className="unit-customization">
          <h2>Unit Customization</h2>
          <label>Select Unit:</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="kWh">kWh</option>
            <option value="MWh">MWh</option>
          </select>
          <p>
            Energy Output: {convertUnit(100)} {unit} (Example)
          </p>
        </section>

        {/* Διαχείριση Χρηστών */}
        <section className="user-management">
          <h2>User Management</h2>
          <p>
            Total Users: <span className="user-count">10</span>
          </p>
          <button className="btn-manage-users" onClick={handleManageUsersClick}>
            Manage Users
          </button>
        </section>
      </main>

      <footer className="admin-footer">
        <p>&copy; 2024 Campus Farm Waste-to-Energy Dashboard. Admin Panel.</p>
      </footer>
    </div>
  );
};

export default AdminPanel;
