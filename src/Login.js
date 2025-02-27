import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from './assets/images/images.png';
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all the fields.");
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        alert(`Welcome, ${data.username}!`);
        localStorage.setItem("token", data.token); 
        localStorage.setItem("isAdmin", data.is_admin); 
        navigate("/"); 
      } else {
        console.error('Login failed:', data.error);
        setError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login request:', error);
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </div>
          <div className="form-actions">
            <button type="submit">Login</button>
            <button type="button" className="forgot-password" onClick={() => alert("You are being redirected to reset your password!")}>Forgot your password?</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
