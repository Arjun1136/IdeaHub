import React from 'react';
import styles from './TermsText.module.css';

export const TermsText = ({ onTermsClick, onPrivacyClick }) => {
  return (
    <p className={styles.termsText} id="terms-notice">
      By creating an account, you agree to our{' '}
      <button
        type="button"
        onClick={onTermsClick}
        className={styles.link}
        id="link-terms-of-service"
      >
        Terms of Service
      </button>{' '}
      and have read and understood the{' '}
      <button
        type="button"
        onClick={onPrivacyClick}
        className={styles.link}
        id="link-privacy-policy"
      >
        Privacy Policy
      </button>
    </p>
  );
};
