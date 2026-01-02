# Add New Content & Improve App Structure

## 1. Asset Migration
- **Copy Images**: Transfer all images from `data_assets_images/` to `public/`.
- **Cleanup**: Remove `data_assets_images/` after successful transfer.

## 2. Data Enhancement (Merge & Fix Duplicates)
- **`categories.json`**:
    - **Keep**: Existing Agriculture, Livestock, Leather categories.
    - **Add**: 
        - `solar` (Solar Panels & Systems, Batteries, Inverters, Kits)
        - `mobile-accessories` (Mobile Phones & Accessories)
        - `electronics` (TVs & Appliances)
- **`products.json`**:
    - **Keep**: Existing products (Sesame, Gum Arabic, Hibiscus, Cattle, Hides).
    - **Add Missing Items**:
        - **Groundnuts (Peanuts)**: Add this new agro-product mentioned in the text.
        - **Solar Products**: Add Panels, Batteries, Inverters, Kits using the new images.
        - **Mobile & Accessories**: Add products using `mobile and accessories.jpeg`.
        - **General Goods**: Add items like TVs/Appliances using `tv_appliance.jpeg`.
    - **Fix Duplications**: Ensure we don't create duplicate entries for Sesame, Gum Arabic, or Hibiscus (since they already exist).

## 3. Homepage Improvements (`src/pages/Home.tsx`)
- **Update Branding**: Update the Hero and Intro text with the provided "ChadGlobal Market" profile (Reliable Trade & Supply Partner).
- **Service Section**: Add the new "Our Services" section (Export, Import, Documentation, Matchmaking).
- **Why Choose Us**: Update with the specific points provided (Direct sourcing, Export-ready, etc.).
- **Product Showcase**: Ensure the homepage highlights the full range of offerings:
    - **Exports**: Sesame, Gum Arabic, Groundnuts, Hibiscus, Livestock.
    - **Imports/Supply**: Solar Systems, Mobile Accessories, Essential Goods.

## 4. Verification
- Confirm all old and new products are visible.
- Check that no duplicate products appear in the list.
- Verify images for new products load correctly.
