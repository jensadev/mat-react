/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  ExitToAppRounded,
  MenuOpenRounded,
  MenuRounded
} from '@material-ui/icons';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthService from '../auth/service';

function NavBar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  // const [isProfileCollapsed, setIsProfileCollapsed] = useState(false);
  // const handleProfileCollapse = () =>
  //   setIsProfileCollapsed(!isProfileCollapsed);
  const user = AuthService.getCurrentUser();

  const logoutWithRedirect = () => {
    AuthService.logout();
    window.location.origin;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-nav box-shadow text-uppercase">
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
          {!isNavCollapsed ? (
            <MenuOpenRounded className="navbar-toggler-icon" />
          ) : (
            <MenuRounded className="navbar-toggler-icon" />
          )}
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
            {user && (
              <li className="nav-item">
                <Link tag={NavLink} to="/meals" className="nav-link">
                  Måltider
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!user && (
              <li className="nav-item">
                <Link className="btn btn-primary" to="/login">
                  Logga in
                </Link>
              </li>
            )}
            {user && (
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
                    width="24"
                    height="24"
                  />
                  <span className="ps-1">
                    {isNavCollapsed ? '' : user.name}
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown">
                  {isNavCollapsed ? (
                    <li className="dropdown-item">{user.name}</li>
                  ) : (
                    ''
                  )}
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
                      onClick={() => logoutWithRedirect()}>
                      <ExitToAppRounded /> Logga ut
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
