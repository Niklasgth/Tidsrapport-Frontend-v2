// src/utils/statUtils.ts
import { TimeEntry } from '@models/TimeEntry';

export function calculateTimeByCategory(timeEntries: TimeEntry[]): Record<string, number> {
  const result: Record<string, number> = {};

  timeEntries.forEach(entry => {
    const name = entry.categoryName ?? 'Okänd kategori';
    result[name] = (result[name] || 0) + entry.duration;
  });

  return result;
}
