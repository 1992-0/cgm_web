import { Product, Category, CategoryOverview, ContentProvider } from './types';
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';
import categoryContentData from '../../data/categoryContent.json';

export class LocalProvider implements ContentProvider {
  async getProducts(): Promise<Product[]> {
    // Simulate async network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return productsData as Product[];
  }

  async getProduct(id: string): Promise<Product | undefined> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return (productsData as Product[]).find(p => p.id === id);
  }

  async getCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return categoriesData as Category[];
  }

  async getCategoryOverview(categoryId: string): Promise<CategoryOverview | undefined> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const data = categoryContentData as Record<string, CategoryOverview | undefined>;
    return data[categoryId];
  }
}
