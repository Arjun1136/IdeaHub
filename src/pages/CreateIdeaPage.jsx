import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './CreateIdeaPage.module.css';
import { GlobalNav } from '../components/GlobalNav';
import { saveIdea, getIdeas } from '../data/mockIdeas';

export const CreateIdeaPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('AI / WEB / EDUCATION');
  const [techStack, setTechStack] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !problem.trim() || !solution.trim()) return;

    setLoading(true);
    const ideas = getIdeas();
    const nextIndex = String(ideas.length + 1).padStart(2, '0');
    const newId = nextIndex;

    const newIdea = {
      id: newId,
      index: nextIndex,
      title: title.trim().toUpperCase(),
      tagline: description.trim() || problem.trim().slice(0, 140) + '...',
      category: category.toUpperCase(),
      creator: {
        name: "Studio Member",
        handle: "@member",
        role: "Project Originator"
      },
      publishedAt: "Oct 2026",
      status: "RECRUITING COLLABORATORS",
      problem: problem.trim(),
      solution: solution.trim(),
      description: description.trim() || solution.trim(),
      techStack: techStack.split(/[,/]/).map(s => s.trim()).filter(Boolean),
      lookingFor: skillsNeeded.split(/[,/]/).map(s => s.trim()).filter(Boolean)
    };

    saveIdea(newIdea);

    setTimeout(() => {
      setLoading(false);
      navigate(`/idea/${newId}`);
    }, 400);
  };

  return (
    <div className={styles.container}>
      <GlobalNav />

      <main className={styles.mainContent}>
        <div className={styles.headerRow}>
          <div className={styles.kicker}>NEW ARCHIVE PROPOSAL</div>
          <h1 className={styles.pageTitle}>Create Idea</h1>
          <p className={styles.pageSub}>
            Formalize your thesis statement, problem definition, and collaborator requirements.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Idea Title */}
          <div className={styles.fieldGroup}>
            <label htmlFor="input-title" className={styles.label}>Idea Title</label>
            <input
              id="input-title"
              type="text"
              placeholder="e.g. AUTONOMOUS LOCAL MICRO-GRID"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          {/* Category */}
          <div className={styles.fieldGroup}>
            <label htmlFor="input-category" className={styles.label}>Category</label>
            <select
              id="input-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="AI / WEB / EDUCATION">AI / WEB / EDUCATION</option>
              <option value="SYSTEMS / ENERGY / IOT">SYSTEMS / ENERGY / IOT</option>
              <option value="TYPOGRAPHY / SPATIAL / INTERFACE">TYPOGRAPHY / SPATIAL / INTERFACE</option>
              <option value="HARDWARE / ECOLOGY / BIO-DESIGN">HARDWARE / ECOLOGY / BIO-DESIGN</option>
              <option value="CRYPTOGRAPHY / DISTRIBUTED PROTOCOLS">CRYPTOGRAPHY / DISTRIBUTED PROTOCOLS</option>
            </select>
          </div>

          {/* Problem */}
          <div className={styles.fieldGroup}>
            <label htmlFor="input-problem" className={styles.label}>Problem Statement</label>
            <textarea
              id="input-problem"
              placeholder="What structural or technical friction exists? Be concrete and evidence-based."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className={styles.textarea}
              required
            />
          </div>

          {/* Solution */}
          <div className={styles.fieldGroup}>
            <label htmlFor="input-solution" className={styles.label}>Proposed Solution</label>
            <textarea
              id="input-solution"
              placeholder="What technical intervention or system architecture are you proposing?"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className={styles.textarea}
              required
            />
          </div>

          {/* Description */}
          <div className={styles.fieldGroup}>
            <label htmlFor="input-description" className={styles.label}>Detailed Description & Methodology</label>
            <textarea
              id="input-description"
              placeholder="Field trials, algorithmic flow, execution benchmarks..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
          </div>

          {/* Tech Stack */}
          <div className={styles.fieldGroup}>
            <label htmlFor="input-tech-stack" className={styles.label}>Tech Stack (Comma-separated)</label>
            <input
              id="input-tech-stack"
              type="text"
              placeholder="e.g. React, Node.js, Python, PyTorch, LoRaWAN"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Skills Needed */}
          <div className={styles.fieldGroup}>
            <label htmlFor="input-skills" className={styles.label}>Skills Needed / Looking For</label>
            <input
              id="input-skills"
              type="text"
              placeholder="e.g. Frontend Developer, ML Developer, Systems Architect"
              value={skillsNeeded}
              onChange={(e) => setSkillsNeeded(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          {/* Actions */}
          <div className={styles.actionsSection}>
            <Link to="/explore" className={styles.cancelLink}>
              ← Cancel & Discard
            </Link>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
              id="btn-submit-create-idea"
            >
              {loading ? 'SUBMITTING...' : 'PUBLISH PROJECT BRIEF'}
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
