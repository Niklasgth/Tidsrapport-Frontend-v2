// src/services/taskCategoryService.ts
import { TaskCategory } from '@models/TaskCategory';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Returnera rådata med _id och name
export const getTaskCategories = async (): Promise<{ id: string; name: string }[]> => {
  const response = await fetch(`${API_URL}/api/task-categories`);
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Misslyckades att hämta kategorier: ${err}`);
  }
  const data = await response.json();
  
  // 🛠 Mappa om _id till id
  return data.map((c: any) => ({
    id: c._id,
    name: c.name,
  }));
};
