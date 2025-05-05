
import { TimeEntry } from './TimeEntry';

export interface TaskList {
  tasks: TimeEntry[];
  addTask: (task: TimeEntry) => void;
  removeTask: (id: string) => void;
  reset: () => void;
}
