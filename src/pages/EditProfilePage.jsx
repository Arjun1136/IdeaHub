import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './EditProfilePage.module.css';
import { GlobalNav } from '../components/GlobalNav';
import { getProfile, saveProfile } from '../data/mockProfile';

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const currentProfile = getProfile();

  const [name, setName] = useState(currentProfile.name);
  const [handle, setHandle] = useState(currentProfile.handle);
  const [role, setRole] = useState(currentProfile.role);
  const [bio, setBio] = useState(currentProfile.bio);
  const [skills, setSkills] = useState(currentProfile.skills.join(', '));
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    const updated = {
      ...currentProfile,
      name: name.trim() || currentProfile.name,
      handle: handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim()}`,
      role: role.trim() || currentProfile.role,
      bio: bio.trim() || currentProfile.bio,
      skills: skills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    };

    saveProfile(updated);

    setTimeout(() => {
      setSaving(false);
      navigate('/profile');
    }, 400);
  };

  return (
    <div className={styles.container}>
      <GlobalNav />

      <main className={styles.mainContent}>
        <div className={styles.topRow}>
          <Link to="/profile" className={styles.backLink}>
            <span>← Back to Profile</span>
          </Link>
          <span className={styles.kicker}>
            CREDENTIALS / REVISION 2026.1
          </span>
        </div>

        <h1 className={styles.pageTitle}>Edit Profile</h1>
        <p className={styles.pageSub}>
          Update your studio identity, verified capabilities, and research statement.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label htmlFor="edit-name" className={styles.label}>Full Name / Moniker</label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="edit-handle" className={styles.label}>Studio Handle</label>
            <input
              id="edit-handle"
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className={styles.input}
              required
            />
            <span className={styles.hint}>Used for project dispatch attribution and mentions.</span>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="edit-role" className={styles.label}>Domain / Role Title</label>
            <input
              id="edit-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={styles.input}
              placeholder="e.g. Independent Systems Researcher"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="edit-bio" className={styles.label}>Research Statement (Bio)</label>
            <textarea
              id="edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.textarea}
              rows={4}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="edit-skills" className={styles.label}>Verified Capabilities (Comma-separated)</label>
            <input
              id="edit-skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className={styles.input}
              placeholder="React, TypeScript, WebGL, Distributed Protocols"
              required
            />
            <span className={styles.hint}>Displayed as verified tags across your published idea briefs.</span>
          </div>

          <div className={styles.actionsSection}>
            <Link to="/profile" className={styles.cancelLink}>
              ← Cancel & Revert
            </Link>

            <button
              type="submit"
              disabled={saving}
              className={styles.submitBtn}
              id="btn-save-profile"
            >
              {saving ? 'SAVING CHANGES...' : 'SAVE PROFILE CHANGES'}
            </button>
          </div>
        </form>
      </main>

      <footer style={{ borderTop: '1px solid #000000', padding: '32px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', textTransform: 'uppercase' }}>
        <div>IDEAHUB PLATFORM · EST. 2026</div>
        <div>ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
};
