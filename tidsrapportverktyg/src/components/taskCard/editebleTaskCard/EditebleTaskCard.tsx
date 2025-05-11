
import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './EditebleTaskCard.module.css';
import buttonStyles from '@components/ui/button/Button.module.css';

import { TimeEntry } from '@models/TimeEntry';
import { Category } from '@models/Category';

import { localDatetimeToISOString, formatReadableDatetime  } from '@utils/dateHelpers';
  
interface EditebleTaskCardProps {
  task: TimeEntry;
  categories: Category[];
  onSave: (id: string, updatedFields: Partial<TimeEntry>) => void;
}

const EditebleTaskCard: React.FC<EditebleTaskCardProps> = ({
  task,
  categories,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<{
    categoryId: string;
    startTime: string;
    endTime: string;
  }>({
    categoryId: task.categoryId,
    startTime: task.startTime?.slice(0, 16) ?? '',
    endTime:   task.endTime  ?.slice(0, 16) ?? '',
  });

  useEffect(() => {
    setDraft({
      categoryId: task.categoryId,
      startTime: task.startTime?.slice(0, 16) ?? '',
      endTime:   task.endTime  ?.slice(0, 16) ?? '',
    });
  }, [task]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDraft(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {  
    //för felsökning
    if (!task.id) {
    console.error('Kan inte spara – task.id saknas!');
    return;
  }


onSave(task.id, {
  categoryId: draft.categoryId,
  startTime: draft.startTime ? localDatetimeToISOString(draft.startTime) : undefined,
  endTime: draft.endTime ? localDatetimeToISOString(draft.endTime) : undefined,
});
    setIsEditing(false);
  };

  const formatTime = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
      : '–';

  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString('sv-SE')
      : '–';

  return (
    <div className={styles.card}>
      {isEditing ? (
        <div className={styles.editForm}>
          <label className={styles.label}>
            Kategori:
            <select
              name="categoryId"
              value={draft.categoryId}
              onChange={handleChange}
              className={styles.select}
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Start:
            <input
              type="datetime-local"
              name="startTime"
              value={draft.startTime}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Slut:
            <input
              type="datetime-local"
              name="endTime"
              value={draft.endTime}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <div className={styles.buttons}>
            <button
              onClick={handleSave}
              className={`${buttonStyles.button} ${buttonStyles.small}`}
            >
              Spara
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={`${buttonStyles.button} ${buttonStyles.small}`}
            >
              Avbryt
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.viewMode}>
          <h3 className={styles.categoryName}>{task.categoryName}</h3>
          <p><strong>Start:</strong> {formatTime(task.startTime)}</p>
          <p><strong>Slut:</strong>  {formatTime(task.endTime)}</p>
          <p><strong>Datum:</strong> {formatDate(task.startTime)}</p>
          <div className={styles.buttons}>
            <button
              onClick={() => setIsEditing(true)}
              className={`${buttonStyles.button} ${buttonStyles.small}`}
            >
              Redigera
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditebleTaskCard;
