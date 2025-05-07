import React from 'react';
import styles from './TaskCard.module.css';
import { TimeEntry } from '@models/TimeEntry';

interface TaskCardProps {
  task: TimeEntry;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const formatDate = (input: string | Date | null) =>
    input ? new Date(input).toLocaleDateString('sv-SE') : '–';

  const formatTime = (input: string | Date | null) =>
    input
      ? new Date(input).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
      : '–';

  return (
    <div className={styles.card}>
      <h3>{task.categoryName || 'Okänd kategori'}</h3>

      <div className={styles['time-info']}>
        <p><strong>Start:</strong> {formatTime(task.startTime)}</p>
        <p><strong>Slut:</strong> {formatTime(task.endTime)}</p>
        <p><strong>Datum:</strong> {formatDate(task.startTime)}</p>
      </div>

      <p className={styles.duration}>
        <strong>Varaktighet:</strong> {Math.floor(task.duration / 60)} min {task.duration % 60} sek
      </p>
    </div>
  );
};

export default TaskCard;
