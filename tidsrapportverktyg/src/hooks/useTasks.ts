// src/hooks/useTasks.ts
import { useState, useEffect, useCallback } from 'react';
import {
  getTasks as fetchTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from '@services/taskService';
import { TimeEntry } from '@models/TimeEntry';
import { useCategories } from './useCategories';
import { Category } from '@models/Category';

export interface UseTasksResult {
  tasks: TimeEntry[];
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
  createAndAddTask: (
    categoryId: string,
    startTime: Date,
    endTime: Date
  ) => Promise<void>;
  updateTask: (id: string, updatedFields: Partial<TimeEntry>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useTasks(): UseTasksResult {
  const {
    categories,
    isLoading: catLoading,
    error: catError,
  } = useCategories();
  const [tasks, setTasks] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Helper för att läsa in + enrich:a med categoryName
  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetched = await fetchTasks(); // varje t kan redan ha t.categoryName
      const catMap = Object.fromEntries(categories.map(c => [c.id, c.name]));
      const enriched = fetched.map(t => ({
        ...t,
        // 1) använd backendens categoryName om det finns
        // 2) annars slå upp i catMap
        // 3) som sista fallback, "Okänd kategori"
        categoryName:
          t.categoryName ??
          catMap[t.categoryId] ??
          'Okänd kategori',
      }));
      setTasks(enriched);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [categories]);

  // Kör load när kategorierna är inlästa
  useEffect(() => {
    if (!catLoading && !catError) {
      load();
    } else if (catError) {
      setError(catError);
      setIsLoading(false);
    }
  }, [catLoading, catError, load]);

  // Skapa + patcha state
  const createAndAddTask = async (
    categoryId: string,
    startTime: Date,
    endTime: Date
  ) => {
    try {
      const created = await apiCreateTask(
        categoryId,
        startTime.toISOString(),
        endTime.toISOString()
      );
      // created har redan categoryName från service
      setTasks(prev => [...prev, created]);
    } catch (err: any) {
      setError(err);
    }
  };

  // Uppdatera + patcha state
  const updateTask = async (
    id: string,
    updatedFields: Partial<TimeEntry>
  ) => {
    try {
      await apiUpdateTask(id, updatedFields);
      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, ...updatedFields } : t))
      );
    } catch (err: any) {
      setError(err);
    }
  };

  // Ta bort både backend + state
  const removeTask = async (id: string) => {
    try {
      await apiDeleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err);
    }
  };

  return {
    tasks,
    categories,
    isLoading,
    error,
    createAndAddTask,
    updateTask,
    removeTask,
    refresh: load,
  };
}
