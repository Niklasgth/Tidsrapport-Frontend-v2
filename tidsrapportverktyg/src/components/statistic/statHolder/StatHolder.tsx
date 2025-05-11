import React, { useState, useMemo, useCallback } from 'react';
import { startOfWeek } from 'date-fns';

// Statistikkomponenter
import StatBar      from '@components/statistic/stats/StatBar';          // Visar stapeldiagram per kategori
import WeeklyStats  from '@components/statistic/weeklyStats/WeeklyStats';// Visar summerad tid i text
import WeekHeader   from '@components/statistic/weekHeader/WeekHeader';  // Visar aktuell veckas rubrik
import styles       from './StatHolder.module.css';

// Typer & verktyg
import { TimeEntry }        from '@models/TimeEntry';      // Typ för en tidsregistrering
import { Category }         from '@models/Category';       // Typ för kategori
import { useCategories }    from '@hooks/useCategories';   // Hook som hämtar kategorilistan
import { calculateWeeklyTimeByCategory } from '@utils/statUtils'; // Funktion för att summera tid per kategori

// Props för komponenten – en lista av tidsregistreringar
interface StatHolderProps {
  timeEntries: TimeEntry[];
}

// StatHolder: innehåller all statistiklogik och renderar statistiksidan
const StatHolder: React.FC<StatHolderProps> = ({ timeEntries }) => {
  // 1: Bestäm referensvecka (måndag aktuell vecka)
  const [referenceDate, setReferenceDate] = useState<Date>(
    () => startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  // 2: Hämta kategorier för att kunna mappa id → namn
  const { categories, isLoading: catsLoading, error: catsError } = useCategories();

  // 3: Bygg upp en map där varje kategori-id kopplas till sitt namn
  const categoryMap = useMemo(() => {
    const map: { [key: string]: string } = {};
    categories.forEach((c: Category) => { map[c.id] = c.name; });
    return map;
  }, [categories]);

  // 4: Beräkna hur mycket tid som spenderats per kategori denna vecka
  const categoryTimes = useMemo(
    () => calculateWeeklyTimeByCategory(timeEntries, referenceDate),
    [timeEntries, referenceDate]
  );

  // 5: Navigering mellan veckor (7 dagar framåt/bakåt)
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

  // Inaktivera "Nästa vecka"-knapp om man redan är på innevarande vecka
  const isNextDisabled = referenceDate >= startOfWeek(new Date(), { weekStartsOn: 1 });

  // Visa laddnings- eller felmeddelande vid behov
  if (catsLoading) return <p>Laddar kategorier…</p>;
  if (catsError)   return <p>Fel vid hämtning av kategorier: {catsError.message}</p>;

  return (
    <div className={styles.statHolder}>
      <h2 className={styles.title}>Statistik</h2>

      {/* Visar aktuell veckorubrik */}
      <WeekHeader date={referenceDate} />

      {/* Veckonavigering */}
      <div className={styles.weekNav}>
        <button onClick={goToPreviousWeek}>⬅ Föregående vecka</button>
        <button onClick={goToNextWeek} disabled={isNextDisabled}>Nästa vecka ➡</button>
      </div>

      {/* Stapel med tid per kategori (graf) */}
      <StatBar
        timeEntries={timeEntries}
        categories={categoryMap}
        referenceDate={referenceDate}
      />

      {/* Textbaserad summering per dag och kategori */}
      <WeeklyStats
        entries={timeEntries}
        referenceDate={referenceDate}
      />
    </div>
  );
};

export default StatHolder;
