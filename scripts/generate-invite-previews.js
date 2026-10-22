import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { guests } from '../src/data/guests.js';
import { weddingDetails } from '../src/data/weddingDetails.js';

const indexPath = new URL('../dist/index.html', import.meta.url);
const invitationTemplate = await readFile(indexPath, 'utf8');

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceMeta(html, attribute, name, content) {
  const escapedContent = escapeAttribute(content);
  const tag = `<meta ${attribute}="${name}" content="${escapedContent}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}="${name}"[^>]*\\/?>`);

  if (!pattern.test(html)) {
    throw new Error(`Could not find ${attribute}="${name}" in dist/index.html`);
  }

  return html.replace(pattern, tag);
}

const previewImage = invitationTemplate.match(/<meta\s+property="og:image"\s+content="([^"]+)"/)?.[1];
if (!previewImage) {
  throw new Error('Could not find property="og:image" in dist/index.html');
}
const siteOrigin = new URL(previewImage).origin;

for (const [guestId, guest] of Object.entries(guests)) {
  if (!/^[\w-]+$/.test(guestId)) {
    throw new Error(`Guest ID "${guestId}" cannot be used as an invite URL`);
  }

  const eventLabels = (Array.isArray(guest.events) ? guest.events : [])
    .map((eventId) => weddingDetails.events[eventId])
    .filter(Boolean)
    .map((event) => `${event.title} on ${event.date}`);
  const title = guest.name
    ? `Wedding Invitation for ${guest.name} | Munazza & Tajdar`
    : 'Munazza & Tajdar | Wedding Invitation';
  const description = eventLabels.length
    ? `You are invited to celebrate ${eventLabels.join(' and ')}.`
    : 'Join us for Munazza and Tajdar’s wedding celebration.';

  let html = invitationTemplate.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeAttribute(title)}</title>`
  );

  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', description);
  const guestPreviewImage = guestId === 'celebrations'
    ? `${siteOrigin}/assets/preview.jpg`
    : previewImage;
  html = replaceMeta(html, 'property', 'og:image', guestPreviewImage);
  html = replaceMeta(html, 'property', 'og:image:secure_url', guestPreviewImage);
  html = replaceMeta(html, 'name', 'twitter:title', title);
  html = replaceMeta(html, 'name', 'twitter:description', description);
  html = replaceMeta(html, 'name', 'twitter:image', guestPreviewImage);
  html = html.replace(
    /<meta\s+(?:name|property)="og:url"[^>]*\/?>/,
    `<meta property="og:url" content="${escapeAttribute(`${siteOrigin}/invite/${guestId}`)}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"[^>]*\/?>/,
    `<link rel="canonical" href="${escapeAttribute(`${siteOrigin}/invite/${guestId}`)}" />`
  );
  if (!/<link\s+rel="canonical"/.test(html)) {
    html = html.replace(
      '</head>',
      `  <link rel="canonical" href="${escapeAttribute(`${siteOrigin}/invite/${guestId}`)}" />\n  </head>`
    );
  }

  const outputDirectory = new URL(`../dist/invite/`, import.meta.url);
  const outputPath = new URL(`../dist/invite/${guestId}.html`, import.meta.url);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, html);
}
