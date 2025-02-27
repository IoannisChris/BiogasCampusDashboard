import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Header.css'; 
import logoImage from "./assets/images/images.png";
import { handleLogout } from "./utils"; 

const Main = () => {
  const [wasteInput, setWasteInput] = useState(null);
  const [energyOutput, setEnergyOutput] = useState(null);
  const [methanePrevented, setMethanePrevented] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    setIsLoggedIn(!!token); 
  }, [location.pathname]); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/biogas-data/");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        setWasteInput(data.waste_input);
        setEnergyOutput(data.energy_output);
        setMethanePrevented((data.waste_input * 0.25).toFixed(2)); 

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setWasteInput(null);
        setEnergyOutput(null);
        setMethanePrevented(null);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const userRole = localStorage.getItem("isAdmin"); 
  setIsAdmin(userRole === "true"); 
}, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          <img src={logoImage} alt="Λογότυπο" className="logo-image" />
          <div className="logo-text">
            <h1>Campus-Farm Waste-to-Energy Biogas Dashboard</h1>
            <h2>Real-time Monitoring and Management of the Biogas System</h2>
          </div>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            {location.pathname !== "/" && <li><Link to="/">Home</Link></li>}
            {isLoggedIn ? (
            <>
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

      <main className="dashboard">
        <section className="data-section">
          <h2>Live Data</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="data-cards">
              <div className="data-card">
                <h3>Waste Input</h3>
                <p>{wasteInput !== null ? `${wasteInput} tons` : "No Data Available"}</p>
              </div>
              <div className="data-card">
                <h3>Energy Output</h3>
                <p>{energyOutput !== null ? `${energyOutput} kWh` : "No Data Available"}</p>
              </div>
              <div className="data-card">
                <h3>Methane Emissions Prevented</h3>
                <p>{methanePrevented !== null ? `${methanePrevented} kg` : "No Data Available"}</p>
              </div>
            </div>
          )}
        </section>

        {isAdmin && (
          <section className="admin-panel">
            <h2>Admin Panel</h2>
            <ul>
              <li>System Health Monitoring</li>
              <li>Maintenance Alerts</li>
              <li>User Management</li>
            </ul>
            <button className="btn-admin" onClick={() => navigate("/admin")}>
              Go to Admin Panel
            </button>
          </section>
        )}

        <section className="educational-content">
          <h2>Educational Tools</h2>
          <p>Click the button below to learn more about the benefits and mechanisms of the biogas system.</p>
          <button className="btn-educational" onClick={() => navigate("/educational-tools")}>
            Go to Educational Tools
          </button>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>If you have any questions or need assistance, feel free to reach out!</p>
          <button className="btn-contact" onClick={() => navigate("/contact")}>
            Contact Us
          </button>
        </section>

        <section className="sustainability-info">
          <h2>Sustainability Impact</h2>
          <p>This system showcases the environmental benefits of biogas systems, reducing waste and promoting renewable energy initiatives on campus.</p>
        </section>
      </main>

      <footer className="app-footer">
        <p>Developed for Campus Renewable Energy Initiatives</p>
      </footer>
    </div>
  );
};

export default Main;
