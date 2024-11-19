import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const API_URL = "https://test-sps-server.vercel.app/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${API_URL}/auth/login`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/users");

        //window.location.href = "/users"; // Redirect to users page
      }
    } catch (err) {
      console.error("Error at login:", err);
      setError("Error at login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="form-button" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}

export default Login; 