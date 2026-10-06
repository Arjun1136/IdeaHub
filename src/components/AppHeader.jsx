import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './AppHeader.module.css';

export const AppHeader = () => {
  return (
    <header className={styles.header} role="banner">
      <Link to="/" className={styles.brandLink} aria-label="IdeaHub Home">
        <span className={styles.brandDot} />
        <span>IDEAHUB</span>
      </Link>

      <nav className={styles.navLinks} aria-label="Main Navigation">
        <NavLink 
          to="/explore" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
        >
          Explore
        </NavLink>

        <NavLink 
          to="/create" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
        >
          + Create Idea
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNavItem : ''} ${styles.hideMobile}`}
        >
          Profile
        </NavLink>

        <NavLink 
          to="/login" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
        >
          Log In
        </NavLink>

        <Link to="/signup" className={styles.ctaButton}>
          Sign Up
        </Link>
      </nav>
    </header>
  );
};
