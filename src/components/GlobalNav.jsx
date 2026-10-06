import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './GlobalNav.module.css';

export const GlobalNav = () => {
  return (
    <header className={styles.nav} role="banner">
      <Link to="/" className={styles.brand} aria-label="IdeaHub Home">
        <span className={styles.brandDot} />
        <span>IDEAHUB</span>
      </Link>

      <nav className={styles.links} aria-label="Main Navigation">
        <NavLink 
          to="/explore" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
        >
          Explore Ideas
        </NavLink>

        <NavLink 
          to="/create" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
        >
          Share Idea
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''} ${styles.hideMobile}`}
        >
          Profile
        </NavLink>

        <NavLink 
          to="/login" 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
        >
          Log In
        </NavLink>

        <Link to="/signup" className={styles.signupBtn} id="nav-signup-btn">
          Sign Up
        </Link>
      </nav>
    </header>
  );
};
