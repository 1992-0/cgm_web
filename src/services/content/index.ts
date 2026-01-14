import { ContentProvider, Product, Category, CategoryOverview } from './types';
import { ContentfulProvider } from './contentfulClient';
import { LocalProvider } from './localProvider';

const contentfulConfigured = 
  import.meta.env.VITE_CONTENTFUL_SPACE_ID && 
  import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

class ContentService implements ContentProvider {
  private primaryProvider: ContentProvider | null = null;
  private fallbackProvider: ContentProvider;

  constructor() {
    this.fallbackProvider = new LocalProvider();
    if (contentfulConfigured) {
      this.primaryProvider = new ContentfulProvider();
    }
  }

  async getProducts(): Promise<Product[]> {
    if (this.primaryProvider) {
      try {
        return await this.primaryProvider.getProducts();
      } catch (error) {
        console.warn('Failed to fetch from CMS, falling back to local data', error);
      }
    }
    return this.fallbackProvider.getProducts();
  }

  async getProduct(id: string): Promise<Product | undefined> {
    if (this.primaryProvider) {
      try {
        const product = await this.primaryProvider.getProduct(id);
        if (product) return product;
      } catch (error) {
        console.warn('Failed to fetch from CMS, falling back to local data', error);
      }
    }
    return this.fallbackProvider.getProduct(id);
  }

  async getCategories(): Promise<Category[]> {
    if (this.primaryProvider) {
      try {
        return await this.primaryProvider.getCategories();
      } catch (error) {
        console.warn('Failed to fetch from CMS, falling back to local data', error);
      }
    }
    return this.fallbackProvider.getCategories();
  }

  async getCategoryOverview(categoryId: string): Promise<CategoryOverview | undefined> {
    if (this.primaryProvider) {
      try {
        const overview = await this.primaryProvider.getCategoryOverview(categoryId);
        if (overview) return overview;
      } catch (error) {
        console.warn('Failed to fetch from CMS, falling back to local data', error);
      }
    }
    return this.fallbackProvider.getCategoryOverview(categoryId);
  }
}

export const contentService = new ContentService();
export * from './types';
