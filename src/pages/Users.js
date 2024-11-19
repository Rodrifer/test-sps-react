import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import "./Users.css";

function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userService = new UserService();

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const usersList = await userService.list();
            setUsers(usersList);
        } catch (err) {
            setError("Error when fetching users: " + err);
        } finally {
            setLoading(false);
        }
    };
    fetchUsers();
}, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div className="users-container">
      <h1> Users</h1>

      <div>
        <button onClick={() => navigate('/users/add')}>Add User</button>
      </div>

      <div className="users-list">
        {users.length === 0 && <p>No Users</p>}

        {users.length > 0 && (
          <div className="users-header">
            <div>#</div>
            <div>Type</div>
            <div>Name</div>
            <div>Email</div>
            <div>Actions</div>
          </div>
        )}

        {users.length > 0 && users.map((user, index) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <div>{index + 1}</div>
              <div>{user.type}</div>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div className="user-actions">
              <button>Edit</button>
              {user.type !== "admin" && (
                <button onClick={() => {
                  if (window.confirm("Are you sure you want to delete this user: " + user.name + "?"))
                  userService.delete(user.id)}}>Delete</button>  
              )}
            </div>
            </div>
           
          </div>
        ))
        }
        
      </div>

    </div>
  );
}

export default Users;
