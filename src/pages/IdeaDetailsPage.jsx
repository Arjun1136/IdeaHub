import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './IdeaDetailsPage.module.css';
import { GlobalNav } from '../components/GlobalNav';
import { getIdeaById } from '../data/mockIdeas';
import { Toast } from '../components/Toast';

export const IdeaDetailsPage = () => {
  const { id } = useParams();
  const idea = getIdeaById(id);

  const [hasJoined, setHasJoined] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!idea) {
    return (
      <div className={styles.container}>
        <GlobalNav />
        <main style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>IDEA NOT FOUND</h1>
          <p style={{ color: '#71717a', marginBottom: '24px' }}>
            The requested project brief does not exist in the archive.
          </p>
          <Link to="/explore" style={{ color: '#000', fontWeight: 600, textTransform: 'uppercase', textDecoration: 'underline' }}>
            ← Return to Explore
          </Link>
        </main>
      </div>
    );
  }

  const handleJoinProject = () => {
    if (hasJoined) {
      setHasJoined(false);
      setToastMessage('Application withdrawn.');
    } else {
      setHasJoined(true);
      setToastMessage(`Collaboration request transmitted to ${idea.creator.name}`);
    }
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className={styles.container}>
      <GlobalNav />

      <main className={styles.mainContent}>
        <div className={styles.topRow}>
          <Link to="/explore" className={styles.backLink}>
            <span>← Back to Explore</span>
          </Link>
          <span className={styles.statusIndicator}>
            STATUS: {idea.status}
          </span>
        </div>

        {/* 01 */}
        <div className={styles.indexNumber}>
          {idea.index}
        </div>

        {/* IDEA TITLE */}
        <h1 className={styles.title}>
          {idea.title}
        </h1>

        <p className={styles.tagline}>
          {idea.tagline}
        </p>

        {/* Problem */}
        <section className={styles.sectionBlock}>
          <h2 className={styles.sectionHeading}>Problem</h2>
          <p className={styles.paragraphText}>
            {idea.problem}
          </p>
        </section>

        {/* Solution */}
        <section className={styles.sectionBlock}>
          <h2 className={styles.sectionHeading}>Solution</h2>
          <p className={styles.paragraphText}>
            {idea.solution}
          </p>
        </section>

        {/* TECH STACK & LOOKING FOR */}
        <div className={styles.specGrid}>
          <div className={styles.specCol}>
            <h2 className={styles.sectionHeading}>TECH STACK</h2>
            <div className={styles.stackList}>
              {idea.techStack.map((tech, idx) => (
                <span key={idx} className={styles.stackItem}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.specCol}>
            <h2 className={styles.sectionHeading}>LOOKING FOR</h2>
            <ul className={styles.skillsList}>
              {idea.lookingFor.map((skill, idx) => (
                <li key={idx} className={styles.skillEntry}>
                  <span className={styles.bullet}>+</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* [ JOIN PROJECT ] */}
        <section className={styles.joinSection}>
          <button
            type="button"
            className={`${styles.joinButton} ${hasJoined ? styles.joinedActive : ''}`}
            onClick={handleJoinProject}
            id="btn-join-project"
          >
            {hasJoined ? 'APPLICATION SUBMITTED ✓' : '[ JOIN PROJECT ]'}
          </button>
          <span style={{ fontSize: '12px', color: '#71717a' }}>
            Direct studio dispatch to project lead {idea.creator.handle}
          </span>
        </section>

        <div className={styles.creatorSignature}>
          <span>ARCHIVE ENTRY: {idea.id} · {idea.category}</span>
          <span>ORIGINATOR: {idea.creator.name} ({idea.creator.handle})</span>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #000000', padding: '32px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', textTransform: 'uppercase' }}>
        <div>IDEAHUB PLATFORM · EST. 2026</div>
        <div>ALL RIGHTS RESERVED</div>
      </footer>

      <Toast message={toastMessage} />
    </div>
  );
};
