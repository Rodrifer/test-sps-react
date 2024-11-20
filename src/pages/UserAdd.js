import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import "./UserAdd.css";

function AddUser() {
  const [type, setType] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userService = new UserService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await userService.create(type, name, email, password);
      if (response.status === 201) {
        alert("User added successfully");
        setType("");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/users");
      }
    } catch (err) {
      console.error("Error when add user:", err);
      if (err.response.status === 400) {
        setError("Email already exists");
      }
      if (err.response.status === 401 || err.response.status === 403) {
        setError("Error when add user, verify the data");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-container">
      <h1>Add User</h1>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="form-input"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={() => (window.location.href = "/users")}
          >
            Cancel
          </button>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Loading..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
