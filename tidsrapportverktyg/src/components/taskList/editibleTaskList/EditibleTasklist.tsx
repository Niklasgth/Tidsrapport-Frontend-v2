import React from 'react';

// Komponent som visar en uppgift i redigerbart kortformat
import EditebleTaskCard from '@components/taskCard/editebleTaskCard/EditebleTaskCard';

// Typer
import { TimeEntry } from '@models/TimeEntry';       // En uppgift (stämpling)
import { Category } from '@models/Category';         // En kategori

// CSS-modul för stil
import styles from './EditibleTaskList.module.css';

// Props som komponenten tar emot
interface EditibleTaskListProps {
  tasks: TimeEntry[]; // Lista med alla sparade uppgifter
  categories: Category[]; // Tillgängliga kategorier
  isLoading: boolean; // Visar om data håller på att laddas
  error: Error | null; // Eventuellt fel vid hämtning
  updateTask: (id: string, updatedFields: Partial<TimeEntry>) => Promise<void>; // Funktion för att spara ändringar
}

/**
 * Komponent som listar alla uppgifter som redigerbara kort.
 */
const EditibleTaskList: React.FC<EditibleTaskListProps> = ({
  tasks,
  categories,
  isLoading,
  error,
  updateTask,
}) => {
  // Visa laddningsmeddelande om data hämtas
  if (isLoading) {
    return <div>Laddar uppgifter...</div>;
  }

  // Visa felmeddelande om något gick fel
  if (error) {
    return <div className="text-red-600">Fel: {error.message}</div>;
  }

  // Visa information om inga uppgifter finns ännu
  if (tasks.length === 0) {
    return <p>Inga uppgifter än.</p>;
  }

  // Lista ut alla uppgifter i form av redigerbara kort
  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <EditebleTaskCard
          key={task.id}
          task={task}
          categories={categories}
          onSave={(id, updated) => updateTask(id, updated)} // Skickar uppdatering till parent-komponent
        />
      ))}
    </div>
  );
};

export default EditibleTaskList;
