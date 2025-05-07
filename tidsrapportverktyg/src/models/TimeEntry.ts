export type TimeEntry = {
  id: string;
  categoryId: string;
  categoryName?: string; // görsåhär för att den variablen som kommer från backend ändå ska visas i UI.  
  startTime: Date | null;
  endTime: Date | null;
  duration: number;
};
