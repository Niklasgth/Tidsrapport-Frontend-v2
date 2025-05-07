// LoggedInLayout.tsx
import React from 'react';
import TimeTracker from '../timetracker/TimeTracker';
import TaskList from '../taskList/TaskList';
import StatBar from '../statistic/stats/StatBar';
import { useTasks } from '@hooks/useTask';
import styles from './LoggedInLayout.module.css';

const LoggedInLayout = () => {
  const { tasks, categories, createAndAddTask } = useTasks();

  // Skapa mapping av categoryId till categoryName för StatBar
  const categoryMap = categories.reduce(
    (acc, category) => ({ ...acc, [category.id]: category.name }),
    {}
  );

  return (
    <div className={styles.loggedInLayout}>
      <section className={styles.content}>
        <TimeTracker onStop={createAndAddTask} />
        <TaskList tasks={tasks} />
        <StatBar timeEntries={tasks} categories={categoryMap} />
      </section>
    </div>
  );
};

export default LoggedInLayout;
