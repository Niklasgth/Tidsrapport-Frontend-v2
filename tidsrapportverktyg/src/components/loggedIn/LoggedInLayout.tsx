import React from 'react';
import TimeTracker from '../timetracker/TimeTracker';
// Byt ut din statiska TaskList mot den redigerbara versionen
import EditibleTaskList from '@components/taskList/editibleTaskList/EditibleTasklist';
import { useTasks } from '@hooks/useTasks';
import StatHolder from '@components/statistic/statHolder/StatHolder';
import styles from './LoggedInLayout.module.css';

const LoggedInLayout: React.FC = () => {
  // useTasks används för att skapa nya time entries via TimeTracker
  const { createAndAddTask } = useTasks();

  return (
    <div>
      <section>
        <div className={styles.taskBox}>
          <TimeTracker onStop={createAndAddTask} />
          {/* Rendera redigerbar lista direkt, EditibleTaskList kallar useTasks internt */}
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
