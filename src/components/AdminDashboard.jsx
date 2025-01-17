import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/admin.css";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("No authentication token found. Please log in.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/auth/Stores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>You are logged out!</h1>
        <p>Please log in again to continue.</p>
      </div>
    );
  }

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="page-content">
      {users.map((user) => (
        <div
          key={user.id}
          className="d_card"
          onClick={() => handleUserClick(user.id)}
          style={{
            backgroundImage: `url(${user.profileImage || 'https://via.placeholder.com/150'})`,
          }}
        >
          {/* SVG Icon for each card */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="card-icon"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '24px',
              height: '24px',
              fill: 'white',
            }}
          >
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>

          <div className="content">
            <h3 className="heading">{user.location}</h3>
            <p className="data-content">{user.name}</p>
            <p className="data-content">{user.email}</p>
            <p className="contact">{user.contact}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
