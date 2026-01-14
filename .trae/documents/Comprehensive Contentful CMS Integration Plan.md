# Comprehensive Contentful CMS & Contact Integration Plan

This plan outlines the steps to integrate Contentful as a Headless CMS for dynamic content and a form handling service for the contact form. We will use the **Adapter Pattern** to allow switching between the live CMS and local data (fallback), and **React Query** for efficient caching.

## 1. Prerequisites & Dependencies
1.  **Install SDKs**: Add `contentful` (official SDK) and `@tanstack/react-query` (caching/state).
2.  **Environment Setup**:
    *   Add `.env` support for:
        *   `VITE_CONTENTFUL_SPACE_ID`
        *   `VITE_CONTENTFUL_ACCESS_TOKEN`
        *   `VITE_FORMSPREE_ENDPOINT` (for the contact form)
    *   Create a `.env.example` file.

## 2. Content Architecture & Modeling
1.  **Type Definitions**:
    *   Define TypeScript interfaces for `Product`, `Category`, and `CategoryOverview` that match the existing JSON structure.
2.  **Service Layer (The Adapter)**:
    *   Create `src/services/content/types.ts` for the interfaces.
    *   Create `src/services/content/contentfulClient.ts` for the CMS connection.
    *   Create `src/services/content/index.ts` as the main entry point.
    *   Implement logic to try fetching from Contentful, and fallback to local JSON if credentials are missing or the API fails.

## 3. State Management & Hooks
1.  **Query Provider**: Wrap the application in `QueryClientProvider` in `src/main.tsx`.
2.  **Custom Hooks**:
    *   `useProducts()`: Fetches list of products.
    *   `useProduct(id)`: Fetches a single product.
    *   `useCategories()`: Fetches categories.
    *   `useCategoryContent(categoryId)`: Fetches rich content for category pages.

## 4. Component Integration
1.  **Refactor `Products.tsx`**: Replace direct JSON imports with `useProducts` and `useCategories`.
2.  **Refactor `ProductDetail.tsx`**: Replace logic with `useProduct`.
3.  **Loading & Error States**: Add visual feedback (skeletons/spinners) while fetching data.

## 5. Contact Form Integration
1.  **Service Integration**: Modify `src/pages/Contact.tsx` to submit data to the configured Form endpoint (e.g., Formspree) when `VITE_FORMSPREE_ENDPOINT` is present.
2.  **Feedback**: Show success/error messages based on the API response instead of the current `alert`.

## 6. Documentation & Developer Experience
1.  **CMS Guide**: Create `CMS_SETUP.md` detailing the Content Models (Schema) required in Contentful (e.g., Fields for "Product" and "Category") so you can configure the backend.
