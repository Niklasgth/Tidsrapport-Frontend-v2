import React from 'react';
import styles from "./LoggedInLayout.module.css";
import TimeTracker from '@components/timetracker/Timetracker';
import StatHolder from "@components/statistic/statHolder/StatHolder"

const LoggedInLayout: React.FC = () => {
  return (
    <div className={styles.LoggedInLayout}>
      <h1>Du är inloggad!</h1>
      <TimeTracker />
      <StatHolder />
    </div>
  );
};

export default LoggedInLayout;
