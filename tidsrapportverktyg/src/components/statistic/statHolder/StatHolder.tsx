import React, { useState } from 'react';

// Komponenter
import StatBar from '@components/statistic/stats/StatBar';
import WeeklyStats from '@components/statistic/weeklyStats/WeeklyStats';
import WeekHeader from '@components/statistic/weekHeader/WeekHeader';
import styles from './StatHolder.module.css';

// Modeller
import { TimeEntry } from '@models/TimeEntry';

// Data-hooks & util
import { useCategories } from '@hooks/useCategories';
import { useTasks } from '@hooks/useTask';
import { buildCategoryMap } from '@utils/categoryUtils';

const StatHolder: React.FC = () => {
  const [referenceDate, setReferenceDate] = useState<Date>(new Date());

  const { categories } = useCategories();
  const { tasks } = useTasks();

  const categoryMap = buildCategoryMap(categories);

  const timeEntries: TimeEntry[] = tasks.map(entry => ({
    ...entry,
    categoryName: categoryMap[entry.categoryId] ?? 'Okänd kategori',
  }));

  const goToPreviousWeek = () => {
    const newDate = new Date(referenceDate);
    newDate.setDate(newDate.getDate() - 7);
    setReferenceDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(referenceDate);
    newDate.setDate(newDate.getDate() + 7);
    setReferenceDate(newDate);
  };

  return (
    <div className={styles.statHolder}>
      <h2 className={styles.title}>Statistik</h2>

      <WeekHeader date={referenceDate} />

      <div className={styles.weekNav}>
        <button onClick={goToPreviousWeek}>⬅ Föregående vecka</button>
        <button onClick={goToNextWeek}>Nästa vecka ➡</button>
      </div>

      <StatBar
        timeEntries={timeEntries}
        categories={categoryMap}
        referenceDate={referenceDate}
      />

      <WeeklyStats
        entries={timeEntries}
        referenceDate={referenceDate}
      />
    </div>
  );
};

export default StatHolder;
