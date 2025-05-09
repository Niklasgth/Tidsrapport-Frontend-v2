import { TimeEntry } from '@models/TimeEntry';

// Hämta bas-URL från miljövariabel
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Funktion för att skapa en ny task
 */
export const createTask = async (
  categoryId: string,
  startTime: Date,
  endTime: Date
): Promise<TimeEntry> => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Misslyckades att skapa uppgiften: ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Fel vid skapande av uppgift:', error);
    throw new Error('Fel vid skapande av uppgift: ' + error.message);
  }
};

/**
 * Funktion för att hämta alla tasks
 */
export const getTasks = async (): Promise<TimeEntry[]> => {
  try {
    const [tasksRes, catsRes] = await Promise.all([
      fetch(`${API_URL}/api/tasks`),
      fetch(`${API_URL}/api/task-categories`),
    ]);

    if (!tasksRes.ok) throw new Error('Misslyckades att hämta tasks');
    if (!catsRes.ok) throw new Error('Misslyckades att hämta kategorier');

    const [rawTasks, rawCats] = await Promise.all([
      tasksRes.json(),
      catsRes.json(),
    ]);

    const catMap: Record<string, string> = {};
    (rawCats as any[]).forEach((c) => {
      catMap[c._id] = c.name;
    });

    return (rawTasks as any[]).map((entry) => ({
      ...entry,
      categoryName: catMap[entry.categoryId],
      startTime: entry.startTime ? new Date(entry.startTime) : null,
      endTime: entry.endTime ? new Date(entry.endTime) : null,
    }));
  } catch (error: any) {
    console.error('Fel vid hämtning av tasks:', error);
    throw new Error('Fel vid hämtning av tasks: ' + error.message);
  }
};

/**
 * Uppdatera en befintlig task
 */
export const updateTask = async (
  id: string,
  updatedFields: Partial<TimeEntry>
): Promise<TimeEntry> => {
  try {
    const body: any = {};
    if (updatedFields.categoryId) body.categoryId = updatedFields.categoryId;
    if (updatedFields.startTime)
      body.startTime = (updatedFields.startTime as Date).toISOString();
    if (updatedFields.endTime)
      body.endTime = (updatedFields.endTime as Date).toISOString();

    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'PATCH', // eller 'PUT' beroende på ditt API
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Misslyckades att uppdatera uppgift: ${errText}`);
    }

    const data = await res.json();
    return {
      ...data,
      startTime: data.startTime ? new Date(data.startTime) : null,
      endTime: data.endTime ? new Date(data.endTime) : null,
    };
  } catch (err: any) {
    console.error('Fel vid updateTask:', err);
    throw err;
  }
};

/**
 * Ta bort en befintlig task
 */
export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Misslyckades att ta bort uppgift: ${errText}`);
  }
};