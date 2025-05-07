import React, { useState, useEffect } from 'react';
import { createTask, getTasks } from '@services/taskService';
import { getTaskCategories } from '@services/taskCategoryService'; 
import { formatDuration } from '@utils/timeUtils';
import { useTimer } from '@hooks/useTimer';
import { TimeEntry } from '@models/TimeEntry';
import { TaskList } from '@models/TaskList';  
import styles from './TimeTracker.module.css';
import TaskCard from "@components/taskCard/TaskCard";

const TimeTracker: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>('');  
  const [categoryList, setCategoryList] = useState<{ id: string, name: string }[]>([]);  // Lägger till kategori-lista
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

  // Hämta tasks och kategorier från backend vid sidladdning
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksFromBackend = await getTasks();
        setTaskList(prevState => ({
          ...prevState,
          tasks: tasksFromBackend,
        }));

        const categories = await getTaskCategories();  // Hämta kategorier
        setCategoryList(categories);  // Sätt kategorier i state
      } catch (error) {
        console.error('Fel vid hämtning av data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStart = () => {
    setStartTime(new Date());
    setIsTracking(true);
  };

  const handleStop = async () => {
    if (!startTime || !categoryId) return;  // Kontrollera att categoryId finns

    setIsTracking(false);
    const endTime = new Date();

    const newEntry: TimeEntry = {
      id: crypto.randomUUID(),
      categoryId,  // Använd categoryId här
      startTime,
      endTime,
      duration,
    };

    taskList.addTask(newEntry);

    try {
      const savedTask = await createTask(categoryId, startTime, endTime);  // Skicka categoryId istället för description
      console.log('Task sparad:', savedTask);
    } catch (error) {
      console.error('Fel vid sparande:', error);
    }

    setCategoryId('');  // Återställ categoryId
    setStartTime(null);
    reset();
  };

  return (
    <div className="flex">
      <div className={styles.container}>
        {/* Välj kategori istället för att skriva beskrivning */}
        <select
          className={styles.input}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isTracking}
        >
          <option value="">Välj kategori</option>
          {/* Fyll på kategorier dynamiskt från backend */}
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

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
