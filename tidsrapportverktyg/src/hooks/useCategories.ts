
import { HARDCODED_CATEGORIES } from '@utils/categoryData';

export interface Category {
  id: string;
  name: string;
}

export function useCategories(): {
  categories: Category[];
  isLoading: boolean;
  error: null;
} {
  return {
    categories: HARDCODED_CATEGORIES,
    isLoading: false,
    error: null,
  };
}
