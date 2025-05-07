import React from 'react';
import styles from './TaskCard.module.css';
import { TimeEntry } from '@models/TimeEntry';
import { formatDuration } from '@utils/timeUtils'; 

interface TaskCardProps {
  task: TimeEntry;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const formatDate = (date: Date | null) =>
    date ? new Date(date).toLocaleDateString() : '–';

  const formatTime = (date: Date | null) =>
    date ? new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '–';

  return (
    <div className={styles.card}>
      <h3>{task.categoryName ?? 'Okänd kategori'}</h3>



      {/* Flexbox wrapper för starttid, sluttid och datum */}
      <div className={styles['time-info']}>
        <p><strong>Start:</strong> {formatTime(task.startTime)}</p>
        <p><strong>Slut:</strong> {formatTime(task.endTime)}</p>
        <p><strong>Datum:</strong> {formatDate(task.startTime)}</p>
      </div>

      <p className={styles.duration}><strong>Varaktighet:</strong> {formatDuration(task.duration)}</p>
    </div>
  );
};

export default TaskCard;
