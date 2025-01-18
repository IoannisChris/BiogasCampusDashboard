import React, { useState } from "react";

const UserManagement = () => {
  // Mock δεδομένα χρηστών
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "User" },
    { id: 2, name: "Jane Smith", role: "Admin" },
    { id: 3, name: "Mike Johnson", role: "User" },
  ]);

  // Διαγραφή χρήστη
  const deleteUser = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Αλλαγή ρόλου χρήστη
  const toggleRole = (id) => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, role: user.role === "User" ? "Admin" : "User" } : user
    ));
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <table>
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
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => toggleRole(user.id)}>
                  {user.role === "User" ? "Make Admin" : "Make User"}
                </button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
