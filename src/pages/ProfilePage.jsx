import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { GlobalNav } from '../components/GlobalNav';
import { getIdeas } from '../data/mockIdeas';
import { getProfile } from '../data/mockProfile';
import { ContributionHeatmap } from '../components/ContributionHeatmap';

export const ProfilePage = () => {
  const [profile, setProfile] = useState(getProfile());
  const allIdeas = getIdeas();
  const createdIdeas = allIdeas.slice(0, 2);
  const joinedProjects = [
    {
      id: "03",
      index: "03",
      title: "SPATIAL TYPOGRAPHIC NOTATION ENGINE",
      role: "Frontend & Shader Contributor",
      status: "ACTIVE MILESTONE"
    },
    {
      id: "04",
      index: "04",
      title: "BIODEGRADABLE MYCELIUM SENSOR SUBSTRATES",
      role: "Reviewer & Benchmark Tester",
      status: "PEER REVIEW"
    }
  ];

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  return (
    <div className={styles.container}>
      <GlobalNav />

      <main className={styles.mainContent}>
        {/* BIO & IDENTITY */}
        <section className={styles.profileBioSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
            <div className={styles.kicker}>STUDIO MEMBER PROFILE {profile.memberNumber}</div>
            <Link 
              to="/profile/edit" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                border: '1px solid #000000',
                backgroundColor: '#ffffff',
                color: '#000000',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 150ms ease'
              }}
              id="btn-edit-profile"
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }}
            >
              [ EDIT PROFILE ]
            </Link>
          </div>

          <h1 className={styles.usernameTitle}>{profile.name}</h1>
          <div className={styles.userHandle}>{profile.handle} · {profile.role} · Member since {profile.memberSince}</div>

          <p className={styles.bioText}>
            {profile.bio}
          </p>

          <div className={styles.skillsArea}>
            <div className={styles.skillsLabel}>VERIFIED CAPABILITIES & DOMAINS:</div>
            <div className={styles.skillsPills}>
              {profile.skills.map((skill, idx) => (
                <span key={idx} className={styles.skillPill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CONTRIBUTIONS METRICS OVERVIEW */}
        <section className={styles.contributionsRow} aria-label="Contributions">
          <div className={styles.contribCol}>
            <span className={styles.contribVal}>{profile.stats.reviews}</span>
            <span className={styles.contribLabel}>Peer Reviews Authored</span>
          </div>

          <div className={styles.contribCol}>
            <span className={styles.contribVal}>{profile.stats.ideasAuthored}</span>
            <span className={styles.contribLabel}>Original Ideas Authored</span>
          </div>

          <div className={styles.contribCol}>
            <span className={styles.contribVal}>{profile.stats.collaborations}</span>
            <span className={styles.contribLabel}>Active Project Collaborations</span>
          </div>
        </section>

        {/* GITHUB / LEETCODE STYLE STREAK CONTRIBUTION HEATMAP */}
        <ContributionHeatmap />

        {/* IDEAS CREATED */}
        <section>
          <h2 className={styles.sectionTitle}>Ideas Created [{createdIdeas.length}]</h2>
          <div className={styles.editorialTable}>
            {createdIdeas.map((idea) => (
              <Link 
                key={idea.id} 
                to={`/idea/${idea.id}`} 
                className={styles.tableRow}
                id={`profile-created-${idea.id}`}
              >
                <span className={styles.rowIdx}>{idea.index}</span>
                <div>
                  <div className={styles.rowTitle}>{idea.title}</div>
                  <div className={styles.rowSub}>{idea.category}</div>
                </div>
                <div className={styles.rowMeta}>
                  {idea.status} →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PROJECTS JOINED */}
        <section>
          <h2 className={styles.sectionTitle}>Projects Joined [{joinedProjects.length}]</h2>
          <div className={styles.editorialTable}>
            {joinedProjects.map((proj) => (
              <Link 
                key={proj.id} 
                to={`/idea/${proj.id}`} 
                className={styles.tableRow}
                id={`profile-joined-${proj.id}`}
              >
                <span className={styles.rowIdx}>{proj.index}</span>
                <div>
                  <div className={styles.rowTitle}>{proj.title}</div>
                  <div className={styles.rowSub}>ROLE: {proj.role}</div>
                </div>
                <div className={styles.rowMeta}>
                  {proj.status} →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid #000000', padding: '32px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', textTransform: 'uppercase' }}>
        <div>IDEAHUB PLATFORM · EST. 2026</div>
        <div>ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
};
