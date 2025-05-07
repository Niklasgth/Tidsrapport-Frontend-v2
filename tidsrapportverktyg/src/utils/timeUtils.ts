// src/utils/timeUtils.ts

/** Formatera duration i sekunder till "X min Y sek" */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs    = seconds % 60;
  return `${minutes} min ${secs} sek`;
};

/** (Behåll om du behöver millisekund‐varianten för andra delar) */
export const formatDurationMs = (ms: number): string => {
  const totalSeconds = Math.round(ms / 1000);
  const minutes      = Math.floor(totalSeconds / 60);
  const seconds      = totalSeconds % 60;
  return `${minutes} min ${seconds} sek`;
};
