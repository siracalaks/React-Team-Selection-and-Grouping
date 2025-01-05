import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Nav = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  
  const isActive = (path) => location.pathname === path;
  const navClass = `navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`;
  const linkClass = (path) => `nav-link ${isActive(path) ? 'active' : ''}`;

  return (
    <nav className={navClass}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-people-fill me-2"></i>
          Team Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={linkClass("/")} to="/">
                <i className="bi bi-list-check me-1"></i>
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass("/grouped-team-members")} to="/grouped-team-members">
                <i className="bi bi-diagram-3-fill me-1"></i>
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass("/dashboard")} to="/dashboard">
                <i className="bi bi-graph-up me-1"></i>
                Analytics
              </Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass("/drag-and-drop")} to="/drag-and-drop">
                <i className="bi bi-grid-3x3-gap me-1"></i>
                Kanban Board
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 