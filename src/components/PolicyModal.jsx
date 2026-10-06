import React, { useEffect } from 'react';
import styles from './PolicyModal.module.css';
import { CloseIcon } from './Icons';

export const PolicyModal = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!type) return null;

  const isTerms = type === 'terms';

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className={`${styles.modal} animate-fade-in`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isTerms ? 'IdeaHub — Terms of Service' : 'IdeaHub — Privacy Policy'}
          </h2>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.content}>
          {isTerms ? (
            <>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>1. Creative License & Ownership</h3>
                <p>
                  IdeaHub provides an open canvas and structured studio environment for intellectual exploration. 
                  All artifacts, notes, prototypes, and generative outputs created by you remain your absolute intellectual property.
                </p>
              </div>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>2. Platform Stewardship</h3>
                <p>
                  Members agree to conduct research and creative publishing with rigor and respect. Reverse engineering 
                  underlying infrastructure without written consent is strictly prohibited.
                </p>
              </div>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>3. Service Continuity</h3>
                <p>
                  IdeaHub guarantees data exports in standard open formats (JSON, Markdown, SVG) at any time.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>1. Minimalist Data Philosophy</h3>
                <p>
                  IdeaHub collects strictly the bare minimum telemetry required to synchronize and preserve your canvas state. 
                  We never sell, syndicate, or broker member data to third-party ad networks.
                </p>
              </div>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>2. Identity & Authentication</h3>
                <p>
                  Authentication credentials transmitted via federated OAuth (Google, Apple, GitHub) are cryptographically 
                  signed and stored in accordance with modern SOC2 Type II standards.
                </p>
              </div>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>3. Sovereign Erasure</h3>
                <p>
                  You retain the absolute right to purge your entire IdeaHub studio presence and historical artifacts instantly.
                </p>
              </div>
            </>
          )}
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.doneBtn} onClick={onClose}>
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
