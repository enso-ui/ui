import fs from 'fs';
import path from 'path';

// Temporary home until the shared frontend build surface graduates into @enso-ui/build-tools.
const clientRoot = process.cwd();
const repoRoot = path.resolve(clientRoot, '..');
const templatePath = path.resolve(clientRoot, 'index.html');
const outputPath = path.resolve(repoRoot, 'resources', 'views', 'index.blade.php');
const manifestPaths = [
    path.resolve(repoRoot, 'public', '.vite', 'manifest.json'),
    path.resolve(repoRoot, 'public', 'manifest.json'),
    path.resolve(repoRoot, 'public', 'build', 'manifest.json'),
];
const manifestPath = manifestPaths.find(fs.existsSync);

if (!manifestPath) {
    throw new Error(`Vite manifest not found in any of: ${manifestPaths.join(', ')}`);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const entry = Object.values(manifest).find(item => item.isEntry
    && ['src/js/enso.js', 'index.html'].includes(item.src));

if (!entry) {
    throw new Error('Could not find Vite entry for src/js/enso.js in manifest.json');
}

const cssTags = (entry.css || [])
    .map(file => `<link rel="stylesheet" href="/${file}">`)
    .join('');

const preloadTags = (entry.imports || [])
    .map(importKey => manifest[importKey]?.file)
    .filter(Boolean)
    .map(file => `<link rel="modulepreload" href="/${file}">`)
    .join('');

const scriptTag = `<script type="module" src="/${entry.file}"></script>`;

const template = fs.readFileSync(templatePath, 'utf-8');
const withoutDevScript = template.replace(
    /\s*<script\s+type="module"\s+src="\/src\/js\/enso\.js"><\/script>/,
    '',
);
const withBladeLocale = withoutDevScript.replace(
    /<html lang="en">/,
    '<html lang="{{ app()->getLocale() }}">',
);
const withHead = withBladeLocale.replace('</head>', `${cssTags}${preloadTags}</head>`);
const withBody = withHead.replace('</body>', `${scriptTag}</body>`);

fs.writeFileSync(outputPath, withBody);
