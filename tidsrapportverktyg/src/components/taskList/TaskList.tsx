// src/components/taskList/TaskList.tsx
import React from 'react';
import TaskCard from '@components/taskCard/TaskCard';
import { TimeEntry } from '@models/TimeEntry';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: TimeEntry[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (

    
    <div className={styles.taskList}>
      {tasks.map(task => (
        <TaskCard 
          key={task.id}   
          task={task} 
        />
      ))}
    </div>
  );
};

export default TaskList;
