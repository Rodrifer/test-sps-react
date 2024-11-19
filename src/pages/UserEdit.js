import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "./UserEdit.css";

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const userService = new UserService();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userService.get(userId);
        setName(user.name);
        setEmail(user.email);
        setType(user.type);
      } catch (err) {
        setError("Error at fetching user: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await userService.update(userId, {
        name,
        email,
        type,
      });

      if (response.status === 200) {
        alert("User updated successfully");
        setName("");
        setEmail("");
        setType("");
        navigate("/users");
      }
    } catch (err) {
      console.error("Error at update user:", err);
      setError("Error at update user. Verify the data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-user-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="form-input"
          />
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

        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Loading..." : "Update User"}
        </button>
      </form>
    </div>
  );
}

export default EditUser;
