// services/taskCategoryService.ts
import { TaskCategory } from '@models/TaskCategory';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Funktion för att hämta alla kategorier
export const getTaskCategories = async (): Promise<TaskCategory[]> => {
  try {
    const response = await fetch(`${API_URL}/api/task-categories`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Misslyckades att hämta kategorier: ${errorMessage}`);
    }
    
    const data = await response.json();
    if (Array.isArray(data)) {
      return data as TaskCategory[]; // Säkra typningen här
    } else {
      throw new Error('Det mottagna svaret är inte en lista av task categories');
    }
    
  } catch (error) {
    console.error('Fel vid hämtning av kategorier:', error);
    throw new Error('Fel vid hämtning av kategorier: ' + (error instanceof Error ? error.message : 'Okänt fel'));
  }
};
