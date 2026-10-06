import React from 'react';
import styles from './Toast.module.css';

export const Toast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`${styles.toast} animate-fade-in`} role="status" aria-live="polite">
      <span className={styles.indicator} />
      <span>{message}</span>
    </div>
  );
};
