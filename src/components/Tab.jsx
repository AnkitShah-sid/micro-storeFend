import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../assets/css/tab.css";

const Tab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="section-tabs">
      <div
        className={`section-tab ${activeTab === 0 ? 'active' : ''}`}
        onClick={() => handleTabClick(0)}
      >
        <Link to="/store" className="tab-link">Items</Link> {/* Link to Page 1 */}
      </div>
      <div
        className={`section-tab ${activeTab === 1 ? 'active' : ''}`}
        onClick={() => handleTabClick(1)}
      >
        <Link to="/admin" className="tab-link">Tab 2</Link> {/* Link to Page 2 */}
      </div>
      <div
        className={`section-tab ${activeTab === 2 ? 'active' : ''}`}
        onClick={() => handleTabClick(2)}
      >
        <Link to="/page3" className="tab-link">Tab 3</Link> {/* Link to Page 3 */}
      </div>
    </div>
  );
};

export default Tab;
