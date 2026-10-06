import React from 'react';
import styles from './AuthButton.module.css';

export const AuthButton = ({ 
  icon, 
  text, 
  onClick, 
  ariaLabel, 
  variant = 'primary',
  id 
}) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant] || ''}`}
      onClick={onClick}
      aria-label={ariaLabel || text}
      id={id}
    >
      {icon && <span className={styles.iconContainer}>{icon}</span>}
      <span className={styles.label}>{text}</span>
    </button>
  );
};
