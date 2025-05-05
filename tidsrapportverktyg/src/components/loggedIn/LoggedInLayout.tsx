import React from 'react';
import styles from "./LoggedInLayout.module.css";

const LoggedInLayout: React.FC = () => {
  return (
    <div className={styles.LoggedInLayout}>
      <h1>Du är inloggad!</h1>
    </div>
  );
};

export default LoggedInLayout;
