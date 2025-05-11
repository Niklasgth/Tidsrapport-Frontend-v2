import { TimeEntry } from '@models/TimeEntry';
import { startOfWeek, endOfWeek } from 'date-fns';

/**
 * Hjälpfunktion: kollar om ett datum tillhör samma vecka som referensdatum (måndag–söndag).
 */
function isInSameWeek(date: Date, reference: Date): boolean {
  const weekStart = startOfWeek(reference, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(reference, { weekStartsOn: 1 });

  return date >= weekStart && date <= weekEnd;
}

// Veckodagsnamn (används i daglig statistik)
const dayLabels = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

/**
 * Summerar **total tid per kategori**, oavsett vecka eller datum.
 */
export function calculateTimeByCategory(timeEntries: TimeEntry[]): Record<string, number> {
  const result: Record<string, number> = {};

  timeEntries.forEach(entry => {
    if (!entry.startTime) return;
    const name = entry.categoryName ?? 'Okänd kategori';
    result[name] = (result[name] || 0) + entry.duration;
  });

  return result;
}

/**
 * Summerar **tid per kategori** under en viss vecka.
 */
export function calculateWeeklyTimeByCategory(
  timeEntries: TimeEntry[],
  referenceDate: Date = new Date()
): Record<string, number> {
  const result: Record<string, number> = {};

  timeEntries.forEach(entry => {
    if (!entry.startTime) return;
    const start = new Date(entry.startTime);
    if (isNaN(start.getTime())) return;

    if (isInSameWeek(start, referenceDate)) {
      const name = entry.categoryName ?? 'Okänd kategori';
      result[name] = (result[name] || 0) + entry.duration;
    }
  });

  return result;
}

/**
 * Summerar **tid per dag och kategori** under en viss vecka.
 */
export function calculateDailyTimeByCategory(
  timeEntries: TimeEntry[],
  referenceDate: Date = new Date()
): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {};

  timeEntries.forEach(entry => {
    if (!entry.startTime) return;
    const start = new Date(entry.startTime);
    if (isNaN(start.getTime())) return;

    if (isInSameWeek(start, referenceDate)) {
      const dayName = dayLabels[start.getDay()];
      const category = entry.categoryName ?? 'Okänd kategori';

      if (!result[dayName]) {
        result[dayName] = {};
      }
      result[dayName][category] = (result[dayName][category] || 0) + entry.duration;
    }
  });

  return result;
}
