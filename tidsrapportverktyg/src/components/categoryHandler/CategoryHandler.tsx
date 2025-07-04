
import React, { useState, useEffect } from 'react';
import { getTaskCategories, createCategory } from '@services/taskCategoryService';
import { Category } from '@models/Category'; 
import styles from './CategoryHandler.module.css';

interface CategoryHandlerProps {
  selectedCategoryId: string;
  onCategorySelect: (id: string) => void;
}

const CategoryHandler: React.FC<CategoryHandlerProps> = ({
  selectedCategoryId,
  onCategorySelect,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    console.log('→ fetchCategories körs');       
    setIsLoading(true);
    try {
      const cats = await getTaskCategories();
      console.log('← getTaskCategories färdig, cats=', cats);  
      setCategories(cats);
      setError(null); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

 const handleCreate = async () => {
  const trimmedName = newCategoryName.trim();
  if (!trimmedName) return;

  if (categories.some(cat => cat.name.toLowerCase() === trimmedName.toLowerCase())) {
    setError('Sysslan finns redan.');
    return;
  }

  setIsLoading(true);
  try {
    await createCategory(trimmedName);
    setNewCategoryName('');
    await fetchCategories();
  } catch (err: any) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

    return (
      <div className={styles.root}>
        <div className={styles.field}>
          <label htmlFor="select-category" className={styles.label}>
            Välj det du vill ta tid på:
          </label>
          <select
            id="select-category"
            value={selectedCategoryId}
            onChange={(e) => onCategorySelect(e.target.value)}
            disabled={isLoading}
            className={styles.select}
          >
            <option value="">— Välj en syssla —</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
    
        {isLoading && <p className={styles.loading}>Hämtar kategorier…</p>}
        {error && <p className={styles.error}>Fel: {error}</p>}
    
       
        <div className={styles.field}>
          <label htmlFor="new-category" className={styles.label}>
            Saknas det du ska göra i listan?  
            Skapa din egen syssla så kan duse den i valmenyn ovan:
          </label>
          <div className={styles.fieldGroup}>
            <input
              id="new-category"
              type="text"
              placeholder="Döp din syssla"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className={styles.input}
            />
            <button
              onClick={handleCreate}
              disabled={!newCategoryName.trim()}
              className={styles.button}
            >
              Lägg till syssla
            </button>
          </div>
        </div>
      </div>
    );

}
export default CategoryHandler;
