import React, { useState, useMemo, useCallback } from 'react';
import { startOfWeek } from 'date-fns';

// Components
import StatBar      from '@components/statistic/stats/StatBar';
import WeeklyStats  from '@components/statistic/weeklyStats/WeeklyStats';
import WeekHeader   from '@components/statistic/weekHeader/WeekHeader';
import styles       from './StatHolder.module.css';

// Models & hooks & utils
import { TimeEntry }        from '@models/TimeEntry';
import { Category }         from '@models/Category';
import { useCategories }    from '@hooks/useCategories';
import { calculateWeeklyTimeByCategory } from '@utils/statUtils';

interface StatHolderProps {
  timeEntries: TimeEntry[];
}

const StatHolder: React.FC<StatHolderProps> = ({ timeEntries }) => {
  // 1: Reference week
  const [referenceDate, setReferenceDate] = useState<Date>(
    () => startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  // 2: Fetch categories for mapping names
  const { categories, isLoading: catsLoading, error: catsError } = useCategories();

  // 3: Build id→name map
  const categoryMap = useMemo(() => {
    const map: { [key: string]: string } = {};
    categories.forEach((c: Category) => { map[c.id] = c.name; });
    return map;
  }, [categories]);

  // 4: Calculate times per category
  const categoryTimes = useMemo(
    () => calculateWeeklyTimeByCategory(timeEntries, referenceDate),
    [timeEntries, referenceDate]
  );

  // 5: Week navigation callbacks
  const goToPreviousWeek = useCallback(() => {
    setReferenceDate(d => { const nd = new Date(d); nd.setDate(nd.getDate() - 7); return nd; });
  }, []);
  const goToNextWeek = useCallback(() => {
    setReferenceDate(d => { const nd = new Date(d); nd.setDate(nd.getDate() + 7); return nd; });
  }, []);
  const isNextDisabled = referenceDate >= startOfWeek(new Date(), { weekStartsOn: 1 });

  // Loading & error
  if (catsLoading) return <p>Laddar kategorier…</p>;
  if (catsError)   return <p>Fel vid hämtning av kategorier: {catsError.message}</p>;

  return (
    <div className={styles.statHolder}>
      <h2 className={styles.title}>Statistik</h2>

      <WeekHeader date={referenceDate} />
      <div className={styles.weekNav}>
        <button onClick={goToPreviousWeek}>⬅ Föregående vecka</button>
        <button onClick={goToNextWeek} disabled={isNextDisabled}>Nästa vecka ➡</button>
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
