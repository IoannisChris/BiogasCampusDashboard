import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoImage from "./assets/images/images.png";

const Main = () => {
  const [wasteInput, setWasteInput] = useState("Loading...");
  const [energyOutput, setEnergyOutput] = useState("Loading...");
  const [methanePrevented, setMethanePrevented] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      setWasteInput(`${Math.random().toFixed(2)} tons`);
      setEnergyOutput(`${(Math.random() * 100).toFixed(2)} kWh`);
      setMethanePrevented(`${(Math.random() * 10).toFixed(2)} kg`);
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAdminPanelClick = () => {
    navigate("/admin");
  };

  const handleEducationalToolsClick = () => {
    navigate("/educational-tools");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Campus-Farm Waste-to-Energy Biogas Dashboard</h1>
        <p>Real-time Monitoring and Management of the Biogas System</p>
      </header>

      <main className="dashboard">
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

        <section className="educational-content">
          <h2>Educational Tools</h2>
          <p>
            Click the button below to learn more about the benefits and mechanisms of the biogas system.
          </p>
          <button className="btn-educational" onClick={handleEducationalToolsClick}>
            Go to Educational Tools
          </button>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>If you have any questions or need assistance, feel free to reach out!</p>
          <button className="btn-contact" onClick={handleContactClick}>
            Contact Us
          </button>
        </section>

        <section className="sustainability-info">
          <h2>Sustainability Impact</h2>
          <p>
            This system showcases the environmental benefits of biogas systems, reducing waste and
            promoting renewable energy initiatives on campus.
          </p>
        </section>
      </main>

      <footer className="app-footer">
        <p>Developed for Campus Renewable Energy Initiatives</p>
      </footer>
    </div>
  );
};

export default Main;
