
import React, { useState, useEffect } from 'react';
import { getTaskCategories, createTaskCategory } from '@services/taskCategoryService';
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
    console.log('→ fetchCategories körs');        // ①
    setIsLoading(true);
    try {
      const cats = await getTaskCategories();
      console.log('← getTaskCategories färdig, cats=', cats);  // ②
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
    if (!newCategoryName.trim()) return;
    setIsLoading(true);
    try {
      await createTaskCategory(newCategoryName.trim());
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
        {/* Flyttat upp: Välj kategori */}
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
            Skapa din egen syssla:
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
