// src/components/taskList/TaskList.tsx
import React, { useState } from 'react';
import TaskCard from '@components/taskCard/taskCard/TaskCard';
import CategoryHandler from '@components/categoryHandler/CategoryHandler';
import { TimeEntry } from '@models/TimeEntry';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: TimeEntry[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // State för vald kategori att filtrera på
  const [filterCategoryId, setFilterCategoryId] = useState<string>('');

  // Filtrera listan om en kategori är vald
  const filteredTasks = filterCategoryId
    ? tasks.filter(task => task.categoryId === filterCategoryId)
    : tasks;

  return (
    <div>
      {/* Välj filtrerings-kategori */}
      <CategoryHandler
        selectedCategoryId={filterCategoryId}
        onCategorySelect={setFilterCategoryId}
      />

      <div className={styles.taskList}>
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
        {filteredTasks.length === 0 && (
          <p>Inga uppgifter för kategorin {filterCategoryId || '— alla —'}.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
