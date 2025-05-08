export function getWeekInfo(referenceDate: Date): string {
    const date = new Date(referenceDate);
  
    // Räkna ut måndag i veckan
    const day = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - ((day + 6) % 7)); // flytta bak till måndag
  
    // Räkna ut söndag
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
  
    // Format: Vecka XX – DD MMM – DD MMM
    const formatter = new Intl.DateTimeFormat('sv-SE', {
      day: 'numeric',
      month: 'short',
    });
  
    // ISO week number
    const jan4 = new Date(date.getFullYear(), 0, 4);
    const week1Monday = new Date(jan4);
    week1Monday.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
  
    const weekNumber = Math.floor(
      (monday.getTime() - week1Monday.getTime()) / (7 * 24 * 60 * 60 * 1000) + 1
    );
  
    return `Vecka ${weekNumber} – ${formatter.format(monday)}–${formatter.format(sunday)}`;
  }
  