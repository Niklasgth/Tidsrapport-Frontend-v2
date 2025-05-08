import React from 'react';
import { calculateWeeklyTimeByCategory } from '@utils/statUtils';
import { TimeEntry } from '@models/TimeEntry';
import styles from './StatBar.module.css';

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
  const categoryTimes = calculateWeeklyTimeByCategory(timeEntries, referenceDate);

  const timesInMinutes = Object.entries(categoryTimes).map(
    ([category, seconds]) => [category, seconds / 60] as [string, number]
  );

  const maxMinutes = Math.max(...timesInMinutes.map(([, min]) => min), 1);

  const totalSeconds = Object.values(categoryTimes).reduce((sum, sec) => sum + sec, 0);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return (
    <div className={styles.statBar}>
      <h2 className={styles.title}>Veckosummering per kategori</h2>

      <div className={styles.barContainer}>
        {timesInMinutes.map(([categoryName, minutes]) => (
          <div key={categoryName} className={styles.bar}>
            <h3 className={styles.label}>{categoryName}</h3>
            <div className={styles.progress}>
              <div
                className={styles.fill}
                style={{ width: `${(minutes / maxMinutes) * 100}%` }}
              >
                <span className={styles.value}>
                  {Math.round(categoryTimes[categoryName])} sek
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {timesInMinutes.length === 0 ? (
        <p className={styles.empty}>Ingen registrerad tid denna vecka.</p>
      ) : (
        <p className={styles.total}>
          Totalt: {totalMinutes} min {remainingSeconds} sek
        </p>
      )}
    </div>
  );
};

export default StatBar;
