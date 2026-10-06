import React from 'react';
import styles from './Navbar.module.css';

export const Navbar = ({ onBack, onToggleAuthMode, isLoginMode }) => {
  return (
    <header className={styles.navbar} role="banner">
      <button 
        type="button" 
        className={styles.navAction} 
        onClick={onBack}
        aria-label="Go back to previous page"
        id="nav-back-button"
      >
        <span aria-hidden="true" style={{ fontSize: '13px' }}>←</span>
        <span>BACK</span>
      </button>

      <button 
        type="button" 
        className={styles.navAction} 
        onClick={onToggleAuthMode}
        aria-label={isLoginMode ? "Switch to create account" : "Switch to log in"}
        id="nav-auth-toggle-button"
      >
        <span>{isLoginMode ? 'SIGN UP' : 'LOG IN'}</span>
      </button>
    </header>
  );
};
