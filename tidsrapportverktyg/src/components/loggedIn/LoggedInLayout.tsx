import React from 'react';
import TimeTracker from '../timetracker/TimeTracker';
import TaskList from '../taskList/TaskList';
import { useTasks } from '@hooks/useTask';
import StatHolder from '@components/statistic/statHolder/StatHolder';
import styles from './LoggedInLayout.module.css';

const LoggedInLayout = () => {
  const { tasks, createAndAddTask } = useTasks();

  return (
    <div>
     <section>
    <div className={styles.taskBox}>
    <TimeTracker onStop={createAndAddTask} />
    <TaskList tasks={tasks} />
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
