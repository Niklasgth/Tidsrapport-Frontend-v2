
/**
 * Konverterar exempelvis: "2025-05-10T10:36" (från datetime-local) till full ISO med tidzon
 *  "2025-05-10T08:36:00.000Z" (UTC)
 */
export const localDatetimeToISOString = (local: string): string => {
  return new Date(local).toISOString();
};

/**
 * Formaterar ett ISO-datum till svensk, läsbar form.
 *
 * Exempel: "2025-05-10T08:36:00.000Z" → "lör 10 maj kl 10:36"
 */
export const formatReadableDatetime = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleString('sv-SE', {
    weekday: 'short',    // mån, tis, ons
    day: '2-digit',
    month: 'short',      // jan, feb, ...
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', ' kl'); // "mån 10 maj kl 12:34"
};