import React, { useState, useMemo } from 'react';
import styles from './ContributionHeatmap.module.css';

export const ContributionHeatmap = () => {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate 52 weeks of deterministic contribution data
  const { weeks, totalCount, currentStreak, longestStreak } = useMemo(() => {
    const weeksArr = [];
    let total = 0;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Seeded random-like generation to produce an authentic research/dev streak pattern
    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const dayIndex = w * 7 + d;
        // Calculate an approximate date in 2026
        const dateObj = new Date(2026, 0, dayIndex + 1);
        const dateStr = dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        // Generate activity density: higher in recent weeks (w > 36), realistic gaps
        let count = 0;
        const pseudo = Math.sin(w * 13 + d * 7) * 10000;
        const rand = pseudo - Math.floor(pseudo);

        if (w > 46) {
          // Recent weeks: active streak!
          count = rand > 0.15 ? Math.floor(rand * 5) + 1 : 0;
        } else if (w > 30) {
          count = rand > 0.35 ? Math.floor(rand * 4) + 1 : 0;
        } else {
          count = rand > 0.5 ? Math.floor(rand * 3) + 1 : 0;
        }

        let level = 0;
        if (count >= 4) level = 4;
        else if (count === 3) level = 3;
        else if (count === 2) level = 2;
        else if (count === 1) level = 1;

        total += count;

        days.push({
          date: dateStr,
          count,
          level
        });
      }
      weeksArr.push(days);
    }

    return {
      weeks: weeksArr,
      totalCount: total,
      currentStreak: 19,
      longestStreak: 42
    };
  }, []);

  return (
    <section className={styles.container} aria-label="Contribution Activity">
      <div className={styles.headerRow}>
        <h2 className={styles.sectionTitle}>
          Contribution Activity / 2026 Archive
        </h2>

        <div className={styles.streakSummary}>
          <div>
            Total: <span className={styles.streakHighlight}>{totalCount} dispatches</span>
          </div>
          <div>·</div>
          <div>
            Current Streak: <span className={styles.streakHighlight}>{currentStreak} Days</span>
          </div>
          <div>·</div>
          <div>
            Longest Streak: <span className={styles.streakHighlight}>{longestStreak} Days</span>
          </div>
        </div>
      </div>

      <div className={styles.graphWrapper}>
        <div className={styles.monthsRow}>
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>

        <div className={styles.gridArea}>
          <div className={styles.daysCol}>
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          <div className={styles.weeksGrid} role="grid" aria-label="Contribution squares">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className={styles.weekCol} role="row">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    role="gridcell"
                    aria-label={`${day.count} contributions on ${day.date}`}
                    className={`${styles.cell} ${styles[`level${day.level}`]}`}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footerRow}>
        <div className={styles.tooltipInfo}>
          {hoveredDay ? (
            <span>
              {hoveredDay.count} {hoveredDay.count === 1 ? 'dispatch' : 'dispatches'} on {hoveredDay.date}
            </span>
          ) : (
            <span style={{ color: '#71717a' }}>Hover over any quadrant to inspect daily log</span>
          )}
        </div>

        <div className={styles.legend}>
          <span>Less</span>
          <div className={styles.legendCells}>
            <span className={`${styles.legendCell} ${styles.level0}`} />
            <span className={`${styles.legendCell} ${styles.level1}`} />
            <span className={`${styles.legendCell} ${styles.level2}`} />
            <span className={`${styles.legendCell} ${styles.level3}`} />
            <span className={`${styles.legendCell} ${styles.level4}`} />
          </div>
          <span>More</span>
        </div>
      </div>
    </section>
  );
};
