import React, { useEffect, useState } from 'react';
import { listStore } from '../services/UserService';
import { Spinner } from 'react-bootstrap'; // You can install react-bootstrap for this
import '../assets/css/header.css';
import { Link } from 'react-router-dom';


const AllStore = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listStore()
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container text-center">
        <Spinner animation="border" variant="warning" /> {/* You can change the color here */}
        <p>Loading stores...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>Stores</h2> {/* Custom green color for the title */}
      <div className="row">
        {user.map((store) => (
          <div key={store.id} className="col-md-4 mb-4">
            {/* Link wraps the entire card */}
            <Link to={`/save/${store.id}`} style={{ textDecoration: 'none' }}>
              <div className="card shadow-sm" style={{ backgroundColor: '#f9f9f9' }}> {/* Light gray background for cards */}
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#333' }}>{store.location}</h5> {/* Dark text color for card titles */}
                  <p className="card-text" style={{ color: '#555' }}>Name: {store.name}</p>
                  <p className="card-text" style={{ color: '#555' }}>Email: {store.email}</p>
                  <p className="card-text" style={{ color: '#555' }}>Contact: {store.contact}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStore;