// src/components/statistic/statHolder/StatHolder.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { startOfWeek } from 'date-fns';

// Komponenter
import StatBar      from '@components/statistic/stats/StatBar';
import WeeklyStats  from '@components/statistic/weeklyStats/WeeklyStats';
import WeekHeader   from '@components/statistic/weekHeader/WeekHeader';
import styles       from './StatHolder.module.css';

// Modeller & hooks & util
import { TimeEntry }             from '@models/TimeEntry';
import { useCategories }         from '@hooks/useCategories';
import { useTasks }              from '@hooks/useTasks';
import { buildCategoryMap }      from '@utils/categoryUtils';

const StatHolder: React.FC = () => {
  // 1: State
  const [referenceDate, setReferenceDate] = useState<Date>(
    () => startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  // 2: Data-hooks
  const {
    categories,
    isLoading: catsLoading,
    error:     catsError,
  } = useCategories();

  const {
    tasks,
    isLoading: tasksLoading,
    error:     tasksError,
  } = useTasks();

  // 3: Alla hooks (memo, callback) – anropas alltid oavsett loading/state
  const categoryMap = useMemo(
    () => buildCategoryMap(categories),
    [categories]
  );

  const timeEntries: TimeEntry[] = useMemo(
    () =>
      tasks.map(entry => ({
        ...entry,
        categoryName: categoryMap[entry.categoryId] ?? 'Okänd kategori',
      })),
    [tasks, categoryMap]
  );

  const goToPreviousWeek = useCallback(() => {
    setReferenceDate(d => {
      const nd = new Date(d);
      nd.setDate(nd.getDate() - 7);
      return nd;
    });
  }, []);

  const goToNextWeek = useCallback(() => {
    setReferenceDate(d => {
      const nd = new Date(d);
      nd.setDate(nd.getDate() + 7);
      return nd;
    });
  }, []);

  const isNextDisabled =
    referenceDate >= startOfWeek(new Date(), { weekStartsOn: 1 });

  // 4: Tidiga returns för loading / fel
  if (catsLoading || tasksLoading) {
    return <p>Laddar…</p>;
  }
  if (catsError) {
    return <p>Fel vid hämtning av kategorier: {catsError.message}</p>;
  }
  if (tasksError) {
    return <p>Fel vid hämtning av tidsuppgifter: {tasksError.message}</p>;
  }

  // 5: Slutlig render
  return (
    <div className={styles.statHolder}>
      <h2 className={styles.title}>Statistik</h2>

      <WeekHeader date={referenceDate} />

      <div className={styles.weekNav}>
        <button onClick={goToPreviousWeek}>⬅ Föregående vecka</button>
        <button onClick={goToNextWeek} disabled={isNextDisabled}>
          Nästa vecka ➡
        </button>
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
