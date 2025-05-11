import React from 'react';

// Komponent för att starta/stoppa tidtagning
import TimeTracker from '@components/timetracker/TimeTracker';

// Lista med uppgifter som kan redigeras (t.ex. ändra kategori)
import EditibleTaskList from '@components/taskList/editibleTaskList/EditibleTasklist';

// Custom hook för att hämta och hantera uppgiftsdata
import { useTasks } from '@hooks/useTasks';

// API-funktion som skapar ny uppgift i backend
import { createTask as apiCreateTask } from '@services/taskService';

// Komponent som visar statistik per kategori/dag/vecka
import StatHolder from '@components/statistic/statHolder/StatHolder';

// CSS-modul för layout och styling
import styles from './LoggedInLayout.module.css';

// Layout för den inloggade användaren – innehåller hela arbetsytan
const LoggedInLayout: React.FC = () => {
  
  // Hämta uppgifter, kategorier, laddstatus och logik från hook
  const {
    tasks,         // Alla registrerade uppgifter
    categories,    // Tillgängliga arbetskategorier
    isLoading,     // Laddstatus
    error,         // Felmeddelanden
    refresh,       // Funktion för att ladda om uppgifter
    updateTask,    // Funktion för att uppdatera en uppgift
  } = useTasks();

  // Callback som skickas till TimeTracker – körs när användaren "checkar ut"
  const handleCreate = async (
    categoryId: string,
    startTime: Date,
    endTime: Date
  ) => {
    try {
      // Skapa uppgift i backend (via API-funktion)
      await apiCreateTask(
        categoryId,
        startTime.toISOString(),
        endTime.toISOString()
      );

      // Ladda om uppgiftslistan efter ny uppgift har lagts till
      await refresh();
    } catch (err) {
      console.error('Kunde inte skapa task:', err);
    }
  };

  // Returnerar gränssnittet för den inloggade vyn
  return (
    <div>
      {/* Sektion för tidtagning och uppgiftslista */}
      <section>
        <div className={styles.taskBox}>
          {/* Tidtagare med callback till create-logik */}
          <TimeTracker onStop={handleCreate} />

          {/* Redigerbar lista med uppgifter */}
          <EditibleTaskList
            tasks={tasks}
            categories={categories}
            isLoading={isLoading}
            error={error}
            updateTask={updateTask}
          />
        </div>
      </section>

      {/* Sektion för statistikvisualisering */}
      <section>
        <div className={styles.statBox}>
          <StatHolder timeEntries={tasks} />
        </div>
      </section>
    </div>
  );
};

export default LoggedInLayout;
