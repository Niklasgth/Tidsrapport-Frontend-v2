
import React from 'react';
import TaskCard from "@components/taskCard/TaskCard"
import { TimeEntry } from '@models/TimeEntry';

const TaskList = ({ tasks }: { tasks: TimeEntry[] }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
