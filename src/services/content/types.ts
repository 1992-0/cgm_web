export interface Category {
  id: string;
  name: string;
  image?: string;
  description?: string;
}

export interface ProductDetails {
  [key: string]: string | string[] | object | undefined;
}

export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  image?: string;
  details?: ProductDetails;
}

export interface CategoryOverview {
  title: string;
  summary?: string[];
  productsToList?: string[];
  brandsToFocus?: string[];
  brandsToConsider?: string[];
  rules?: {
    dont?: string[];
    do?: string[];
  };
}

export interface ContentProvider {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getCategories(): Promise<Category[]>;
  getCategoryOverview(categoryId: string): Promise<CategoryOverview | undefined>;
}
