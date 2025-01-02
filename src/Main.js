import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImage from "./assets/images/images.png"; // Το λογότυπο

const Main = () => {
  const [wasteInput, setWasteInput] = useState('Loading...');
  const [energyOutput, setEnergyOutput] = useState('Loading...');
  const [methanePrevented, setMethanePrevented] = useState('Loading...');
  const navigate = useNavigate(); // Χρήση useNavigate για πλοήγηση

  useEffect(() => {
    // Simulate fetching real-time data
    const fetchData = () => {
      // Replace this with actual API calls
      setWasteInput(`${Math.random().toFixed(2)} tons`);
      setEnergyOutput(`${(Math.random() * 100).toFixed(2)} kWh`);
      setMethanePrevented(`${(Math.random() * 10).toFixed(2)} kg`);
    };

    fetchData();

    // Set interval to update data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleAdminPanelClick = () => {
    // Navigate to Admin Panel
    navigate('/admin'); // Μεταφορά στη σελίδα Admin Panel
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>Campus-Farm Waste-to-Energy Biogas Dashboard</h1>
        <p>Real-time Monitoring and Management of the Biogas System</p>
      </header>

      {/* Main Dashboard Section */}
      <main className="dashboard">
        {/* Live Data Display Section */}
        <section className="data-section">
          <h2>Live Data</h2>
          <div className="data-cards">
            <div className="data-card">
              <h3>Waste Input</h3>
              <p id="waste-input">{wasteInput}</p>
            </div>
            <div className="data-card">
              <h3>Energy Output</h3>
              <p id="energy-output">{energyOutput}</p>
            </div>
            <div className="data-card">
              <h3>Methane Emissions Prevented</h3>
              <p id="methane-prevented">{methanePrevented}</p>
            </div>
          </div>
        </section>

        {/* Admin Panel Section */}
        <section className="admin-panel">
          <h2>Admin Panel</h2>
          <ul>
            <li>System Health Monitoring</li>
            <li>Maintenance Alerts</li>
            <li>User Management</li>
          </ul>
          <button className="btn-admin" onClick={handleAdminPanelClick}>
            Go to Admin Panel
          </button>
        </section>

        {/* Sustainability Info Section */}
        <section className="sustainability-info">
          <h2>Sustainability Impact</h2>
          <p>
            This system showcases the environmental benefits of biogas systems, reducing waste and
            promoting renewable energy initiatives on campus.
          </p>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="app-footer">
        <p>Developed for Campus Renewable Energy Initiatives</p>
      </footer>
    </div>
  );
};

export default Main;
