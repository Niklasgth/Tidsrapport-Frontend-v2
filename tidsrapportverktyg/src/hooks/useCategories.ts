
import { useState, useEffect } from 'react';
import { getTaskCategories } from '@services/taskCategoryService';
import { Category } from '@models/Category';

export function useCategories(): {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
} {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTaskCategories()
      .then((cats) => {
        setCategories(cats);
        setError(null);
      })
      .catch((err) => {
        console.error('Kunde inte hämta kategorier', err);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, isLoading, error };
}