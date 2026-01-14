import { createClient } from 'contentful';
import { Product, Category, CategoryOverview, ContentProvider } from './types';

// Environment variables
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const isConfigured = SPACE_ID && ACCESS_TOKEN;

const client = isConfigured
  ? createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    })
  : null;

// Helper to map Contentful Image Asset to URL string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getImageUrl = (image: any): string | undefined => {
  if (!image?.fields?.file?.url) return undefined;
  return `https:${image.fields.file.url}`;
};

export class ContentfulProvider implements ContentProvider {
  async getProducts(): Promise<Product[]> {
    if (!client) throw new Error('Contentful not configured');

    const response = await client.getEntries({
      content_type: 'product',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.items.map((item: any) => {
      const categoryField = item.fields.category;
      let categoryId = 'uncategorized';

      if (typeof categoryField === 'string') {
        categoryId = categoryField;
      } else if (categoryField && typeof categoryField === 'object') {
        // Handle Reference field (linked entry)
        categoryId = categoryField.fields?.slug || categoryField.sys?.id || 'uncategorized';
      }

      return {
        id: item.sys.id,
        category: categoryId,
        name: item.fields.name,
        description: item.fields.description,
        image: getImageUrl(item.fields.image),
        details: item.fields.details,
      };
    });
  }

  async getProduct(id: string): Promise<Product | undefined> {
    if (!client) throw new Error('Contentful not configured');

    try {
      const response = await client.getEntry(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item: any = response;
      
      const categoryField = item.fields.category;
      let categoryId = 'uncategorized';

      if (typeof categoryField === 'string') {
        categoryId = categoryField;
      } else if (categoryField && typeof categoryField === 'object') {
        categoryId = categoryField.fields?.slug || categoryField.sys?.id || 'uncategorized';
      }
      
      return {
        id: item.sys.id,
        category: categoryId,
        name: item.fields.name,
        description: item.fields.description,
        image: getImageUrl(item.fields.image),
        details: item.fields.details,
      };
    } catch (error) {
      console.error('Error fetching product from Contentful:', error);
      return undefined;
    }
  }

  async getCategories(): Promise<Category[]> {
    if (!client) throw new Error('Contentful not configured');

    const response = await client.getEntries({
      content_type: 'category',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.items.map((item: any) => ({
      id: item.fields.slug || item.sys.id,
      name: item.fields.name,
      image: getImageUrl(item.fields.image),
      description: item.fields.description,
    }));
  }

  async getCategoryOverview(categoryId: string): Promise<CategoryOverview | undefined> {
    if (!client) throw new Error('Contentful not configured');

    // Assuming we have a 'categoryOverview' content type
    const response = await client.getEntries({
      content_type: 'categoryOverview',
      'fields.categoryId': categoryId,
      limit: 1,
    });

    if (response.items.length === 0) return undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any = response.items[0];
    return {
      title: item.fields.title,
      summary: item.fields.summary,
      productsToList: item.fields.productsToList,
      brandsToFocus: item.fields.brandsToFocus,
      brandsToConsider: item.fields.brandsToConsider,
      rules: item.fields.rules,
    };
  }
}
