import { useEffect, useState } from 'react';

export const useTimer = (isRunning: boolean, startTime: Date | null) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const reset = () => setDuration(0);

  return { duration, reset };
};
