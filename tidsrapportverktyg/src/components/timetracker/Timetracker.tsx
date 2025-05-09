
import React, { useState } from 'react';
import { formatDuration } from '@utils/timeUtils';
import { useTimer } from '@hooks/useTimer';
import CategoryHandler from '@components/categoryHandler/CategoryHandler';
import styles from './TimeTracker.module.css';

interface TimeTrackerProps {
  onStop: (categoryId: string, startTime: Date, endTime: Date) => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ onStop }) => {
  const [categoryId, setCategoryId] = useState<string>('');
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { duration, reset } = useTimer(isTracking, startTime);

  const handleStart = () => {
    if (!categoryId) {
      console.warn('Försök att starta utan vald kategori');
      return;
    }
    setStartTime(new Date());
    setIsTracking(true);
  };

  const handleStop = () => {
    if (!startTime || !categoryId) return;

    const endTime = new Date();
    onStop(categoryId, startTime, endTime);
    setIsTracking(false);
    setCategoryId('');
    setStartTime(null);
    reset();
  };

  return (
    <div className="flex">
      <div className={styles.timeTrackerContainer}>
        {/* Här används CategoryHandler-komponenten för välja kategori */}
        <CategoryHandler
          selectedCategoryId={categoryId}
          onCategorySelect={setCategoryId}
        />

        <div className={styles.timer}>
          Tid: {formatDuration(duration)}
        </div>

        {!isTracking ? (
          <button
            onClick={handleStart}
            className={styles.startButton}
            disabled={!categoryId}
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
