import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/StoreDetails.css';

function StoreDetails() {
  const { id } = useParams(); // Get the store ID from the URL
  const [store, setStore] = useState(null); // State to hold store data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected Item

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        // Update the URL to use your computer's IP address instead of localhost
        const response = await fetch(`http://192.168.124.69:8080/save/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch store details');
        }
        const data = await response.json();
        setStore(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>Store Details</h2>
      
      {/* User Details */}
      <div className="card shadow-sm mb-4 p-3">
        <h4>User Information</h4>
        <p><strong>Name:</strong> {store.name}</p>
        <p><strong>Email:</strong> {store.email}</p>
        <p><strong>Contact:</strong> {store.contact}</p>
        <p><strong>Location:</strong> {store.location}</p>
      </div>

      {/* Vendors List */}
      <h4 className="mt-4">Vendors List</h4>
      {store.vendorsLists && store.vendorsLists.length > 0 ? (
        store.vendorsLists.map((vendor) => (
          <div key={vendor.id} className="card mb-3 p-3 shadow-sm">
            <h5 style={{ color: '#3f51b5' }}>Vendor: {vendor.vendorName}</h5>
            <p><strong>Contact Number:</strong> {vendor.vendorContactNumber}</p>

            {/* Items List */}
            {vendor.itemList && vendor.itemList.length > 0 ? (
              <div>
                <h6 className="mt-2">Items:</h6>
                <ul className="list-group">
                  {vendor.itemList.map((item) => (
                    <li key={item.id} className="list-group-item">
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => 
                          setSelectedItemId(selectedItemId === item.id ? null : item.id)
                        }
                      >
                        <strong>Item Name:</strong> {item.itemName}<br />
                        <strong>Total Quantity:</strong> {item.totalQuantity}
                      </div>

                      {/* Show Item Details only when clicked */}
                      {selectedItemId === item.id && item.itemDetails && item.itemDetails.length > 0 && (
                        <div className="mt-2 p-2 bg-light border rounded">
                          <h6>Item Details:</h6>
                          <ul>
                            {item.itemDetails.map((detail, index) => (
                              <li key={index}>
                                {detail.inBoundQuantity && (
                                  <span>
                                    <strong>InBound Quantity:</strong> {detail.inBoundQuantity} | <strong>Date:</strong> {detail.inBoundDate}
                                  </span>
                                )}
                                {detail.outBoundQuantity && (
                                  <span>
                                    <strong>OutBound Quantity:</strong> {detail.outBoundQuantity} | <strong>Date:</strong> {detail.outBoundDate}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedItemId === item.id && (!item.itemDetails || item.itemDetails.length === 0) && (
                        <p className="text-muted mt-2">No item details available.</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No items available for this vendor.</p>
            )}
          </div>
        ))
      ) : (
        <p>No vendors available.</p>
      )}

      {/* Back Button */}
      <button
        className="btn btn-primary mt-4"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
}

export default StoreDetails;
