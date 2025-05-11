import { TimeEntry } from '@models/TimeEntry';

// Base URL för backend, antingen från miljövariabel eller localhost
const API_URL   = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const TASKS_URL = `${API_URL}/api/tasks`;

// Typ för rådata från backend
interface RawTimeEntry {
  id: string;
  categoryId: string;
  categoryName: string;
  startTime: string;
  endTime: string;
  duration: number;
}

// Hjälpfunktion som hanterar svar från fetch-anrop
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text()); // Vid fel – kasta felmeddelandet
  return res.json(); // Returnera JSON-objektet som rätt typ
}

// Mapper: konverterar från raw backend-format till frontend TimeEntry
const mapToTimeEntry = (r: RawTimeEntry): TimeEntry => ({
  id: r.id,
  categoryId: r.categoryId,
  categoryName: r.categoryName,
  startTime: r.startTime,
  endTime: r.endTime,
  duration: r.duration,
});


// =============================
// === API-funktioner nedan ===
// =============================

// === GET /api/tasks ===
// Hämta alla uppgifter
export const getTasks = async (): Promise<TimeEntry[]> => {
  const raw = await fetch(TASKS_URL).then(handleResponse<RawTimeEntry[]>);
  return raw.map(mapToTimeEntry); // Konvertera varje post
};

// === POST /api/tasks ===
// Skapa ny uppgift
export const createTask = async (
  categoryId: string,
  startTime: string,
  endTime: string
): Promise<TimeEntry> => {
  const r = await fetch(TASKS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryId, startTime, endTime }),
  }).then(handleResponse<RawTimeEntry>);
  return mapToTimeEntry(r); // Konvertera resultatet
};

// === PUT /api/tasks/:id ===
// Uppdatera en uppgift (t.ex. ändra start-/stoptid eller kategori)
export const updateTask = async (
  id: string,
  updatedFields: Partial<Pick<TimeEntry, 'categoryId' | 'startTime' | 'endTime'>>
): Promise<void> => {
  await fetch(`${TASKS_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFields),
  }).then(handleResponse<void>);
};

// === DELETE /api/tasks/:id ===
// Ta bort en uppgift
export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${TASKS_URL}/${id}`, {
    method: 'DELETE',
  }).then(handleResponse<void>);
};
