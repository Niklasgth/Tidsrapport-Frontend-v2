import { useState, useEffect } from 'react';

// Funktion som hämtar alla kategorier från backend-API
import { getTaskCategories } from '@services/taskCategoryService';

// Typ för kategoriobjekt
import { Category } from '@models/Category';

// Custom hook som hämtar kategorier och returnerar dem med laddstatus och felhantering
export function useCategories(): {
  categories: Category[];      // Lista av kategorier
  isLoading: boolean;          // Indikerar om data håller på att hämtas
  error: Error | null;         // Eventuellt fel som uppstått
} {
  // Lokal state för kategorier
  const [categories, setCategories] = useState<Category[]>([]);

  // Om kategorier håller på att hämtas
  const [isLoading, setIsLoading] = useState(true);

  // Fel som uppstått vid hämtning
  const [error, setError] = useState<Error | null>(null);

  // Körs vid komponentens första utskrivning – hämtar kategorier från backend
  useEffect(() => {
    setIsLoading(true);

    getTaskCategories()
      .then((cats) => {
        setCategories(cats); // Uppdatera state med resultat
        setError(null);      // Rensa tidigare fel
      })
      .catch((err) => {
        console.error('Kunde inte hämta kategorier', err);
        setError(err);       // Spara fel för visning i UI
      })
      .finally(() => setIsLoading(false)); // Avsluta laddning
  }, []);

  // Returnera hookens data till den som använder den
  return { categories, isLoading, error };
}
