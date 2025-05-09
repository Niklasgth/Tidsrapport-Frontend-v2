import { TaskCategory } from '@models/TaskCategory';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getTaskCategories = async (): Promise<{ id: string; name: string }[]> => {
  const res = await fetch(`${API_URL}/api/task-categories`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Misslyckades att hämta kategorier: ${text}`);
  }
  const data = await res.json();
  return data.map((c: any) => ({ id: c._id, name: c.name }));
};

// Skapa en ny kategori
export const createTaskCategory = async (name: string): Promise<{ id: string; name: string }> => {
  const res = await fetch(`${API_URL}/api/task-categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Misslyckades att skapa kategori: ${text}`);
  }
  const c = await res.json();
  return { id: c._id, name: c.name };
};
