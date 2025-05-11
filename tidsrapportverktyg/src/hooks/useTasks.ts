import { useState, useEffect, useCallback } from 'react';

// API-funktioner för att kommunicera med backend
import {
  getTasks as fetchTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from '@services/taskService';

// Typer för uppgift och kategori
import { TimeEntry } from '@models/TimeEntry';
import { useCategories } from './useCategories';
import { Category } from '@models/Category';

// Typdefinition för vad hooken returnerar
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

// Hook som hanterar state och logik kring uppgifter och kategorier
export function useTasks(): UseTasksResult {
  // Använder useCategories för att hämta kategorier
  const {
    categories,
    isLoading: catLoading,
    error: catError,
  } = useCategories();

  // Lokal state för uppgifter, laddstatus och fel
  const [tasks, setTasks] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Funktion för att hämta uppgifter från backend och enrich:a med kategori-namn
  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Hämta uppgifter
      const fetched = await fetchTasks();

      // 2. Skapa en map mellan categoryId → categoryName för enklare lookup
      const catMap = Object.fromEntries(categories.map(c => [c.id, c.name]));

      // 3. Enrich:a varje uppgift med kategori-namn
      const enriched = fetched.map(t => ({
        ...t,
        categoryName:
          t.categoryName ??     // Använd om det redan finns
          catMap[t.categoryId] ?? // Annars slå upp i map
          'Okänd kategori',     // Fallback
      }));

      setTasks(enriched);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [categories]);

  // När kategorierna är färdighämtade – hämta även uppgifter
  useEffect(() => {
    if (!catLoading && !catError) {
      load();
    } else if (catError) {
      setError(catError);
      setIsLoading(false);
    }
  }, [catLoading, catError, load]);

  // Skapa ny uppgift och lägg till den lokalt
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
      // Lägg till direkt i state – ingen reload krävs här
      setTasks(prev => [...prev, created]);
    } catch (err: any) {
      setError(err);
    }
  };

  // Uppdatera befintlig uppgift via API och ladda om listan
  const updateTask = async (
    id: string,
    updatedFields: Partial<TimeEntry>
  ) => {
    try {
      await apiUpdateTask(id, updatedFields);
      await load(); // Säkerställ korrekt data efter uppdatering
    } catch (err: any) {
      setError(err);
    }
  };

  // Radera uppgift både från backend och lokalt state. Ej använd
  const removeTask = async (id: string) => {
    try {
      await apiDeleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err);
    }
  };

  // Returnera alla funktioner och värden som används i UI:t
  return {
    tasks,
    categories,
    isLoading,
    error,
    createAndAddTask,
    updateTask,
    removeTask,
    refresh: load, // Möjlighet att trigga omhämtning manuellt
  };
}
