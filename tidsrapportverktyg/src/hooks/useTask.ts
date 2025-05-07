
import { useState, useEffect } from 'react';
import { getTasks as fetchTasks, createTask as apiCreateTask } from '@services/taskService';
import { TimeEntry } from '@models/TimeEntry';
import { useCategories, Category } from './useCategories';

export interface UseTasksResult {
  tasks: TimeEntry[];
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  createAndAddTask: (categoryId: string, startTime: Date, endTime: Date) => Promise<void>;
  removeTask: (id: string) => void;
}

export function useTasks(): UseTasksResult {
  const { categories, isLoading: catLoading, error: catError } = useCategories();
  const [tasks, setTasks] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (catLoading) {
      setIsLoading(true);
      return;
    }
    if (catError) {
      setError(catError);
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const fetchedTasks = await fetchTasks();

        // 🔧 Enricha med categoryName
        const catMap: Record<string, string> = {};
        categories.forEach(c => { catMap[c.id] = c.name; });

        const enrichedTasks = fetchedTasks.map(t => ({
          ...t,
          categoryName: catMap[t.categoryId] ?? 'Okänd kategori',
        }));

        setTasks(enrichedTasks);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [categories, catLoading, catError]);

  const createAndAddTask = async (categoryId: string, startTime: Date, endTime: Date) => {
    try {
      const createdTask = await apiCreateTask(categoryId, startTime, endTime);
  
      const categoryName = categories.find(c => c.id === categoryId)?.name ?? 'Okänd kategori';
  
      const enrichedTask: TimeEntry = {
        ...createdTask,
        categoryName, // 💡 enrich direkt innan vi sätter
      };
  
      setTasks(prev => [...prev, enrichedTask]); // ➕ uppdaterar listan direkt
    } catch (err: any) {
      setError(err);
      console.error("Fel vid skapande av uppgift:", err);
    }
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    // ev. även: await deleteTask(id);
  };

  return { tasks, categories, isLoading, error, createAndAddTask, removeTask };
}
