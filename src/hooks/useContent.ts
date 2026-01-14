import { useQuery } from '@tanstack/react-query';
import { contentService } from '@/services/content';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => contentService.getProducts(),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => contentService.getProduct(id),
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => contentService.getCategories(),
  });
};

export const useCategoryOverview = (categoryId: string) => {
  return useQuery({
    queryKey: ['categoryOverview', categoryId],
    queryFn: () => contentService.getCategoryOverview(categoryId),
    enabled: !!categoryId,
  });
};
