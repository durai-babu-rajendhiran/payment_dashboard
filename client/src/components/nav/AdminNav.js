import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-light vh-100 p-3 border-end" style={{ width: "250px" }}>
      <h5 className="mb-4">Admin Panel</h5>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active text-light fw-bold" : "text-dark"}`}
          >
            <i className={`fa fa-tachometer-alt me-2 ${isActive("/dashboard") ? "text-primary" : ""}`}></i>
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/payment"
            className={`nav-link ${isActive("/payment") ? "active text-light fw-bold" : "text-dark"}`}
          >
            <i className={`fa fa-credit-card me-2 ${isActive("/payment") ? "text-light" : ""}`}></i>
            Payment
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/accounts"
            className={`nav-link ${isActive("/accounts") ? "active text-light fw-bold" : "text-dark"}`}
          >
            <i className={`fa fa-receipt me-2 ${isActive("/accounts") ? "text-light" : ""}`}></i>
            Accounts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
