export interface TimeEntry {
  id: string;           
  categoryId: string;
  categoryName: string;
  startTime?: string;
  endTime?: string;
  duration: number;
}