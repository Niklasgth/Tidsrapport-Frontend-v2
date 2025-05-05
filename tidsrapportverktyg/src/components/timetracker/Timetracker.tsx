import React, { useState } from 'react';
import { createTask } from '@services/taskService';
import { formatDuration } from '@utils/timeUtils';
import { useTimer } from '@hooks/useTimer';
import Button from '@components/ui/button/Button';  
import Input from '@components/ui/input/Input';    
import styles from './TimeTracker.module.css';

const TimeTracker: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const { duration, reset } = useTimer(isTracking, startTime);

  const handleStart = () => {
    setStartTime(new Date());
    setIsTracking(true);
  };

  const handleStop = async () => {
    if (!startTime) return;

    setIsTracking(false);
    const endTime = new Date();

    try {
      const savedTask = await createTask(description, startTime, endTime);
      console.log('Task sparad:', savedTask);
    } catch (error) {
      console.error('Fel vid sparande:', error);
    }

    setDescription('');
    setStartTime(null);
    reset();
  };

  return (
    <div className={styles.container}>
      {/* Använd Input-komponenten här */}
      <Input
        label="Vad jobbar du med?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Beskriv din uppgift"
        disabled={isTracking}
      />

      <div className={styles.timer}>
        Tid: {formatDuration(duration)}
      </div>

      {/* Använd Button-komponenten för Starta/Stoppa */}
      {!isTracking ? (
        <Button onClick={handleStart}>
          Starta
        </Button>
      ) : (
        <Button onClick={handleStop}>
          Stoppa
        </Button>
      )}
    </div>
  );
};

export default TimeTracker;
