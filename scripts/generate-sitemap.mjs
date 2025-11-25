import fs from 'fs/promises';
import path from 'path';

const DIST = path.resolve(process.cwd(), 'dist');
const SITE = process.env.SITE_URL || 'https://thetwochicksphotography.com';

function isHtml(file) {
  return file.endsWith('.html');
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? await walk(res) : res;
  }));
  return Array.prototype.concat(...files);
}

function buildXml(urls) {
  const header = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const footer = '</urlset>\n';
  const body = urls.map(u => {
    return `  <url>\n    <loc>${(SITE + u).replace(/([^:]\/)\/+/g,'$1')}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }).join('');
  return header + body + footer;
}

(async () => {
  try {
    const allFiles = await walk(DIST);
    const htmlFiles = allFiles.filter(f => isHtml(f));
    const visible = htmlFiles
      .map(f => path.relative(DIST, f).replace(/\\/g, '/'))
      .filter(p => !p.includes('404.html') && !p.startsWith('assets/') && !p.startsWith('images/'))
      .map(p => {
        if (p === 'index.html') return '/';
        if (p.endsWith('/index.html')) return '/' + p.replace(/\/\/index\.html$/, '');
        if (p.endsWith('.html')) return '/' + p.replace(/\.html$/, '');
        return '/' + p;
      });

    const urls = Array.from(new Set(visible)).sort();
    const xml = buildXml(urls);
    await fs.writeFile(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
    console.log(`Wrote sitemap.xml with ${urls.length} urls to ${path.join(DIST, 'sitemap.xml')}`);
  } catch (err) {
    console.error('Failed to generate sitemap:', err);
    process.exit(1);
  }
})();
