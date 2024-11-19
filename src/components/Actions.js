import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "./Actions.css";

function Actions() {
    const navigate = useNavigate();

    const authService = new AuthService();

    const handleAddUser = () => {
        navigate("/users/add");
    };

    const handleLogout = () => {
        authService.logout();
    };

    return (
        <div className="actions-container">
            <button onClick={handleAddUser} className="action-button add-user-button">
                Add User
            </button>
            <button onClick={handleLogout} className="action-button logout-button">
                Logout
            </button>
        </div>
    );
}

export default Actions;
