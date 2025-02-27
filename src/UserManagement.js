import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, handleLogout } from "./utils";
import logoImage from "./assets/images/images.png";

const API_URL = "http://127.0.0.1:8000"; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users/`);
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        const response = await fetch(`${API_URL}/users/${id}/`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete user");
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="user-management-page">
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
      <div className="background-container">
        <div className="content-container">
          <h1>User Management</h1>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td> {/* Role is now read-only */}
                    <td>
                      <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
