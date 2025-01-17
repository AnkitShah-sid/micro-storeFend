import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/css/tab.css";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Function to handle dropdown navigation
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  return (
    <div className="section-tabs">
      {/* Centered Tabs */}
      <div className="tabs-container">
        <div className={`section-tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}>
          <Link to="/store" className="tab-link">Item</Link>
        </div>
        <div className={`section-tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
          <Link to="/admin" className="tab-link">Vendor</Link>
        </div>
        <div className={`section-tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
          <Link to="/page3" className="tab-link">Buchery</Link>
        </div>
      </div>

      {/* Right Controls (Search & Dropdown) */}
      <div className="right-controls">
        <button className="search-button">Search</button>
        
        {/* Dropdown for navigation */}
        <select className="dropdown" onChange={handleDropdownChange}>
          <option value="">Select</option>
          <option value="/option1">Option 1</option>
          <option value="/option2">Option 2</option>
          <option value="/option3">Option 3</option>
        </select>
      </div>
    </div>
  );
};

export default Tab;
