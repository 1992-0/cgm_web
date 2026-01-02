import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createWorker } from 'tesseract.js';

const projectRoot = process.cwd();
const rawDir = path.join(projectRoot, 'assets_raw');
const cacheDir = path.join(projectRoot, '.cache', 'ocr');
const resultsPath = path.join(projectRoot, 'src', 'data', 'ocrResults.json');
const reportPath = path.join(projectRoot, '.trae', 'documents', 'ocr-report.md');

const CACHE_VERSION = 2;

const sourceGlobs = ['**/*.{jpg,jpeg,png}'];

const sha1 = (buffer) => crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 10);
const toPublicSrc = (relativeFromPublic) => `/${relativeFromPublic.split(path.sep).join('/')}`;

const normalizeText = (text) =>
  text
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

const wordCount = (text) => (text ? text.split(/\s+/).filter(Boolean).length : 0);
const validWord = (text) => /^[A-Za-z][A-Za-z'-]{2,}$/.test(text);

await fs.mkdir(cacheDir, { recursive: true });
await fs.mkdir(path.dirname(resultsPath), { recursive: true });
await fs.mkdir(path.dirname(reportPath), { recursive: true });

const files = await fg(sourceGlobs, { cwd: rawDir, onlyFiles: true });

const worker = await createWorker('eng');

const results = [];

for (const relativePath of files) {
  const absolutePath = path.join(rawDir, relativePath);
  const buffer = await fs.readFile(absolutePath);
  const hash = sha1(buffer);
  const cacheFile = path.join(cacheDir, `${hash}.json`);

  let entry;

  try {
    const cached = await fs.readFile(cacheFile, 'utf8');
    entry = JSON.parse(cached);
    if (entry?.version !== CACHE_VERSION) {
      entry = undefined;
      throw new Error('stale cache');
    }
  } catch {
    const { data } = await worker.recognize(absolutePath);
    const cleaned = normalizeText(data.text ?? '');
    const words = Array.isArray(data.words) ? data.words : [];
    const goodWordCount = words.filter((w) => typeof w?.text === 'string' && typeof w?.confidence === 'number' && w.confidence >= 80 && validWord(w.text)).length;
    const nonEmptyLines = cleaned ? cleaned.split('\n').map((l) => l.trim()).filter(Boolean).length : 0;
    entry = {
      version: CACHE_VERSION,
      src: toPublicSrc(relativePath),
      file: relativePath,
      confidence: typeof data.confidence === 'number' ? data.confidence : null,
      wordCount: wordCount(cleaned),
      goodWordCount,
      nonEmptyLines,
      text: cleaned
    };
    await fs.writeFile(cacheFile, JSON.stringify(entry, null, 2) + '\n', 'utf8');
  }

  const containsText =
    (typeof entry.confidence === 'number' && entry.confidence >= 70 && entry.goodWordCount >= 6) ||
    (entry.goodWordCount >= 10 && (entry.text?.length ?? 0) >= 40);

  results.push({
    ...entry,
    containsText
  });
}

await worker.terminate();

results.sort((a, b) => (b.wordCount ?? 0) - (a.wordCount ?? 0));

await fs.writeFile(resultsPath, JSON.stringify(results, null, 2) + '\n', 'utf8');

const textHeavy = results.filter((r) => r.containsText);

const reportLines = [
  '# OCR Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  `Images scanned: ${results.length}`,
  `Images flagged as containing text: ${textHeavy.length}`,
  '',
  '## Text-Heavy Images',
  '',
  ...textHeavy.flatMap((r) => [
    `### ${r.file}`,
    '',
    `- src: \`${r.src}\``,
    `- confidence: ${r.confidence ?? 'n/a'}`,
    `- words: ${r.wordCount ?? 0}`,
    '',
    '```',
    r.text || '(empty)',
    '```',
    ''
  ])
];

await fs.writeFile(reportPath, reportLines.join('\n'), 'utf8');

console.log(`Scanned ${results.length} images`);
console.log(`Text-heavy images: ${textHeavy.length}`);
console.log(`Wrote: ${path.relative(projectRoot, resultsPath)}`);
console.log(`Wrote: ${path.relative(projectRoot, reportPath)}`);
