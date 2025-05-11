// Visar veckostatistik i textform, uppdelad per dag och kategori

import React, { useMemo } from 'react';
import { TimeEntry } from '@models/TimeEntry';                      // Typ för en uppgift/stämpling
import { calculateDailyTimeByCategory } from '@utils/statUtils';   // Funktion för summering per dag/kategori
import { format } from 'date-fns';                                 // Datumformattering
import { sv } from 'date-fns/locale';                              // Svenska datumnamn
import { formatDuration } from '@utils/timeUtils';                 // Konverterar sekunder till "1h 30m"
import styles from './WeeklyStats.module.css';                     // CSS-modul

interface WeeklyStatsProps {
  entries: TimeEntry[];
  referenceDate?: Date;
}

const WeeklyStats: React.FC<WeeklyStatsProps> = ({
  entries,
  referenceDate = new Date(),
}) => {
  // 1) Beräkna statistik per dag och kategori för veckan (memo för prestanda)
  const dailyStats = useMemo(
    () => calculateDailyTimeByCategory(entries, referenceDate),
    [entries, referenceDate]
  );

  // 2) Sortera dagarna i kronologisk ordning (ISO-strängar sorterar sig själva rätt)
  const sortedDays = useMemo(
    () => Object.keys(dailyStats).sort(),
    [dailyStats]
  );

  // 3) Om ingen dag innehåller data, visa meddelande
  if (sortedDays.length === 0) {
    return <p>Ingen registrerad tid denna vecka.</p>;
  }

  return (
    <div className={styles.weeklyStats}>
      <h2 className={styles.title}>Veckostatistik per dag</h2>

      <div className={styles.dayList}>
        {sortedDays.map((day) => {
          const categories = dailyStats[day] || {};
          let dayLabel: string;

          // 4) Försök formatera datumet (t.ex. "Måndag 6 maj"), annars visa rå datumsträng
          try {
            dayLabel = format(new Date(day), 'EEEE d MMM', { locale: sv });
          } catch {
            dayLabel = day;
          }

          return (
            <div key={day} className={styles.dayCard}>
              <h3 className={styles.dayTitle}>{dayLabel}</h3>

              {/* Lista av kategorier och summerad tid för dagen */}
              <ul className={styles.categoryList}>
                {Object.entries(categories).map(([category, seconds]) => (
                  <li key={`${day}-${category}`} className={styles.entry}>
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
