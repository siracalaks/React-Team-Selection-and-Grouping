import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'} btn-sm`}
      onClick={toggleTheme}
      style={{ position: 'fixed', bottom: '20px', right: '20px', borderRadius: '50%', width: '50px', height: '50px' }}
    >
      <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
    </button>
  );
};

export default ThemeToggle; 