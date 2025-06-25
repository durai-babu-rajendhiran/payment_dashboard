import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user} = useSelector((state) => ({ ...state }));

  const logout = () => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        localStorage.clear()
        navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            TVS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="justify-content-end collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {!user && (
                <li className="nav-item" key="register">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              )}

              {!user && (
                <li className="nav-item" key="login">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}

              {user && (
                <li className="nav-item dropdown float-right">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.email && user.email.split('@')[0]}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" onClick={logout} href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
