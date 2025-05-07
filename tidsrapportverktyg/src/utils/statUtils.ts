// statUtils.ts
import { TimeEntry } from '@models/TimeEntry';

export const calculateTimeByCategory = (timeEntries: TimeEntry[]): { [categoryId: string]: number } => {
  return timeEntries.reduce((acc, entry) => {
    const categoryId = entry.categoryId;
    const duration = entry.duration;

    // Lägg till tiden för varje kategori
    if (acc[categoryId]) {
      acc[categoryId] += duration;
    } else {
      acc[categoryId] = duration;
    }

    return acc;
  }, {} as { [categoryId: string]: number });
};
