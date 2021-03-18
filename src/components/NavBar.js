/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  // const [isProfileCollapsed, setIsProfileCollapsed] = useState(false);
  // const handleProfileCollapse = () =>
  //   setIsProfileCollapsed(!isProfileCollapsed);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-light box-shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/'}>
          Brand
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
          id="navbarNav">
          <ul className="me-auto navbar-nav">
            <li className="nav-item">
              <Link tag={NavLink} to="/" className="nav-link">
                Start
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link tag={NavLink} to="/meals" className="nav-link">
                  Måltider
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!isAuthenticated && (
              <li className="nav-item">
                <button
                  id="qsLoginBtn"
                  className="btn btn-primary"
                  onClick={() => loginWithRedirect()}>
                  Logga in
                </button>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item dropdown">
                <a
                  role="button"
                  className="nav-link"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="nav-user-profile rounded-circle"
                    width="32"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown">
                  <li className="dropdown-item">{user.name}</li>
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Min profil
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="btn btn-link"
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}>
                      Logga ut
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
