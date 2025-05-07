import { TimeEntry } from '@models/TimeEntry';

// Hämta bas-URL från miljövariabel
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Funktion för att skapa en ny task
export const createTask = async (categoryId: string, startTime: Date, endTime: Date): Promise<TimeEntry> => {
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
      const errorMessage = await response.text(); // Hämta detaljer om felet från API:s svar
      throw new Error(`Misslyckades att skapa uppgiften: ${errorMessage}`);
    }

    const data = await response.json();
    return data; // Returnera mitt skapade task
  } catch (error: any) {
    console.error('Fel vid skapande av uppgift:', error);
    throw new Error('Fel vid skapande av uppgift: ' + error.message);
  }
};

// Funktion för att hämta alla tasks
export const getTasks = async (): Promise<TimeEntry[]> => {
  try {
    // Hämta både tasks och kategorier parallellt
    const [tasksRes, catsRes] = await Promise.all([
      fetch(`${API_URL}/api/tasks`),
      fetch(`${API_URL}/api/task-categories`)
    ]);

    if (!tasksRes.ok) throw new Error('Misslyckades att hämta tasks');
    if (!catsRes.ok)  throw new Error('Misslyckades att hämta kategorier');

    const [rawTasks, rawCats] = await Promise.all([
      tasksRes.json(),
      catsRes.json()
    ]);

    // Bygg en lookup-tabell för kategorinamn
    const catMap: Record<string,string> = {};
    (rawCats as any[]).forEach(c => { catMap[c._id] = c.name; });

    // Enricha varje task med categoryName och formatera tider
    return (rawTasks as any[]).map(entry => ({
      ...entry,
      categoryName: catMap[entry.categoryId],
      startTime: entry.startTime ? new Date(entry.startTime) : null,
      endTime:   entry.endTime   ? new Date(entry.endTime)   : null,
    }));
  } catch (error: any) {
    console.error('Fel vid hämtning av tasks:', error);
    throw new Error('Fel vid hämtning av tasks: ' + error.message);
  }
};
