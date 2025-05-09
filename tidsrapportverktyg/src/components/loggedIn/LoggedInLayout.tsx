import React from 'react';
import TimeTracker from '@components/timetracker/TimeTracker';
import EditibleTaskList from '@components/taskList/editibleTaskList/EditibleTasklist';
import { useTasks } from '@hooks/useTasks';
import { createTask as apiCreateTask } from '@services/taskService';
import StatHolder from '@components/statistic/statHolder/StatHolder';
import styles from './LoggedInLayout.module.css';

const LoggedInLayout: React.FC = () => {
  // Hämta all nödvändig state och metoder från hooken
  const {
    tasks,
    categories,
    isLoading,
    error,
    refresh,
    updateTask,
  } = useTasks();

  // Callback som skickas ner till TimeTracker
  const handleCreate = async (
    categoryId: string,
    startTime: Date,
    endTime: Date
  ) => {
    try {
      await apiCreateTask(
        categoryId,
        startTime.toISOString(),
        endTime.toISOString()
      );
      await refresh();
    } catch (err) {
      console.error('Kunde inte skapa task:', err);
    }
  };

  return (
    <div>
      <section>
        <div className={styles.taskBox}>
          <TimeTracker onStop={handleCreate} />
          <EditibleTaskList
            tasks={tasks}
            categories={categories}
            isLoading={isLoading}
            error={error}
            updateTask={updateTask}
          />
        </div>
      </section>

      <section>
        <div className={styles.statBox}>
          <StatHolder timeEntries={tasks} />
        </div>
      </section>
    </div>
  );
};

export default LoggedInLayout;