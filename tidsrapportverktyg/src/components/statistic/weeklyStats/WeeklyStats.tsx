import React from 'react';
import { TimeEntry } from '@models/TimeEntry';
import { calculateDailyTimeByCategory } from '@utils/statUtils';
import { formatDuration } from '@utils/timeUtils';
import styles from './WeeklyStats.module.css';

interface WeeklyStatsProps {
  entries: TimeEntry[];
  referenceDate?: Date;
}

const WeeklyStats: React.FC<WeeklyStatsProps> = ({ entries, referenceDate = new Date() }) => {
  const dailyStats = calculateDailyTimeByCategory(entries, referenceDate);

  return (
    <div className={styles.weeklyStats}>
      <h2 className={styles.title}>Veckostatistik per dag</h2>
      <div className={styles.dayList}>
        {Object.entries(dailyStats).map(([day, categories]) => (
          <div key={day} className={styles.dayCard}>
            <h3 className={styles.dayTitle}>{day}</h3>
            <ul className={styles.categoryList}>
              {Object.entries(categories).map(([category, seconds]) => (
                <li key={category} className={styles.entry}>
                  {category}: {formatDuration(seconds)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyStats;
