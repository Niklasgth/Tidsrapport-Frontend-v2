import React from 'react';
import EditebleTaskCard from '@components/taskCard/editebleTaskCard/EditebleTaskCard';
import { TimeEntry } from '@models/TimeEntry';
import { Category } from '@models/Category';
import styles from './EditibleTaskList.module.css';

// Props för att ta emot data och metoder från parent-komponent
interface EditibleTaskListProps {
  tasks: TimeEntry[];
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  updateTask: (id: string, updatedFields: Partial<TimeEntry>) => Promise<void>;
}

/**
 * Listar ut redigerbara TaskCards utifrån prop-data.
 */
const EditibleTaskList: React.FC<EditibleTaskListProps> = ({
  tasks,
  categories,
  isLoading,
  error,
  updateTask,
}) => {
  if (isLoading) {
    return <div>Laddar uppgifter...</div>;
  }
  if (error) {
    return <div className="text-red-600">Fel: {error.message}</div>;
  }

  if (tasks.length === 0) {
    return <p>Inga uppgifter än.</p>;
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <EditebleTaskCard
          key={task.id}
          task={task}
          categories={categories}
          onSave={(id, updated) => updateTask(id, updated)}
        />
      ))}
    </div>
  );
};

export default EditibleTaskList;