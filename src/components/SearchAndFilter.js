import React from 'react';
import { useTheme } from '../context/ThemeContext';

const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  filterGender, 
  setFilterGender,
  filterDesignation,
  setFilterDesignation,
  designations 
}) => {
  const { isDarkMode } = useTheme();
  const inputClass = `form-control ${isDarkMode ? 'bg-dark text-light' : ''}`;
  const selectClass = `form-select ${isDarkMode ? 'bg-dark text-light' : ''}`;

  return (
    <div className="container mt-4">
      <div className="row g-3">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className={inputClass}
              placeholder="Search by name or designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-4">
          <select
            className={selectClass}
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className={selectClass}
            value={filterDesignation}
            onChange={(e) => setFilterDesignation(e.target.value)}
          >
            <option value="">All Designations</option>
            {designations.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter; 