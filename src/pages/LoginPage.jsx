import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupPage.module.css';
import signupContentStyles from '../components/SignupContent.module.css';
import emailStyles from '../components/EmailSignupForm.module.css';
import { Navbar } from '../components/Navbar';
import { AuthButton } from '../components/AuthButton';
import { GoogleIcon, EmailIcon } from '../components/Icons';
import { OAuthModal } from '../components/OAuthModal';
import { Toast } from '../components/Toast';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [oauthProvider, setOauthProvider] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBack = () => {
    if (showEmailFields) {
      setShowEmailFields(false);
    } else {
      navigate(-1);
    }
  };

  const handleToggleAuthMode = () => {
    navigate('/signup');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(`Welcome back, ${email}`);
      setTimeout(() => navigate('/explore'), 800);
    }, 600);
  };

  const handleOAuthSuccess = (provider) => {
    showToast(`Logged in via ${provider}`);
    setTimeout(() => navigate('/explore'), 800);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar 
        onBack={handleBack} 
        onToggleAuthMode={handleToggleAuthMode}
        isLoginMode={true}
      />

      <div className={styles.centerArea}>
        <main className={`${signupContentStyles.container} animate-fade-in`} id="login-main">
          <h1 className={signupContentStyles.heading} id="login-heading">
            Log In to IdeaHub
          </h1>

          <p className={signupContentStyles.termsNotice}>
            Access your saved creative work, research notebooks, and collections.
          </p>

          {!showEmailFields ? (
            <div className={signupContentStyles.buttonStack}>
              <AuthButton
                icon={<GoogleIcon />}
                text="Continue with Google"
                onClick={() => setOauthProvider('Google')}
                id="btn-login-google"
              />

              <AuthButton
                icon={<EmailIcon />}
                text="Continue with Email"
                onClick={() => setShowEmailFields(true)}
                id="btn-login-email"
              />
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: '440px' }}>
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
                id="btn-back-to-login-options"
              >
                <span>← Back to login options</span>
              </button>
            </div>
          )}

          <button
            type="button"
            className={signupContentStyles.moreOptionsTrigger}
            onClick={() => navigate('/signup')}
            style={{ marginTop: '24px' }}
            id="btn-login-switch-to-signup"
          >
            <span>NEW TO IDEAHUB? CREATE ACCOUNT</span>
          </button>
        </main>
      </div>

      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerLeft}>
          <span>IDEAHUB PLATFORM</span>
          <span className={styles.editionTag}>EDITION 2026.1</span>
        </div>
        <div className={styles.footerRight}>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </footer>

      <OAuthModal
        provider={oauthProvider}
        onClose={() => setOauthProvider(null)}
        onSuccess={handleOAuthSuccess}
      />

      <Toast message={toastMessage} />
    </div>
  );
};
