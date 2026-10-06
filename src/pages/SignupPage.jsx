import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupPage.module.css';
import { Navbar } from '../components/Navbar';
import { SignupContent } from '../components/SignupContent';
import { EmailSignupForm } from '../components/EmailSignupForm';
import { PolicyModal } from '../components/PolicyModal';
import { OAuthModal } from '../components/OAuthModal';
import { Toast } from '../components/Toast';

export const SignupPage = () => {
  const navigate = useNavigate();
  // View states: 'options' | 'email'
  const [currentView, setCurrentView] = useState('options');
  const [policyType, setPolicyType] = useState(null);
  const [oauthProvider, setOauthProvider] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleBack = () => {
    if (currentView === 'email') {
      setCurrentView('options');
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  const handleToggleAuthMode = () => {
    navigate('/login');
  };

  const handleContinueGoogle = () => {
    setOauthProvider('Google');
  };

  const handleContinueEmail = () => {
    setCurrentView('email');
  };

  const handleOAuthSuccess = (provider) => {
    showToast(`Successfully authenticated with ${provider}`);
    setTimeout(() => {
      navigate('/explore');
    }, 1000);
  };

  const handleEmailSignupSuccess = (email) => {
    showToast(`Account created for ${email}. Welcome to IdeaHub.`);
    setTimeout(() => {
      navigate('/explore');
    }, 1200);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 1. TOP NAVIGATION */}
      <Navbar 
        onBack={handleBack} 
        onToggleAuthMode={handleToggleAuthMode}
        isLoginMode={false}
      />

      {/* 2. CENTERED SIGNUP CONTENT */}
      <div className={styles.centerArea}>
        {currentView === 'options' ? (
          <SignupContent
            onContinueGoogle={handleContinueGoogle}
            onContinueEmail={handleContinueEmail}
            onOpenPolicy={(type) => setPolicyType(type)}
            onSelectProvider={(provider) => setOauthProvider(provider)}
          />
        ) : (
          <EmailSignupForm
            onBack={() => setCurrentView('options')}
            onSubmitSuccess={handleEmailSignupSuccess}
          />
        )}
      </div>

      {/* EDITORIAL FOOTER METADATA */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerLeft}>
          <span>IDEAHUB PLATFORM</span>
          <span className={styles.editionTag}>EDITION 2026.1</span>
        </div>
        <div className={styles.footerRight}>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </footer>

      {/* POLICY MODAL (TERMS & PRIVACY) */}
      <PolicyModal 
        type={policyType} 
        onClose={() => setPolicyType(null)} 
      />

      {/* OAUTH INTEGRATION MODAL */}
      <OAuthModal
        provider={oauthProvider}
        onClose={() => setOauthProvider(null)}
        onSuccess={handleOAuthSuccess}
      />

      {/* INTERACTIVE TOAST */}
      <Toast message={toastMessage} />
    </div>
  );
};
