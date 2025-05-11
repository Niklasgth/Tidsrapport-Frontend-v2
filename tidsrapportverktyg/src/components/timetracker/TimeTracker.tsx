import React, { useState } from 'react';

// Hjälpfunktion för att omvandla sekunder till läsbart format, t.ex. "1h 30m"
import { formatDuration } from '@utils/timeUtils';

// Custom hook som räknar tid baserat på starttid och aktiv status
import { useTimer } from '@hooks/useTimer';

// Komponent för att välja arbetskategori
import CategoryHandler from '@components/categoryHandler/CategoryHandler';

// CSS-modul för styling
import styles from './TimeTracker.module.css';

// Props: en callback som körs när användaren stoppar tidtagningen
interface TimeTrackerProps {
  onStop: (categoryId: string, startTime: Date, endTime: Date) => void;
}

// Huvudkomponent för att starta och stoppa en arbetsuppgift
const TimeTracker: React.FC<TimeTrackerProps> = ({ onStop }) => {
  // Den valda kategorins id
  const [categoryId, setCategoryId] = useState<string>('');

  // Om en uppgift pågår just nu
  const [isTracking, setIsTracking] = useState(false);

  // När användaren tryckte på "start"
  const [startTime, setStartTime] = useState<Date | null>(null);

  // duration = antal sekunder sedan startTime om tracking är aktiv
  const { duration, reset } = useTimer(isTracking, startTime);

  // Starta tidtagning
  const handleStart = () => {
    if (!categoryId) {
      console.warn('Försök att starta utan vald kategori');
      return;
    }
    setStartTime(new Date()); // Sätt aktuell tid som start
    setIsTracking(true);      // Markera att tidtagning är igång
  };

  // Stoppa tidtagning
  const handleStop = async () => {
    if (!startTime || !categoryId) return;

    const endTime = new Date(); // Aktuell tid som stopptid

    // 1. Anropa förälderns callback för att skapa task och ladda om listan
    await onStop(categoryId, startTime, endTime);

    // 2. Återställ all intern state
    setIsTracking(false);
    setCategoryId('');
    setStartTime(null);
    reset(); // Nollställ timer
  };

  return (
    <div className="flex">
      <div className={styles.timeTrackerContainer}>
        {/* Väljer kategori */}
        <CategoryHandler
          selectedCategoryId={categoryId}
          onCategorySelect={setCategoryId}
        />

        {/* Visar pågående tid i läsbart format */}
        <div className={styles.timer}>
          Tid: {formatDuration(duration)}
        </div>

        {/* Visa "Starta" om inte aktiv, annars "Stoppa" */}
        {!isTracking ? (
          <button
            onClick={handleStart}
            className={styles.startButton}
            disabled={!categoryId} // Förhindra start utan vald kategori
          >
            Starta
          </button>
        ) : (
          <button
            onClick={handleStop}
            className={styles.stopButton}
          >
            Stoppa
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeTracker;
