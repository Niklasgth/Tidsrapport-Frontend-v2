// src/components/loggedIn/LoggedInLayout.tsx
import React from 'react';
import TimeTracker from '@components/timetracker/TimeTracker';
import EditibleTaskList from '@components/taskList/editibleTaskList/EditibleTasklist';
import { useTasks } from '@hooks/useTasks';
import { createTask as apiCreateTask } from '@services/taskService';
import StatHolder from '@components/statistic/statHolder/StatHolder';
import styles from './LoggedInLayout.module.css';

const LoggedInLayout: React.FC = () => {
  const { refresh } = useTasks();

  // Den här funktionen skickas ned till TimeTracker som onStop
  const handleCreate = async (
    categoryId: string,
    startTime: Date,
    endTime: Date
  ) => {
    try {
      // Skapa ny task mot backend med ISO-strängar
      await apiCreateTask(
        categoryId,
        startTime.toISOString(),
        endTime.toISOString()
      );
      // Ladda om listan
      await refresh();
    } catch (err) {
      console.error('Kunde inte skapa task:', err);
    }
  };

  return (
    <div>
      <section>
        <div className={styles.taskBox}>
          {/* Tidsspåraren anropar handleCreate när användaren stoppar in en uppgift */}
          <TimeTracker onStop={handleCreate} />

          {/* Task-listan fräshas upp genom useTasks */}
          <EditibleTaskList />
        </div>
      </section>

      <section>
        <div className={styles.statBox}>
          <StatHolder />
        </div>
      </section>
    </div>
  );
};

export default LoggedInLayout;
