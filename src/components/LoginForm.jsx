import React, { useState } from 'react';
import styles from './SignupContent.module.css';
import emailStyles from './EmailSignupForm.module.css';
import { GoogleIcon, EmailIcon, AppleIcon } from './Icons';

export const LoginForm = ({ 
  onContinueGoogle, 
  onSwitchToSignup, 
  onLoginSuccess 
}) => {
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email);
    }, 700);
  };

  return (
    <main className={`${styles.container} animate-fade-in`} id="login-main">
      <h1 className={styles.heading} id="login-heading">
        Log In to IdeaHub
      </h1>

      <p className={styles.termsNotice}>
        Access your saved creative work, research notebooks, and collections.
      </p>

      {!showEmailFields ? (
        <div className={styles.buttonStack}>
          <button
            type="button"
            className={styles.authButton}
            onClick={onContinueGoogle}
            id="btn-login-google"
          >
            <span className={styles.buttonIcon}>
              <GoogleIcon />
            </span>
            <span className={styles.buttonText}>Continue with Google</span>
          </button>

          <button
            type="button"
            className={styles.authButton}
            onClick={() => setShowEmailFields(true)}
            id="btn-login-email-toggle"
          >
            <span className={styles.buttonIcon}>
              <EmailIcon />
            </span>
            <span className={styles.buttonText}>Continue with Email</span>
          </button>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '450px' }}>
          <form className={emailStyles.form} onSubmit={handleSubmit} noValidate>
            {error && (
              <div className={emailStyles.errorMessage} role="alert">
                {error}
              </div>
            )}
            <div className={emailStyles.fieldGroup}>
              <label htmlFor="login-email" className={emailStyles.label}>Email Address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={emailStyles.input}
                required
                autoFocus
              />
            </div>
            <div className={emailStyles.fieldGroup}>
              <label htmlFor="login-password" className={emailStyles.label}>Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={emailStyles.input}
                required
              />
            </div>
            <button 
              type="submit" 
              className={emailStyles.submitButton}
              disabled={loading}
              id="btn-submit-login"
            >
              {loading ? 'Authenticating...' : 'Log In'}
            </button>
          </form>

          <button
            type="button"
            className={emailStyles.backButton}
            onClick={() => setShowEmailFields(false)}
          >
            <span>← Back to login options</span>
          </button>
        </div>
      )}

      <button
        type="button"
        className={styles.moreOptionsTrigger}
        onClick={onSwitchToSignup}
        style={{ marginTop: '20px' }}
        id="btn-switch-to-signup"
      >
        <span>NEW TO IDEAHUB? CREATE ACCOUNT</span>
      </button>
    </main>
  );
};
