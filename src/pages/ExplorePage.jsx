import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ExplorePage.module.css';
import { GlobalNav } from '../components/GlobalNav';
import { getIdeas } from '../data/mockIdeas';

export const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const allIdeas = getIdeas();
  const categories = ['ALL', 'AI', 'SYSTEMS', 'TYPOGRAPHY', 'HARDWARE'];

  const filteredIdeas = allIdeas.filter((idea) => {
    const matchesCategory = selectedCategory === 'ALL' || idea.category.includes(selectedCategory);
    const matchesSearch = 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.lookingFor.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <GlobalNav />

      <main className={styles.mainContent}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>Explore Ideas</h1>
          <span className={styles.archiveCount}>ARCHIVE INDEX [{filteredIdeas.length}]</span>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.filterGroup} role="tablist" aria-label="Category filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilterBtn : ''}`}
                onClick={() => setSelectedCategory(cat)}
                role="tab"
                aria-selected={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="search"
            placeholder="Search ideas, skills, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search ideas"
          />
        </div>

        <section className={styles.editorialList} aria-label="Ideas Catalog">
          {filteredIdeas.length > 0 ? (
            filteredIdeas.map((idea) => (
              <Link 
                key={idea.id} 
                to={`/idea/${idea.id}`} 
                className={styles.ideaEntry}
                id={`explore-entry-${idea.id}`}
              >
                {/* LARGE INDEX NUMBER */}
                <div className={styles.indexCol}>
                  {idea.index}
                </div>

                {/* MAIN CONTENT */}
                <div className={styles.contentCol}>
                  <h2 className={styles.entryTitle}>{idea.title}</h2>
                  <p className={styles.entryDesc}>{idea.tagline}</p>

                  <div className={styles.categoryTag}>
                    {idea.category}
                  </div>

                  <div className={styles.creatorText}>
                    PROPOSED BY {idea.creator.name.toUpperCase()} ({idea.creator.handle})
                  </div>
                </div>

                {/* SIDE COL: STATUS & LOOKING FOR */}
                <div className={styles.sideCol}>
                  <div>
                    <div className={styles.statusBadge}>
                      {idea.status}
                    </div>

                    <div className={styles.skillsSection}>
                      <div className={styles.skillsLabel}>LOOKING FOR:</div>
                      <ul className={styles.skillsList}>
                        {idea.lookingFor.map((skill, idx) => (
                          <li key={idx}>— {skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.viewBriefAction}>
                    <span>VIEW PROJECT BRIEF</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ padding: '60px 0', textAlign: 'center', borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
              <p style={{ color: '#71717a', fontSize: '15px' }}>No idea briefs found matching query.</p>
              <button 
                type="button" 
                onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
                className={styles.filterBtn}
                style={{ marginTop: '16px' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <footer style={{ borderTop: '1px solid #000000', padding: '32px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', textTransform: 'uppercase' }}>
        <div>IDEAHUB PLATFORM · EST. 2026</div>
        <div>ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
};
