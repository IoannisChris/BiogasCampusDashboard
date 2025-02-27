import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from './assets/images/images.png';
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all the fields.");
      return;
    }
    setError("");

    try {
      const response = await fetch('http://127.0.0.1:8000/sign-up/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('User created successfully! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  return (
    <div className="login-page">
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
            <li><Link to="/contact">Επικοινωνία</Link></li>
          </ul>
        </nav>
      </header>

      <div className="login-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
          </div>
          <div className="form-actions">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
