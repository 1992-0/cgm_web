# Image Optimization & OCR Workflow

## Overview
This project keeps original (raw) images in `assets_raw/` and serves only optimized, responsive images from `public/optimized/`.

Text that exists inside images (screenshots, posters, WhatsApp notes, etc.) is extracted using OCR and integrated into the site as real text to improve accessibility and performance.

## Where Images Live
- Raw sources (not served): `assets_raw/`
- Optimized outputs (served): `public/optimized/`
- Runtime mapping (used by the app): `src/data/imageManifest.json`
- OCR results and review report:
  - Data: `src/data/ocrResults.json`
  - Report: `.trae/documents/ocr-report.md`

## Commands
- Optimize images and regenerate `src/data/imageManifest.json`:
  - `npm run assets:optimize`
- Run OCR and regenerate OCR outputs:
  - `npm run assets:ocr`
- Run both:
  - `npm run assets:build`

## Optimization Rules
- Multiple responsive sizes are generated (320w, 640w, 960w, 1280w when possible).
- WebP is generated for modern browsers.
- JPEG is generated as a fallback for broad compatibility.
- Output filenames include a content hash to support long-term caching.

## How To Add New Images
1. Put the original file(s) into `assets_raw/` (keep filenames readable).
2. Run `npm run assets:optimize`.
3. Use the logical source path (e.g. `/my-image.jpeg`) with the `OptimizedImage` component.

## OCR Review Process
1. Add the screenshot/poster image to `assets_raw/`.
2. Run `npm run assets:ocr`.
3. Open `.trae/documents/ocr-report.md` and review the extracted text.
4. Move verified text into real content structures (e.g. `src/data/categoryContent.json`, product descriptions, etc.).
5. Avoid using text-heavy screenshots as product images; prefer real photos or remove the image.

## Caching
Optimized assets under `/optimized/*` are served with long-term immutable caching via [vercel.json](file:///Users/mahamat/Desktop/cgm/vercel.json).

