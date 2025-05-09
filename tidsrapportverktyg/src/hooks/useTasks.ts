import { useState, useEffect } from 'react';
import { getTasks as fetchTasks, createTask as apiCreateTask, updateTask as apiUpdateTask } from '@services/taskService';
import { TimeEntry } from '@models/TimeEntry';
import { useCategories, Category } from './useCategories';

export interface UseTasksResult {
  tasks: TimeEntry[];
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  createAndAddTask: (categoryId: string, startTime: Date, endTime: Date) => Promise<void>;
  updateTask: (id: string, updatedFields: Partial<TimeEntry>) => Promise<void>;
  removeTask: (id: string) => void;
}

export function useTasks(): UseTasksResult {
  const { categories, isLoading: catLoading, error: catError } = useCategories();
  const [tasks, setTasks] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Hämta initialt
  useEffect(() => {
    if (catLoading) return;
    if (catError) {
      setError(catError);
      setIsLoading(false);
      return;
    }
    (async () => {
      try {
        const fetchedTasks = await fetchTasks();
        const catMap = Object.fromEntries(categories.map(c => [c.id, c.name]));
        const enriched = fetchedTasks.map(t => ({
          ...t,
          categoryName: catMap[t.categoryId] ?? 'Okänd kategori',
        }));
        setTasks(enriched);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [categories, catLoading, catError]);

  // Skapa
  const createAndAddTask = async (categoryId: string, startTime: Date, endTime: Date) => {
    try {
      const created = await apiCreateTask(categoryId, startTime, endTime);
      const categoryName = categories.find(c => c.id === categoryId)?.name ?? 'Okänd';
      setTasks(prev => [...prev, { ...created, categoryName }]);
    } catch (err: any) {
      setError(err);
    }
  };

  // Uppdatera
  const updateTask = async (id: string, updatedFields: Partial<TimeEntry>) => {
    try {
      const updated = await apiUpdateTask(id, updatedFields);
      const catName = categories.find(c => c.id === updated.categoryId)?.name ?? 'Okänd';
      setTasks(prev =>
        prev.map(t =>
          t.id === id ? { ...updated, categoryName: catName } : t
        )
      );
    } catch (err: any) {
      setError(err);
      console.error('Fel vid uppdatering:', err);
    }
  };

  // Ta bort
  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    // ev. kalla deleteService om du har en sådan
  };

  return {
    tasks,
    categories,
    isLoading,
    error,
    createAndAddTask,
    updateTask,
    removeTask,
  };
}
