import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router's useNavigate
import logoImage from './assets/images/images.png';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all the fields.");
      return;
    }
    setError("");
    alert(`Welcome, ${username}!`);
    navigate("/Main"); // Redirect to /Main after successful login
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src={logoImage} alt="Λογότυπο" className="logo-image" />
          <div className="logo-text">
            <h1>Campus Farm Waste-to-Energy</h1>
            <h2>Biogas System Dashboard</h2>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-actions">
            <button type="submit">Login</button>
            <button
              type="button"
              className="forgot-password"
              onClick={() => alert("You are being redirected to reset your password!")}
            >
              Forgot your password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
