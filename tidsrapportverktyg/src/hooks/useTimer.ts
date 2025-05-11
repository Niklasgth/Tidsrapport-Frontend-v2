import { useEffect, useState } from 'react';

// Hook som mäter hur många sekunder som gått sedan startTime, om isRunning är true
export const useTimer = (isRunning: boolean, startTime: Date | null) => {
  // duration: antal sekunder som gått sedan start
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Om timern är aktiv och det finns en starttid
    if (isRunning && startTime) {
      // Starta ett intervall som körs varje sekund
      interval = setInterval(() => {
        // Räkna ut skillnaden mellan nu och starttid (i sekunder)
        const seconds = Math.floor((Date.now() - startTime.getTime()) / 1000);
        setDuration(seconds);
      }, 1000); // Uppdatera varje sekund
    }

    // När isRunning eller startTime ändras, eller komponenten unmountas – rensa timern
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  // Nollställ timern
  const reset = () => setDuration(0);

  // Returnera både värdet och funktionen för återställning
  return { duration, reset };
};
