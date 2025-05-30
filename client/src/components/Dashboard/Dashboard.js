import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Rackon Inventory Management</h1>
        <h2>Dashboard</h2>
      </header>
      <div className="dashboard-grid">
        <Link to="/profile" className="card">
          <h3><span role="img" aria-label="profile">👤</span> Profile</h3>
          <p>View and manage your profile details.</p>
        </Link>
        <Link to="/under-sales" className="card">
          <h3><span role="img" aria-label="under sales">⬇️</span> Under Sales</h3>
          <p>Analyze products with sales below expectations.</p>
        </Link>
        <Link to="/over-sales" className="card">
          <h3><span role="img" aria-label="over sales">⬆️</span> Over Sales</h3>
          <p>Analyze products with sales above expectations.</p>
        </Link>
        <Link to="/trends" className="card">
          <h3><span role="img" aria-label="trends">📈</span> Trends</h3>
          <p>View sales trends over time.</p>
        </Link>
        <Link to="/overdated" className="card">
          <h3><span role="img" aria-label="overdated">⏰</span> Overdated</h3>
          <p>View products that are overdated or expired.</p>
        </Link>
        <Link to="/monthly-sales" className="card">
          <h3><span role="img" aria-label="monthly sales">📅</span> Monthly Sales</h3>
          <p>View monthly sales performance.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;