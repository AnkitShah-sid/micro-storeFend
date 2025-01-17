import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddVendor = () => {
  const [userRfId, setUserRfId] = useState('');
  const [vendor, setVendor] = useState({
    name: '',
    vendorContactNumber: '',
    vendorEmail: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // To toggle form visibility

  // Fetch the logged-in user's ID
  useEffect(() => {
    const fetchUserRfId = async () => {
      setLoading(true);

      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('No authentication token found. Please log in.');
        window.location.href = '/login';
        return;
      }

      try {
        const response = await axios.get('http://192.168.124.69:8080/userid', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserRfId(response.data || ''); // Set userRfId from response
      } catch (error) {
        console.error('Error fetching userRfId:', error);

        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        } else {
          alert('Failed to fetch user ID. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserRfId();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prevVendor) => ({ ...prevVendor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!userRfId) {
      alert('User ID is required!');
      return;
    }

    const { name, vendorContactNumber, vendorEmail, location } = vendor;
    if (!name || !vendorContactNumber || !vendorEmail || !location) {
      alert('Please fill in all fields.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('No authentication token found. Please log in.');
      return;
    }

    try {
      setSaving(true);

      // Correctly substitute userRfId into the URL
      const url = `http://localhost:8080/${userRfId}/add`; // Ensure userRfId is substituted correctly

      // Combine vendor data
      const payload = { ...vendor };

      // Send the POST request to the backend with the dynamic URL
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Vendor saved successfully!');
      console.log('Saved Vendor Response:', response.data);

      // Clear the form
      setVendor({
        name: '',
        vendorContactNumber: '',
        vendorEmail: '',
        location: '',
      });
    } catch (error) {
      console.error('Error saving vendor:', error);

      if (error.response) {
        console.error('Error Response:', error.response.data);
      }

      alert('Failed to save vendor.');
    } finally {
      setSaving(false);
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen); // Toggle the form visibility
  };

  return (
    <div>
      

      {/* Display user ID or loading state */}
      {loading ? (
        <p>Loading user ID...</p>
      ) : userRfId ? (
        <p>
          {/* <strong>Logged-in User ID:</strong> {userRfId} */}
        </p>
      ) : (
        <p>User ID not found.</p>
      )}

      {/* Button to open form */}
      <button 
        style={{ float: 'right', margin: '10px' }} 
        onClick={toggleForm}
      >
        Add Vendor
      </button>

      {/* Vendor form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={vendor.name}
            onChange={handleChange}
            placeholder="Vendor Name"
            required
          />
          <input
            type="text"
            name="vendorContactNumber"
            value={vendor.vendorContactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            required
          />
          <input
            type="email"
            name="vendorEmail"
            value={vendor.vendorEmail}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="location"
            value={vendor.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Vendor'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddVendor;
