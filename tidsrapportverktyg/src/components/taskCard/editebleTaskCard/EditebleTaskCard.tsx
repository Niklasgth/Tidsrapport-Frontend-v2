import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './EditebleTaskCard.module.css';
import { TimeEntry } from '@models/TimeEntry';
import { Category } from '@hooks/useCategories';
import buttonStyles from '@components/ui/button/Button.module.css';

interface EditebleTaskCardProps {
  task: TimeEntry;
  categories: Category[];
  onSave: (id: string, updatedFields: Partial<TimeEntry>) => void;
}

const EditebleTaskCard: React.FC<EditebleTaskCardProps> = ({ task, categories, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<{ categoryId: string; startTime: string; endTime: string }>({
    categoryId: task.categoryId,
    startTime: task.startTime ? task.startTime.toISOString().slice(0,16) : '',
    endTime: task.endTime ? task.endTime.toISOString().slice(0,16) : '',
  });

  useEffect(() => {
    setDraft({
      categoryId: task.categoryId,
      startTime: task.startTime ? task.startTime.toISOString().slice(0,16) : '',
      endTime: task.endTime ? task.endTime.toISOString().slice(0,16) : '',
    });
  }, [task]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraft(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(task.id, {
      categoryId: draft.categoryId,
      startTime: draft.startTime ? new Date(draft.startTime) : null,
      endTime: draft.endTime ? new Date(draft.endTime) : null,
    });
    setIsEditing(false);
  };

  const categoryName = categories.find(c => c.id === draft.categoryId)?.name ?? 'Okänd kategori';
  const formatTime = (date: Date | null): string => date ? date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }) : '–';
  const formatDate = (date: Date | null): string => date ? date.toLocaleDateString('sv-SE') : '–';

  return (
    <div className={styles.card}>
      {isEditing ? (
        <div className={styles.editForm}>
          <select name="categoryId" value={draft.categoryId} onChange={handleChange}>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input type="datetime-local" name="startTime" value={draft.startTime} onChange={handleChange} />
          <input type="datetime-local" name="endTime" value={draft.endTime} onChange={handleChange} />
          <div className={styles.buttons}>
            <button onClick={handleSave}>Spara</button>
            <button onClick={() => setIsEditing(false)}>Avbryt</button>
          </div>
        </div>
      ) : (
        <div className={styles.viewMode}>
          <h3>{categoryName}</h3>
          <p><strong>Start:</strong> {formatTime(task.startTime)}</p>
          <p><strong>Slut:</strong> {formatTime(task.endTime)}</p>
          <p><strong>Datum:</strong> {formatDate(task.startTime)}</p>
          <div className={styles.buttons}>
  <button
    className={`${buttonStyles.button} ${buttonStyles.small}`}
    onClick={() => setIsEditing(true)}
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
