import React from 'react';
import { calculateWeeklyTimeByCategory } from '@utils/statUtils';
import { TimeEntry } from '@models/TimeEntry';
import styles from './StatBar.module.css';
import { formatDuration } from '@utils/timeUtils';

interface StatBarProps {
  timeEntries: TimeEntry[];
  categories: { [key: string]: string };
  referenceDate?: Date;
}

const StatBar: React.FC<StatBarProps> = ({
  timeEntries,
  categories,
  referenceDate = new Date(),
}) => {
  // categoryTimes: { [categoryName]: seconds }
  const categoryTimes = calculateWeeklyTimeByCategory(timeEntries, referenceDate);

  // Hitta högsta värde i sekunder för att skala staplarna
  const maxSeconds = Math.max(...Object.values(categoryTimes), 1);

  // Totalt för veckan i sekunder
  const totalSeconds = Object.values(categoryTimes).reduce((sum, sec) => sum + sec, 0);

  return (
    <div className={styles.statBar}>
      <h2 className={styles.title}>Veckosummering per kategori</h2>

      <div className={styles.barContainer}>
        {Object.entries(categoryTimes).map(([categoryName, seconds]) => (
          <div key={categoryName} className={styles.bar}>
            <h3 className={styles.label}>{categoryName}</h3>
            <div className={styles.progress}>
              <div
                className={styles.fill}
                style={{ width: `${(seconds / maxSeconds) * 100}%` }}
              >
                <span className={styles.value}>
                  {formatDuration(seconds)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {Object.keys(categoryTimes).length === 0 ? (
        <p className={styles.empty}>Ingen registrerad tid denna vecka.</p>
      ) : (
        <p className={styles.total}>
          Totalt: {formatDuration(totalSeconds)}
        </p>
      )}
    </div>
  );
};

export default StatBar;
