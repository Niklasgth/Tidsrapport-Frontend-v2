import React, { useState } from 'react';
import { createTask } from '@services/taskService';
import { formatDuration } from '@utils/timeUtils';
import { useTimer } from '@hooks/useTimer';
import { TimeEntry } from '@models/TimeEntry';
import { TaskList } from '@models/TaskList';  
import styles from './TimeTracker.module.css';

const TimeTracker: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [taskList, setTaskList] = useState<TaskList>({  // Nu använder vi TaskList här
    tasks: [],
    addTask: (task: TimeEntry) => {
      setTaskList((prevState) => ({ 
        tasks: [...prevState.tasks, task], 
        addTask: prevState.addTask, 
        removeTask: prevState.removeTask,
        reset: prevState.reset
      }));
    },
    removeTask: (id: string) => {
      setTaskList((prevState) => ({
        tasks: prevState.tasks.filter(task => task.id !== id),
        addTask: prevState.addTask,
        removeTask: prevState.removeTask,
        reset: prevState.reset
      }));
    },
    reset: () => {
      setTaskList({ tasks: [], addTask: () => {}, removeTask: () => {}, reset: () => {} });
    },
  });

  const { duration, reset } = useTimer(isTracking, startTime);

  const handleStart = () => {
    setStartTime(new Date());
    setIsTracking(true);
  };

  const handleStop = async () => {
    if (!startTime) return;

    setIsTracking(false);
    const endTime = new Date();

    // Skapa en ny uppgift
    const newEntry: TimeEntry = {
      id: crypto.randomUUID(),
      description,
      startTime,
      endTime,
      duration,
    };

    // Lägg till den nya uppgiften i vår TaskList
    taskList.addTask(newEntry);

    try {
      // Anropa backend för att spara uppgiften
      const savedTask = await createTask(description, startTime, endTime);
      console.log('Task sparad:', savedTask);
    } catch (error) {
      console.error('Fel vid sparande:', error);
    }

    // Reset
    setDescription('');
    setStartTime(null);
    reset();
  };

  return (
    <div className="flex">
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          placeholder="Vad jobbar du med?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isTracking}
        />

        <div className={styles.timer}>
          Tid: {formatDuration(duration)}
        </div>

        {!isTracking ? (
          <button onClick={handleStart} className={styles.startButton}>
            Starta
          </button>
        ) : (
          <button onClick={handleStop} className={styles.stopButton}>
            Stoppa
          </button>
        )}
      </div>

      {/* Visa sparade uppgifter här */}
      <div className={styles.savedTasks}>
        <h3>Tidrapporterade Uppgifter</h3>
        <ul>
          {taskList.tasks.map((entry) => (  // Nu använder vi taskList för att rendera uppgifterna
            <li key={entry.id}>
              <strong>{entry.description}</strong> <br />
              Tid: {formatDuration(entry.duration)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeTracker;
