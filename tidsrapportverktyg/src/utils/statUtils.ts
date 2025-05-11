import { TimeEntry } from '@models/TimeEntry';
import {
  startOfWeek,
  endOfWeek,
  isWithinInterval
} from 'date-fns';

// För att mappa dagnummer till svenska veckodagar
const dayLabels = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

/**
 * Summerar total tid per kategori, oavsett datum eller vecka.
 */
export function calculateTimeByCategory(
  timeEntries: TimeEntry[]
): Record<string, number> {
  const result: Record<string, number> = {};

  timeEntries.forEach(entry => {
    if (!entry.startTime) return;
    const name = entry.categoryName ?? 'Okänd kategori';
    result[name] = (result[name] || 0) + entry.duration;
  });

  return result;
}

/**
 * Summerar tid per kategori under en viss vecka (mån–sön).
 */
export function calculateWeeklyTimeByCategory(
  timeEntries: TimeEntry[],
  referenceDate: Date = new Date()
): Record<string, number> {
  const result: Record<string, number> = {};
  const weekStart = startOfWeek(referenceDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(referenceDate, { weekStartsOn: 1 });

  timeEntries.forEach(entry => {
    if (!entry.startTime) return;
    const start = new Date(entry.startTime);
    if (isNaN(start.getTime())) return;

    if (isWithinInterval(start, { start: weekStart, end: weekEnd })) {
      const name = entry.categoryName ?? 'Okänd kategori';
      result[name] = (result[name] || 0) + entry.duration;
    }
  });

  return result;
}

/**
 * Summerar tid per dag och kategori under en viss vecka (mån–sön).
 */
export function calculateDailyTimeByCategory(
  timeEntries: TimeEntry[],
  referenceDate: Date = new Date()
): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {};
  const weekStart = startOfWeek(referenceDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(referenceDate, { weekStartsOn: 1 });

  timeEntries.forEach(entry => {
    if (!entry.startTime) return;
    const start = new Date(entry.startTime);
    if (isNaN(start.getTime())) return;

    if (isWithinInterval(start, { start: weekStart, end: weekEnd })) {
      const day = dayLabels[start.getDay()];
      const category = entry.categoryName ?? 'Okänd kategori';

      if (!result[day]) {
        result[day] = {};
      }

      result[day][category] = (result[day][category] || 0) + entry.duration;
    }
  });

  return result;
}
