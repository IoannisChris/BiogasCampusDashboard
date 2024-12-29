import React, { useState } from "react";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
    alert(`Welcome, ${username}!`);
  };

  return (
    <div className="login-container">
      <h2>Σύνδεση</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Όνομα Χρήστη:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Εισάγετε το όνομα χρήστη"
          />
        </div>
        <div>
          <label>Κωδικός Πρόσβασης:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Εισάγετε τον κωδικό πρόσβασης"
          />
        </div>
        <button type="submit">Σύνδεση</button>
      </form>
    </div>
  );
};

export default Login;
