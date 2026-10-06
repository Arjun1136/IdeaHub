import React, { useState } from 'react';
import styles from './EmailSignupForm.module.css';

export const EmailSignupForm = ({ onBack, onSubmitSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess(email);
    }, 800);
  };

  return (
    <div className={`${styles.formContainer} animate-fade-in`} id="email-signup-section">
      <h1 className={styles.heading}>Create Account with Email</h1>
      <p className={styles.subheading}>Enter your credentials to establish your IdeaHub studio workspace.</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {error && (
          <div className={styles.errorMessage} role="alert" id="form-error">
            {error}
          </div>
        )}

        <div className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="email-input" className={styles.label}>
              Email Address
            </label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className={styles.input}
              required
              autoFocus
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="password-input" className={styles.label}>
              Password
            </label>
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className={styles.inputWrapper}>
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className={styles.input}
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
          id="btn-submit-email-signup"
        >
          {loading ? 'Creating Account...' : 'Continue'}
        </button>
      </form>

      <button
        type="button"
        className={styles.backButton}
        onClick={onBack}
        id="btn-back-to-options"
      >
        <span>← Back to all options</span>
      </button>
    </div>
  );
};
