// Importerar typdefinitionen för Category (både rå backend-version och frontend-version)
import { Category as Raw } from '@models/Category';
import { Category } from '@models/Category';

// Bas-URL till backend-API, beroende på miljövariabel
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Fullständig endpoint för kategorihantering
const TASK_CATEGORIES_URL = `${API_URL}/api/task-categories`;

// Gemensam hjälpfunktion för att hantera svar från fetch-anrop
async function handleResponse(res: Response) {
  if (!res.ok) throw new Error(await res.text()); // Om fel: kasta feltexten
  return res.json(); // Annars: returnera JSON
}

// === GET: Hämta alla kategorier från backend ===
export const getTaskCategories = async (): Promise<Category[]> => {
  const raw = await fetch(TASK_CATEGORIES_URL)
    .then(r => r.json()) as Raw[]; // Rådata från backend

  // Mappa backend-struktur till frontend-modell
  const cats: Category[] = raw.map(c => ({
    id: c.id,     // Backend-id → frontend-id
    name: c.name, // Namnet på kategorin
  }));

  return cats;
};

// === POST: Skapa ny kategori i backend ===
export const createCategory = async (name: string): Promise<Category> => {
  const c = await fetch(TASK_CATEGORIES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }), // Skicka endast namn i request-body
  })
    .then(handleResponse) as Raw;

  // Returnera ommappad frontend-version
  return {
    id: c.id,
    name: c.name,
  };
};
