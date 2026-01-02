import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const projectRoot = process.cwd();
const rawDir = path.join(projectRoot, 'assets_raw');
const publicDir = path.join(projectRoot, 'public');
const outputDir = path.join(publicDir, 'optimized');
const manifestPath = path.join(projectRoot, 'src', 'data', 'imageManifest.json');

const sourceGlobs = ['**/*.{jpg,jpeg,png}'];
const widths = [320, 640, 960, 1280];

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const sha1 = (buffer) => crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 10);

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const toPublicSrc = (relativeFromPublic) => `/${relativeFromPublic.split(path.sep).join('/')}`;

const buildSrcSet = (entries) =>
  entries
    .sort((a, b) => a.width - b.width)
    .map((e) => `${e.src} ${e.width}w`)
    .join(', ');

await ensureDir(outputDir);

const files = await fg(sourceGlobs, { cwd: rawDir, onlyFiles: true });

const manifest = {};

for (const relativePath of files) {
  const absolutePath = path.join(rawDir, relativePath);
  const inputBuffer = await fs.readFile(absolutePath);
  const hash = sha1(inputBuffer);

  const image = sharp(inputBuffer, { failOn: 'none' });
  const meta = await image.metadata();

  const originalWidth = meta.width ?? null;
  const originalHeight = meta.height ?? null;

  if (!originalWidth || !originalHeight) continue;

  const parsed = path.parse(relativePath);
  const baseName = slugify(parsed.name);

  const webpVariants = [];
  const jpegVariants = [];

  const eligibleWidths = widths.filter((w) => w <= originalWidth);
  const targetWidths = eligibleWidths.length > 0 ? eligibleWidths : [originalWidth];

  for (const w of targetWidths) {
    const webpName = `${baseName}-${hash}-w${w}.webp`;
    const jpegName = `${baseName}-${hash}-w${w}.jpg`;
    const webpOut = path.join(outputDir, webpName);
    const jpegOut = path.join(outputDir, jpegName);

    const resized = sharp(inputBuffer, { failOn: 'none' }).resize({ width: w, withoutEnlargement: true });

    const webpBuffer = await resized.webp({ lossless: true }).toBuffer();
    await fs.writeFile(webpOut, webpBuffer);

    const jpegBuffer = await resized.jpeg({ quality: 92, mozjpeg: true }).toBuffer();
    await fs.writeFile(jpegOut, jpegBuffer);

    webpVariants.push({ width: w, src: `/optimized/${webpName}` });
    jpegVariants.push({ width: w, src: `/optimized/${jpegName}` });
  }

  const fallback = jpegVariants[jpegVariants.length - 1];

  manifest[toPublicSrc(relativePath)] = {
    original: {
      src: toPublicSrc(relativePath),
      width: originalWidth,
      height: originalHeight
    },
    webp: {
      srcSet: buildSrcSet(webpVariants)
    },
    jpeg: {
      srcSet: buildSrcSet(jpegVariants)
    },
    fallback: {
      src: fallback.src
    }
  };
}

await fs.mkdir(path.dirname(manifestPath), { recursive: true });
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

console.log(`Optimized ${Object.keys(manifest).length} images`);
console.log(`Wrote manifest: ${path.relative(projectRoot, manifestPath)}`);
