import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import DatePicker from "react-datepicker";
import './Header.css'; 
import "react-datepicker/dist/react-datepicker.css";
import logoImage from "./assets/images/images.png";
import { Link } from "react-router-dom";
import { isLoggedIn, handleLogout } from "./utils";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const AdminPanel = () => {
  const navigate = useNavigate();

  const [healthStatus, setHealthStatus] = useState("Loading...");
  const [lastMaintenance, setLastMaintenance] = useState("N/A");
  const [energyData, setEnergyData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [unit, setUnit] = useState("kWh");

  useEffect(() => {
    fetch(`${API_URL}/health-update/`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setHealthStatus(data.status || "Unknown");
        setLastMaintenance(data.last_maintenance || "N/A");
      })
      .catch((error) => {
        console.error("Error fetching health status:", error);
        setHealthStatus("Error fetching data");
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/energy-data/`)
      .then((response) => response.json())
      .then((data) => {
        setEnergyData(data.energy_data || []);
      })
      .catch((error) => console.error("Error fetching energy data:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/users/`)
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.users.length);
      })
      .catch((error) => console.error("Error fetching total users:", error));
  }, []);

  const filteredData = energyData.filter(
    (d) => new Date(d.timestamp) >= startDate && new Date(d.timestamp) <= endDate
  );

  const convertUnit = (value) => {
    if (unit === "MWh") return (value / 1000).toFixed(2);
    return value.toFixed(2);
  };

  const chartData = filteredData.map((d) => ({
    date: d.timestamp,
    waste_input: d.waste_input.toFixed(2),
    energy_output: convertUnit(d.energy_output),
    methane_prevented: d.methane_prevented.toFixed(2),
  }));

  const handleManageUsersClick = () => {
    navigate("/user-management");
  };

  return (
    <div className="admin-container">
      <header className="header">
        <div className="logo-container">
          <img src={logoImage} alt="Λογότυπο" className="logo-image" />
          <div className="logo-text">
            <h1>Admin Panel</h1>
            <h2>Biogas System Dashboard</h2>
          </div>
        </div>
        <nav className="nav">
          <ul className="nav-links">
          {isLoggedIn ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/main">Main Panel</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><button onClick={() => handleLogout(navigate)} className="btn-logout">Logout</button></li>
              </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
          </ul>
        </nav>
      </header>

      <main className="admin-main">
        <section className="system-health">
          <h2>System Health Monitoring</h2>
          <p>
            Status: <span className="status">{healthStatus}</span>
          </p>
          <p>
            Last Maintenance: <span className="date">{lastMaintenance}</span>
          </p>
        </section>

        <section className="data-visualization">
          <h2>Energy Data Visualization</h2>
          <div>
            <label>Start Date:</label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <label>End Date:</label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>
          <LineChart width={700} height={350} data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Legend />
            <Line type="monotone" dataKey="waste_input" stroke="#ff7300" name="Waste Input (tons)" />
            <Line type="monotone" dataKey="energy_output" stroke="#8884d8" name={`Energy Output (${unit})`} />
            <Line type="monotone" dataKey="methane_prevented" stroke="#82ca9d" name="Methane Prevented (kg)" />
          </LineChart>
        </section>

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

        <section className="user-management">
          <h2>User Management</h2>
          <p>
            Total Users: <span className="user-count">{totalUsers}</span> 
          </p>
          <button className="btn-manage-users" onClick={handleManageUsersClick}>
            Manage Users
          </button>
        </section>
      </main>

      <footer className="admin-footer">
        <p>&copy; 2025 Campus Farm Waste-to-Energy Dashboard. Admin Panel.</p>
      </footer>
    </div>
  );
};

export default AdminPanel;
