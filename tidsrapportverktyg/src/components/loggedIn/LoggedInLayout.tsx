import React from 'react';
import styles from "./LoggedInLayout.module.css";
import TimeTracker from '@components/timetracker/Timetracker';


const LoggedInLayout: React.FC = () => {
  return (
    <div className={styles.LoggedInLayout}>
      <h1>Du är inloggad!</h1>
      <TimeTracker />
    </div>
  );
};

export default LoggedInLayout;
