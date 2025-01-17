import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Tab from './components/Tab'; // Import Navbar
import Login from './components/Login';
import "./App.css";

// Admin Components
import AdminDashboard from './components/AdminDashboard';

// Store Dahboard 
import StoreDashboard from './components/StoreDashboard';


// Kitchen Components
import KitchenDashboard from './components/KitchenDashboard';

// Butchery Component
import Butchery from './components/Butchery';

// Wrapper Component to Manage Navbar Visibility
  const Layout = ({ children }) => {
  const location = useLocation();
  
  // Show Navbar only on these routes
  const showTab = ["/admin", "/store", "/butchery"].includes(location.pathname);

  return (
    <>
     <Header />   {/* //header is allways show */}
      {showTab && <Tab />} {/* Navbar shows only on specific pages */}
      {children} {/* Renders the page content */}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 🔑 Authentication Route */}
          <Route path="/" element={<Login />} />

          {/* 🛠️ Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* 🏬 Store Routes */}
          <Route path="/store" element={<StoreDashboard />} />

          {/* 🍳 Kitchen Routes */}
          <Route path="/kitchen" element={<KitchenDashboard />} />

          {/* 🥩 Butchery Route */}
          <Route path="/butchery" element={<Butchery />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
