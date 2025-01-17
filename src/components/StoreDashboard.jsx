import React, { useState, useEffect } from 'react';
import "../assets/css/storeDashboard.css"; // Your existing CSS for the dashboard
import Header from './Headere'; // Import the Header component
import axios from 'axios';

const StoreDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track screen size

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.124.69:8080/item/6783aa7e85c0aa7fc49201ad');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle screen resize to update `isMobile`
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBackClick = () => {
    setSelectedItem(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <div className='wrapper'>
        <div className="container">
          {/* Show list only if no item is selected OR on desktop */}
          {(!isMobile || !selectedItem) && (
            <div className="list">
              {data.map((item) => (
                <div
                  key={item.id}
                  className={`list-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <div>{item.name }</div>
                  <div>{item.itemName}</div> {/* Showing itemName in the list */}
                  <div>{item.totalQuantity}</div> {/* Showing totalQuantity in the list */}
                  <div>{item.unitType}</div> {/* Showing unitType in the list */}
                </div>
              ))}
            </div>
          )}

          {/* Show details only if an item is selected OR on desktop */}
          {(selectedItem || !isMobile) && (
            <div className="details">
              {isMobile && selectedItem && (
                <button className="back-button" onClick={handleBackClick}>← Back</button>
              )}
              {selectedItem ? (
                <>
                  <h2>{selectedItem.itemName}</h2>
                  <p>{selectedItem.totalQuantity}</p>
                  <p>{selectedItem.unitType}</p>
                </>
              ) : (
                <p>Select an item to see the details</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
