import React, { useState } from 'react';
import { formatDuration } from '@utils/timeUtils';
import { useTimer } from '@hooks/useTimer';
import { useCategories } from '@hooks/useCategories'; // 👈 inte useTasks längre!
import styles from './TimeTracker.module.css';

interface TimeTrackerProps {
  onStop: (categoryId: string, startTime: Date, endTime: Date) => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ onStop }) => {
  const { categories } = useCategories(); // 👈 bara hämta kategorier

  const [categoryId, setCategoryId] = useState<string>('');
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { duration, reset } = useTimer(isTracking, startTime);

  const handleStart = () => {
    if (!categoryId) {
      console.warn('Försök att starta utan vald kategori');
      return;
    }

    console.log('Startar spårning för kategori:', categoryId);
    setStartTime(new Date());
    setIsTracking(true);
  };

  const handleStop = () => {
    console.log('Försöker stoppa:', { categoryId, startTime });

    if (!startTime || !categoryId) return;

    const endTime = new Date();

    console.log('Skickar task:', {
      categoryId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });

    setIsTracking(false);
    onStop(categoryId, startTime, endTime); // 👈 här använder vi onStop från props
    setCategoryId('');
    setStartTime(null);
    reset();
  };

  return (
    <div className="flex">
      <div className={styles.timeTrackerContainer}>
        <select
          className={styles.input}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isTracking}
        >
          <option value="">Välj kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className={styles.timer}>Tid: {formatDuration(duration)}</div>

        {!isTracking ? (
          <button
            onClick={handleStart}
            className={styles.startButton}
            disabled={!categoryId}
          >
            Starta
          </button>
        ) : (
          <button onClick={handleStop} className={styles.stopButton}>
            Stoppa
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeTracker;
