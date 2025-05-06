import React, { useState, useEffect } from 'react';
import { createTask, getTasks } from '@services/taskService';
import { formatDuration } from '@utils/timeUtils';
import { useTimer } from '@hooks/useTimer';
import { TimeEntry } from '@models/TimeEntry';
import { TaskList } from '@models/TaskList';  
import styles from './TimeTracker.module.css';
import TaskCard from "@components/taskCard/TaskCard";

const TimeTracker: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [taskList, setTaskList] = useState<TaskList>({  
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

  // 🆕 Hämta tasks från backend vid sidladdning
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksFromBackend = await getTasks();
        setTaskList(prevState => ({
          ...prevState,
          tasks: tasksFromBackend,
        }));
      } catch (error) {
        console.error('Fel vid hämtning av tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleStart = () => {
    setStartTime(new Date());
    setIsTracking(true);
  };

  const handleStop = async () => {
    if (!startTime) return;

    setIsTracking(false);
    const endTime = new Date();

    const newEntry: TimeEntry = {
      id: crypto.randomUUID(),
      description,
      startTime,
      endTime,
      duration,
    };

    taskList.addTask(newEntry);

    try {
      const savedTask = await createTask(description, startTime, endTime);
      console.log('Task sparad:', savedTask);
    } catch (error) {
      console.error('Fel vid sparande:', error);
    }

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

      <div className={styles.savedTasks}>
        <h3>Tidrapporterade Uppgifter</h3>
        <div className={styles.taskCards}>
          {taskList.tasks.map((entry) => (
            <TaskCard key={entry.id} task={entry} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;
