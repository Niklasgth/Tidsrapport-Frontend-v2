import { Category } from '@hooks/useCategories';

export function buildCategoryMap(categories: Category[]): Record<string, string> {
    return categories.reduce((acc, c) => {
      acc[c.id] = c.name;
      return acc;
    }, {} as Record<string, string>);
  }
  