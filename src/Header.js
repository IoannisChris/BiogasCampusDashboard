import React from "react";
import { Link } from "react-router-dom";
import './Header.css'; // Στυλ για το header
import logoImage from './assets/images/images.png';
import image1 from './assets/images/Biogasanlage_mit_Kompostierung.jpg';
import image2 from './assets/images/Biogasanlage_mit_Kompostierung.jpg';
import image3 from './assets/images/Biogasanlage_mit_Kompostierung.jpg';
import image4 from './assets/images/bi.webp';

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logoImage} alt="Λογότυπο" className="logo-image" />
          <div className="logo-text">
            <h1>Campus Farm Waste-to-Energy</h1>
            <h2>Biogas System Dashboard</h2>
          </div>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Σχετικά</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/contact">Επικοινωνία</Link></li>
          </ul>
        </nav>
      </header>

      <div className="image-container">
        <img src={image4} alt="Background" className="image" />
        <div className="text-overlay">
          <h2>Campus Integration and Sustainability</h2>
          <p>
            Highlight the interconnected role of the biogas system in campus sustainability. 
            E.g., "An innovative step towards a sustainable future—integrating waste 
            management and renewable energy production."
          </p>
        </div>
      </div>

      <div className="section">
        <div className="card">
          <img src={image1} alt="Εικόνα 1" className="card-image" />
          <h3>Campus Integration and Sustainability</h3>
          <p>
            Highlight the interconnected role of the biogas system in campus sustainability. E.g., "An innovative step towards a sustainable future—integrating waste management and renewable energy production."
          </p>
        </div>
        <div className="card">
          <img src={image2} alt="Εικόνα 2" className="card-image" />
          <h3>Educational Value</h3>
          <p>
            Emphasize the educational opportunities for students and staff. E.g.,
            "A real-time educational tool for monitoring biogas production and sustainability metrics."
          </p>
        </div>
        <div className="card">
          <img src={image3} alt="Εικόνα 3" className="card-image" />
          <h3>Environmental Impact</h3>
          <p>
            Stress the positive environmental effects, such as reduced methane emissions. E.g.,
            "Preventing methane emissions while producing renewable energy—empowering our community."
          </p>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Campus Farm Waste-to-Energy Dashboard. All rights reserved.</p>
          <nav className="footer-nav">
            <Link to="/privacy">Privacy Policy</Link> | 
            <Link to="/terms">Terms of Service</Link> | 
            <Link to="/contact">Contact Us</Link>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Header;