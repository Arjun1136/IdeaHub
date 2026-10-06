import React, { useState } from 'react';
import styles from './OAuthModal.module.css';
import { GoogleIcon, AppleIcon, GitHubIcon, SsoIcon, KeyIcon } from './Icons';

export const OAuthModal = ({ provider, onClose, onSuccess }) => {
  const [connecting, setConnecting] = useState(false);

  if (!provider) return null;

  const getProviderIcon = () => {
    switch (provider) {
      case 'Google': return <GoogleIcon />;
      case 'Apple': return <AppleIcon />;
      case 'GitHub': return <GitHubIcon />;
      case 'SSO': return <SsoIcon />;
      case 'Passkey': return <KeyIcon />;
      default: return <GoogleIcon />;
    }
  };

  const handleAuthorize = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      onSuccess(provider);
      onClose();
    }, 700);
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className={`${styles.card} animate-fade-in`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.providerIcon}>
          {getProviderIcon()}
        </div>

        <h2 className={styles.title}>Continue with {provider}</h2>
        <p className={styles.desc}>
          IdeaHub requires read-level profile verification to bind your creative studio credentials.
        </p>

        <div className={styles.accountBox}>
          <div className={styles.avatar}>IH</div>
          <div>
            <div className={styles.accountName}>Creative Member</div>
            <div className={styles.accountEmail}>creator@ideahub.studio</div>
          </div>
        </div>

        <div className={styles.btnGroup}>
          <button 
            type="button" 
            className={styles.authorizeBtn}
            onClick={handleAuthorize}
            disabled={connecting}
            id="btn-oauth-authorize"
          >
            {connecting ? 'Authenticating...' : `Authorize with ${provider}`}
          </button>
          <button 
            type="button" 
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={connecting}
            id="btn-oauth-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
