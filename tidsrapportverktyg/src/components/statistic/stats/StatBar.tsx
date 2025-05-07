// src/components/statBar/StatBar.tsx
import React from 'react';
import { calculateTimeByCategory } from '@utils/statUtils';
import { TimeEntry } from '@models/TimeEntry';
import styles from './StatBarLayout.module.css';

interface StatBarProps {
  timeEntries: TimeEntry[];
  categories: { [key: string]: string };
}


const StatBar: React.FC<StatBarProps> = ({ timeEntries }) => {
  const categoryTimes = calculateTimeByCategory(timeEntries);

  return (
    <div className={styles.container}>
      {Object.entries(categoryTimes).map(([categoryName, totalSeconds]) => (
        <div key={categoryName} className={styles.bar}>
          <div className={styles.label}>
            <h3>{categoryName}</h3>
          </div>
          <div
            className={styles.progress}
            style={{
              width: `${(totalSeconds / Math.max(...Object.values(categoryTimes))) * 100}%`,
            }}
          >
            <span className={styles.time}>
              {totalSeconds} sek
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatBar;
