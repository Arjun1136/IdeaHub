import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import { GlobalNav } from '../components/GlobalNav';
import { getIdeas } from '../data/mockIdeas';

export const LandingPage = () => {
  const ideas = getIdeas().slice(0, 3);

  return (
    <div className={styles.container}>
      <GlobalNav />

      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.kickerRow}>
          <span>IDEAHUB PLATFORM / STUDIO MANIFESTO</span>
          <span>AUTUMN 2026 ARCHIVE</span>
        </div>

        <h1 className={styles.mainTitle}>
          IDEAS<br />
          ARE MEANT<br />
          TO BE BUILT.
        </h1>

        <div className={styles.asymmetricGrid}>
          <div>
            <p className={styles.leadText}>
              A minimalist publishing canvas and collaborative studio for creators, systems architects, and independent researchers.
            </p>
            <p className={styles.leadSub}>
              No vanity metrics. No algorithmic clutter. Only structured thesis statements, verifiable blueprints, and multidisciplinary collaborators matched to ship.
            </p>
          </div>

          <div className={styles.actionStack}>
            <Link to="/explore" className={styles.editorialBtnSolid} id="hero-explore-btn">
              <span>EXPLORE IDEAS</span>
              <span aria-hidden="true">→</span>
            </Link>

            <Link to="/create" className={styles.editorialBtn} id="hero-share-btn">
              <span>SHARE YOUR IDEA</span>
              <span aria-hidden="true">+</span>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howSection} aria-label="How It Works">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>HOW IT WORKS / THREE PRINCIPLES</h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a' }}>METHODOLOGY</span>
        </div>

        <div className={styles.stepsGrid}>
          <div className={styles.stepCol}>
            <span className={styles.stepIndex}>[ 01 ]</span>
            <h3 className={styles.stepTitle}>DRAFT THE THESIS</h3>
            <p className={styles.stepDesc}>
              Publish a rigorous problem statement, proposed technical intervention, and concrete milestones. Avoid hype.
            </p>
          </div>

          <div className={styles.stepCol}>
            <span className={styles.stepIndex}>[ 02 ]</span>
            <h3 className={styles.stepTitle}>RECRUIT SPECIALISTS</h3>
            <p className={styles.stepDesc}>
              Signal precisely which engineering, design, or algorithmic capabilities are required to build the prototype.
            </p>
          </div>

          <div className={styles.stepCol}>
            <span className={styles.stepIndex}>[ 03 ]</span>
            <h3 className={styles.stepTitle}>BUILD IN THE OPEN</h3>
            <p className={styles.stepDesc}>
              Assemble working codebases, physical schematics, and open-source artifacts with peer review from the collective.
            </p>
          </div>
        </div>
      </section>

      {/* CURATED IDEAS INDEX */}
      <section className={styles.curatedSection} aria-label="Curated Index">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>SELECTED IDEAS INDEX</h2>
          <Link to="/explore" style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000' }}>
            VIEW FULL ARCHIVE ({getIdeas().length}) →
          </Link>
        </div>

        <div>
          {ideas.map((idea) => (
            <Link 
              key={idea.id} 
              to={`/idea/${idea.id}`} 
              className={styles.indexItem}
              id={`landing-idea-${idea.id}`}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemNum}>{idea.index}</span>
                <span className={styles.itemTitle}>{idea.title}</span>
              </div>
              <div className={styles.itemDetails}>
                <p className={styles.itemTagline}>{idea.tagline}</p>
                <div className={styles.itemCategory}>{idea.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #000000', padding: '32px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', textTransform: 'uppercase' }}>
        <div>IDEAHUB PLATFORM · EST. 2026</div>
        <div>ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
};
