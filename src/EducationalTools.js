import React from "react";
import logoImage from "./assets/images/images.png";
import { Link, useNavigate } from "react-router-dom";
import './Header.css'; 
import { isLoggedIn, isAdmin, logoutUser, handleLogout } from "./utils";

const EducationalTools = () => {
  const navigate = useNavigate();

  return (
    <div className="educational-tools-page">
      <header className="page-header">
        <div className="logo-container">
         <img src={logoImage} alt="Λογότυπο" className="logo-image" />
          <div className="logo-text">
           <h1>Educational Tools</h1>
           <p>Learn more about biogas systems and their environmental benefits.</p>
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

      <main className="educational-content2">
        <section className="overview">
          <h2>What is a Biogas System?</h2>
          <p>
            A biogas system converts organic waste into renewable energy through anaerobic digestion.
            It reduces methane emissions and contributes to sustainability.
          </p>
        </section>

        <section className="benefits">
          <h2>Environmental Benefits</h2>
          <ul>
            <li>Reduces organic waste in landfills.</li>
            <li>Generates renewable energy.</li>
            <li>Prevents methane emissions.</li>
          </ul>
        </section>

        <section className="quiz">
          <h2>Test Your Knowledge</h2>
          <p>Take a short quiz to test what you've learned about biogas systems!</p>
          <button className="btn-quiz" onClick={() => navigate("/quiz")}>Start Quiz</button>
        </section>
      </main>

      <footer className="page-footer">
        <p>Empowering sustainability through education.</p>
      </footer>
    </div>
  );
};

export default EducationalTools;
