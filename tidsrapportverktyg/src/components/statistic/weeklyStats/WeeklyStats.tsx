// src/components/statistic/weeklyStats/WeeklyStats.tsx
import React, { useMemo } from 'react';
import { TimeEntry } from '@models/TimeEntry';
import { calculateDailyTimeByCategory } from '@utils/statUtils';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { formatDuration } from '@utils/timeUtils';
import styles from './WeeklyStats.module.css';

interface WeeklyStatsProps {
  entries: TimeEntry[];
  referenceDate?: Date;
}

const WeeklyStats: React.FC<WeeklyStatsProps> = ({
  entries,
  referenceDate = new Date(),
}) => {
  // 1) Beräkna och memoiza dailyStats
  const dailyStats = useMemo(
    () => calculateDailyTimeByCategory(entries, referenceDate),
    [entries, referenceDate]
  );

  // 2) Sortera dagarna kronologiskt (ISO-strängar sorterar korrekt)
  const sortedDays = useMemo(
    () => Object.keys(dailyStats).sort(),
    [dailyStats]
  );

  // 3) Tidig return om ingen data
  if (sortedDays.length === 0) {
    return <p>Ingen registrerad tid denna vecka.</p>;
  }

  return (
    <div className={styles.weeklyStats}>
      <h2 className={styles.title}>Veckostatistik per dag</h2>
      <div className={styles.dayList}>
        {sortedDays.map((day) => {
          // Säkra hämtningar
          const categories = dailyStats[day] || {};
          let dayLabel: string;

          // Försök formatera ISO-datum; annars fallback till rå sträng
          try {
            dayLabel = format(new Date(day), 'EEEE d MMM', { locale: sv });
          } catch {
            dayLabel = day;
          }

          return (
            <div key={day} className={styles.dayCard}>
              <h3 className={styles.dayTitle}>{dayLabel}</h3>
              <ul className={styles.categoryList}>
                {Object.entries(categories).map(([category, seconds]) => (
                  <li
                    key={`${day}-${category}`}
                    className={styles.entry}
                  >
                    {category}: {formatDuration(seconds)}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyStats;
