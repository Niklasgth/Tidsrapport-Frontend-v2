import { TimeEntry } from '@models/TimeEntry';

// Hämta bas-URL från miljövariabel
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Funktion för att skapa en ny task
export const createTask = async (description: string, startTime: Date, endTime: Date): Promise<TimeEntry> => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Hämta detaljer om felet från API:s svar
      throw new Error(`Misslyckades att skapa uppgiften: ${errorMessage}`);
    }

    const data = await response.json();
    return data; // Returnera det skapade tasket
  } catch (error: any) {
    console.error('Fel vid skapande av uppgift:', error);
    throw new Error('Fel vid skapande av uppgift: ' + error.message);
  }
};

// Funktion för att hämta alla tasks
export const getTasks = async (): Promise<TimeEntry[]> => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`);
    if (!response.ok) {
      throw new Error('Misslyckades att hämta tasks');
    }
    const data = await response.json();
    return data; // Returnera en lista med alla tasks
  } catch (error: any) {
    console.error('Fel vid hämtning av tasks:', error);
    throw new Error('Fel vid hämtning av tasks: ' + error.message);
  }
};
