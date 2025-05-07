import React, { useState, useEffect } from 'react';
import { getTasks } from '@services/taskService'; // Funktion för att hämta alla tidsinlägg
import { getTaskCategories } from '@services/taskCategoryService'; // Funktion för att hämta alla kategorier
import StatBar from '@components/statistic/stats/StatBar'; // Komponent för att visa statistik
import { TimeEntry } from '@models/TimeEntry';

const StatHolder: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({}); // Mapping mellan kategoriId och kategoriNamn

  useEffect(() => {
    const fetchData = async () => {
      // Hämta alla tidsinlägg
      const entries = await getTasks();
      setTimeEntries(entries);

      // Hämta alla kategorier
      const taskCategories = await getTaskCategories();
      const categoryMap = taskCategories.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {} as { [key: string]: string });

      setCategories(categoryMap);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Statistik</h2>
      {/* Skicka både timeEntries och categories till StatBar */}
      <StatBar timeEntries={timeEntries} categories={categories} />
    </div>
  );
};

export default StatHolder;
