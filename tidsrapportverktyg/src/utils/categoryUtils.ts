import { Category } from "@models/Category";

// Funktion som bygger en uppslagskarta: categoryId → categoryName
export function buildCategoryMap(categories: Category[]): Record<string, string> {
  return categories.reduce((acc, c) => {
    acc[c.id] = c.name; // Lägg in id som nyckel och namn som värde
    return acc;
  }, {} as Record<string, string>); // Starta med tomt objekt och tvinga rätt typ
}
