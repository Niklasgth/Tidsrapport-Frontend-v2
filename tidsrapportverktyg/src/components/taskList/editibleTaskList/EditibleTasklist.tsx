import React from 'react';
import EditebleTaskCard from '@components/taskCard/editebleTaskCard/EditebleTaskCard';
import { useTasks } from '@hooks/useTasks';
import { Category } from '@hooks/useCategories';
import { TimeEntry } from '@models/TimeEntry';
import styles from './EditibleTaskList.module.css';

/**
 * TimeEntry-typen som comes från service-hook:
 *
 * export type TimeEntry = {
 *   id: string;
 *   categoryId: string;
 *   categoryName?: string;  // Enriched from backend via getTasks
 *   startTime: Date | null;
 *   endTime: Date | null;
 *   duration: number;
 * };
 */
// EditibleTaskList ansvarar för att hämta och rendera en lista med redigerbara tidsuppgifter.
const EditibleTaskList: React.FC = () => {
  // useTasks hook returnerar:
  // tasks: TimeEntry[]
  // categories: Category[]
  // isLoading: boolean
  // error: Error | null
  // updateTask: (id: string, updatedFields: Partial<TimeEntry>) => Promise<void>
  const { tasks, categories, isLoading, error, updateTask } = useTasks();

  // Visa laddningsindikator medan data hämtas
  if (isLoading) return <div>Laddar uppgifter...</div>;
  // Visa felmeddelande om något gick fel
  if (error) return <div className="text-red-600">Fel: {error.message}</div>;

  // Mappa varje TimeEntry till en redigerbar kortkomponent
  return (
    <div className={styles.taskList}>
      {tasks.map((task: TimeEntry) => (
        <EditebleTaskCard
          key={task.id}               // Unik nyckel per entry
          task={task}                 // Inkoppling av hela TimeEntry-objektet
          categories={categories}     // Kategori-lista med id/name
          onSave={(id, updated) =>   // När användaren klickar Spara
            updateTask(id, updated)  // Anropa hookens updateTask för persistens
          }
        />
      ))}
    </div>
  );
};

export default EditibleTaskList;
