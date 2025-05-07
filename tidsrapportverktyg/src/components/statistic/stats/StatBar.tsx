import React from 'react';
import { calculateTimeByCategory } from '@utils/statUtils';
import { TimeEntry } from '@models/TimeEntry';
import styles from './StatBarLayout.module.css';

interface StatBarProps {
  timeEntries: TimeEntry[];
  categories: { [key: string]: string }; // Mapping av categoryId till categoryName
}

const StatBar: React.FC<StatBarProps> = ({ timeEntries, categories }) => {
  // Beräkna tiden per kategori
  const categoryTimes = calculateTimeByCategory(timeEntries);

  return (
    <div className={styles.container}>
      {Object.keys(categoryTimes).map((categoryId) => {
        const categoryName = categories[categoryId] ?? 'Okänd kategori'; // Hämta kategori namn
        return (
          <div key={categoryId} className={styles.bar}>
            <div className={styles.label}>
              <h3>{categoryName}</h3> {/* Visa kategori namn */}
            </div>
            <div
              className={styles.progress}
              style={{ width: `${(categoryTimes[categoryId] / Math.max(...Object.values(categoryTimes))) * 100}%` }}
            >
              <span className={styles.time}>
                {categoryTimes[categoryId]} sek
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatBar;
