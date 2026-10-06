import React, { useState } from 'react';
import styles from './SignupContent.module.css';
import { AuthButton } from './AuthButton';
import { TermsText } from './TermsText';
import { 
  GoogleIcon, 
  EmailIcon, 
  AppleIcon, 
  GitHubIcon, 
  SsoIcon, 
  KeyIcon 
} from './Icons';

export const SignupContent = ({ 
  onContinueGoogle, 
  onContinueEmail, 
  onOpenPolicy,
  onSelectProvider 
}) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  return (
    <main className={`${styles.container} animate-fade-in`} id="signup-main">
      <h1 className={styles.heading} id="signup-heading">
        Create Your Account
      </h1>

      <TermsText 
        onTermsClick={() => onOpenPolicy('terms')}
        onPrivacyClick={() => onOpenPolicy('privacy')}
      />

      <div className={styles.buttonStack} role="group" aria-label="Sign up options">
        <AuthButton
          icon={<GoogleIcon />}
          text="Continue with Google"
          onClick={onContinueGoogle}
          id="btn-continue-google"
          ariaLabel="Continue with Google"
        />

        <AuthButton
          icon={<EmailIcon />}
          text="Continue with Email"
          onClick={onContinueEmail}
          id="btn-continue-email"
          ariaLabel="Continue with Email"
        />
      </div>

      <button
        type="button"
        className={styles.moreOptionsTrigger}
        onClick={() => setShowMoreOptions(!showMoreOptions)}
        aria-expanded={showMoreOptions}
        aria-controls="extra-auth-options"
        id="btn-more-options"
      >
        <span>{showMoreOptions ? 'FEWER OPTIONS' : 'MORE OPTIONS'}</span>
        <span aria-hidden="true" style={{ fontSize: '13px', lineHeight: 1 }}>
          {showMoreOptions ? '—' : '+'}
        </span>
      </button>

      {showMoreOptions && (
        <div 
          id="extra-auth-options" 
          className={`${styles.moreOptionsWrapper} animate-expand`}
        >
          <div className={styles.secondaryStack}>
            <AuthButton
              icon={<AppleIcon />}
              text="Continue with Apple"
              onClick={() => onSelectProvider('Apple')}
              variant="secondary"
              id="btn-continue-apple"
            />

            <AuthButton
              icon={<GitHubIcon />}
              text="Continue with GitHub"
              onClick={() => onSelectProvider('GitHub')}
              variant="secondary"
              id="btn-continue-github"
            />

            <AuthButton
              icon={<SsoIcon />}
              text="Single Sign-On (SAML / SSO)"
              onClick={() => onSelectProvider('SSO')}
              variant="secondary"
              id="btn-continue-sso"
            />

            <AuthButton
              icon={<KeyIcon />}
              text="Sign up with Passkey"
              onClick={() => onSelectProvider('Passkey')}
              variant="secondary"
              id="btn-continue-passkey"
            />
          </div>
        </div>
      )}
    </main>
  );
};
