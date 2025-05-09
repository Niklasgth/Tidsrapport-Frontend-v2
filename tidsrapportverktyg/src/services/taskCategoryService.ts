import { TaskCategory as Raw } from '@models/TaskCategory';
import { Category } from '@models/Category';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const TASK_CATEGORIES_URL = `${API_URL}/api/task-categories`;

async function handleResponse(res: Response) {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const getTaskCategories = async (): Promise<Category[]> => {
  const raw = await fetch(TASK_CATEGORIES_URL)
    .then(r => r.json()) as Raw[];

  // Mappa råa till front-end-kategori
  const cats: Category[] = raw.map(c => ({
    id: c.id,     
    name: c.name,
  }));

  console.log('Mapperade kategorier:', cats);
  return cats;
};

export const createTaskCategory = async (name: string): Promise<Category> => {
  const c = await fetch(TASK_CATEGORIES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
    .then(handleResponse) as Raw;

  return {
    id: c.id,    
    name: c.name,
  };
};
