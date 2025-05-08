import React from 'react';
import { getWeekInfo } from '@utils/dateUtil';
import styles from './WeekHeader.module.css';

interface WeekHeaderProps {
  date: Date;
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ date }) => {
  return (
    <p className={styles.weekHeader}>{getWeekInfo(date)}</p>
  );
};

export default WeekHeader;
