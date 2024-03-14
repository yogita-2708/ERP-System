import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const totalProducts = 10;
  const totalOrders = 3;

  return (
    <div className="container mt-2 p-4 mb-2">
      <h2 className="title mb-5">DASHBOARD</h2>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card bg-light shadow mb-4">
            <div className="card-body p-4">
              <Link to="/products" className="text-decoration-none text-dark">
                <h3 className="card-title">Total Products</h3>
                <p className="card-text fs-3">{totalProducts}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light shadow mb-4">
            <div className="card-body p-4">
              <Link to="/orders" className="text-decoration-none text-dark">
                <h3 className="card-title">Total Orders</h3>
                <p className="card-text fs-3">{totalOrders}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light shadow mb-4">
            <div className="card-body p-4">
              <Link to="/orders" className="text-decoration-none text-dark">
                <h3 className="card-title">Calendar View</h3>
                <p className="card-text fs-4 mb-1">Go to Calendar</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
