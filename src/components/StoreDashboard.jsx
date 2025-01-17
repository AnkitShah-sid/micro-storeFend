import React, { useState, useEffect } from 'react';
import "../assets/css/storeDashboard.css";
import Header from './Header'; // Ensure correct component name
import axios from 'axios';

const StoreDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
          {(!isMobile || !selectedItem) && (
            <div className="list">
              {data.map((item) => (
                <div
                  key={item.id}
                  className={`list-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <div>{item.itemName}</div>
                  <div>{item.totalQuantity} {item.unitType}</div>
                </div>
              ))}
            </div>
          )}

          {(selectedItem || !isMobile) && (
            <div className="details">
              {isMobile && selectedItem && (
                <button className="back-button" onClick={handleBackClick}>← Back</button>
              )}
              {selectedItem ? (
                <>
                  <h1>{selectedItem.itemName}</h1>
                  <p5>Total Quantity: {selectedItem.totalQuantity} {selectedItem.unitType}</p5>

                  {/* Display Item Details */}
                  <h3>Item Details:</h3>
                  <table className="item-details-table">
                    <thead>
                      <tr>
                        <th>Item Quantity</th>
                        <th>Unit Type</th>
                        <th>Inbound Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItem.itemDetails && selectedItem.itemDetails.length > 0 ? (
                        selectedItem.itemDetails.map((detail, index) => (
                          <tr key={index}>
                            <td>{detail.itemQuantity || "N/A"}</td>
                           {/* <td>{detail.outbountDate ? new Date(detail.outbountDate).toLocaleString() : "N/A"}</td> */}
                            <td>{detail.unitType || "N/A"}</td>
                            <td>{new Date(detail.inboundDate).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No item details available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
