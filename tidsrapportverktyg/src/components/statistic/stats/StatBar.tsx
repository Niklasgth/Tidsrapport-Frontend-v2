import React from 'react';

// Funktion som summerar tid per kategori för en viss vecka
import { calculateWeeklyTimeByCategory } from '@utils/statUtils';

// Typ för en tidsregistrering
import { TimeEntry } from '@models/TimeEntry';

// CSS-modul för utseendet
import styles from './StatBar.module.css';

// Hjälpfunktion för att konvertera sekunder till minuter/h:mm
import { formatDuration } from '@utils/timeUtils';

// Props till komponenten – lista av tidsregistreringar, kategorier och valbar veckoreferens
interface StatBarProps {
  timeEntries: TimeEntry[];
  categories: { [key: string]: string }; // Map: categoryId → categoryName
  referenceDate?: Date; // Valfri – default till idag
}

// Visar stapeldiagram för tidsfördelning per kategori
const StatBar: React.FC<StatBarProps> = ({
  timeEntries,
  categories,
  referenceDate = new Date(),
}) => {
  // Steg 1: Beräkna hur mycket tid som spenderats per kategori under veckan
  const categoryTimes = calculateWeeklyTimeByCategory(timeEntries, referenceDate);

  // Steg 2: Hitta största värdet för att skala staplar proportionellt
  const maxSeconds = Math.max(...Object.values(categoryTimes), 1); // undvik division med 0

  // Steg 3: Total tid för veckan i sekunder
  const totalSeconds = Object.values(categoryTimes).reduce((sum, sec) => sum + sec, 0);

  return (
    <div className={styles.statBar}>
      <h2 className={styles.title}>Veckosummering per kategori</h2>

      {/* Lista av staplar, en per kategori */}
      <div className={styles.barContainer}>
        {Object.entries(categoryTimes).map(([categoryName, seconds]) => (
          <div key={categoryName} className={styles.bar}>
            <h3 className={styles.label}>{categoryName}</h3>

            <div className={styles.progress}>
              <div
                className={styles.fill}
                style={{ width: `${(seconds / maxSeconds) * 100}%` }} // Procentbredd beroende på tid
              >
                <span className={styles.value}>
                  {formatDuration(seconds)} {/* Visa t.ex. "1h 30min" */}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Om ingen tid registrerats visas ett meddelande */}
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
