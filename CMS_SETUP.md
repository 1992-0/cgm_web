# Contentful CMS Setup Guide

This project is integrated with [Contentful](https://www.contentful.com/) as a Headless CMS. Follow these steps to set up your Content Space and connect it to the application.

## 1. Create a Contentful Space

1.  Sign up or log in to Contentful.
2.  Create a new Space (e.g., "Chad Global Market").

## 2. Define Content Models

You need to create two primary Content Types: **Product** and **Category**.

### Content Type: Category
*   **Name**: Category
*   **API Identifier**: `category`
*   **Fields**:
    *   `name` (Text, Short) - Required, Title field
    *   `slug` (Text, Short) - Required, Unique (used as ID)
    *   `description` (Text, Long)
    *   `image` (Media, One file)

### Content Type: Product
*   **Name**: Product
*   **API Identifier**: `product`
*   **Fields**:
    *   `name` (Text, Short) - Required, Title field
    *   `category` (Text, Short) - Required (Ideally a Reference to `Category`, but currently implemented as a string ID matching the Category `slug` for simplicity)
    *   `description` (Text, Long) - Required
    *   `image` (Media, One file)
    *   `details` (JSON Object) - This field stores flexible specifications.
        *   Example structure:
            ```json
            {
              "Origin": "Chad",
              "Minimum Order": "10 MT",
              "Order Type": "Bulk",
              "Uses": ["Oil", "Food"],
              "Specifications": {
                 "Purity": "99%"
              }
            }
            ```

## 3. API Keys

1.  Go to **Settings > API keys**.
2.  Add a new API key.
3.  Copy the **Space ID** and **Content Delivery API - access token**.

## 4. Environment Variables

1.  In your project root, create or edit `.env`:
    ```env
    VITE_CONTENTFUL_SPACE_ID=your_space_id_here
    VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
    ```
2.  Restart the development server (`npm run dev`).

## 5. Contact Form Setup (Optional)

The contact form uses **Formspree** by default.

1.  Register at [Formspree.io](https://formspree.io/).
2.  Create a new Form and get the Endpoint URL.
3.  Add it to `.env`:
    ```env
    VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
    ```

## Fallback Mode

If the environment variables are missing or the API fails, the application automatically falls back to the local JSON data located in `src/data/`. This ensures the site never breaks even if the CMS is down.
