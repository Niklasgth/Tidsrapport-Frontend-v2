// src/services/taskService.ts
import { TimeEntry } from '@models/TimeEntry';

const API_URL       = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const TASKS_URL     = `${API_URL}/api/tasks`;

interface RawTimeEntry {
  _id: string;
  categoryId: string;
  categoryName: string;
  startTime: string;
  endTime: string;
  duration: number;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

const mapToTimeEntry = (r: RawTimeEntry): TimeEntry => ({
  id:           r._id,
  categoryId:   r.categoryId,
  categoryName: r.categoryName,
  startTime:    r.startTime,
  endTime:      r.endTime,
  duration:     r.duration,
});

// Läs alla
export const getTasks = async (): Promise<TimeEntry[]> => {
  const raw = (await fetch(TASKS_URL).then(handleResponse<RawTimeEntry[]>));
  return raw.map(mapToTimeEntry);
};

// Skapa ny
export const createTask = async (
  categoryId: string,
  startTime:  string,
  endTime:    string
): Promise<TimeEntry> => {
  const r = await fetch(TASKS_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ categoryId, startTime, endTime }),
  }).then(handleResponse<RawTimeEntry>);
  return mapToTimeEntry(r);
};

// Uppdatera befintlig
export const updateTask = async (
  id:            string,
  updatedFields: Partial<Pick<TimeEntry, 'categoryId' | 'startTime' | 'endTime'>>
): Promise<void> => {
  await fetch(`${TASKS_URL}/${id}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(updatedFields),
  }).then(handleResponse<void>);
};

// Radera
export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${TASKS_URL}/${id}`, {
    method: 'DELETE',
  }).then(handleResponse<void>);
};
