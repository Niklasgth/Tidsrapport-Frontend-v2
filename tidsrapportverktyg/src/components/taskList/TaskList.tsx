// src/components/taskList/TaskList.tsx
import React from 'react';
import TaskCard from '@components/taskCard/TaskCard';
import { TimeEntry } from '@models/TimeEntry';

interface TaskListProps {
  tasks: TimeEntry[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskCard 
          key={task.id}   // <-- använd id här
          task={task} 
        />
      ))}
    </div>
  );
};

export default TaskList;
