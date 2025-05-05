
import { Task } from '@models/Task';

export const createTask = async (text: string, startTime: Date, endTime: Date): Promise<Task> => {
  const response = await fetch('http://localhost:8080/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Kunde inte spara task');
  }

  return await response.json();
};
