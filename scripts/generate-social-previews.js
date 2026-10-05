import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { guests } from '../src/data/guests.js';
import { weddingDetails } from '../src/data/weddingDetails.js';
import { createSocialPreview } from './socialPreviewTemplate.js';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, '..');
const outputDirectory = path.join(projectDirectory, 'dist');
const siteUrlValue = process.env.SITE_URL;

if (!siteUrlValue) {
  throw new Error('Set SITE_URL to the deployed HTTPS origin before building, for example SITE_URL=https://invitation.example.com npm run build.');
}

const siteUrl = new URL(siteUrlValue);
if (siteUrl.protocol !== 'https:' || siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash) {
  throw new Error('SITE_URL must be an HTTPS origin without a path, query, or hash.');
}

const origin = siteUrl.origin;
const genericEvents = Object.values(weddingDetails.events);
const baseHtml = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
const htmlEscape = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

function createPageHtml({ pageUrl, imageUrl, title, description, greeting }) {
  const replacements = {
    __SITE_URL__: origin,
    __PAGE_TITLE__: htmlEscape(title),
    __META_DESCRIPTION__: htmlEscape(description),
    __OG_TITLE__: htmlEscape(title),
    __OG_DESCRIPTION__: htmlEscape(description),
    __OG_URL__: htmlEscape(pageUrl),
    __OG_IMAGE__: htmlEscape(imageUrl),
    __OG_IMAGE_ALT__: htmlEscape(`${greeting} | Munazza Fatma and Tajdar Abbas Rizvi`),
    __TWITTER_TITLE__: htmlEscape(title),
    __TWITTER_DESCRIPTION__: htmlEscape(description),
    __TWITTER_IMAGE__: htmlEscape(imageUrl),
    __CANONICAL_URL__: htmlEscape(pageUrl)
  };
  return Object.entries(replacements).reduce(
    (html, [placeholder, value]) => html.replaceAll(placeholder, value),
    baseHtml
  );
}

await mkdir(path.join(outputDirectory, 'og'), { recursive: true });
const genericImagePath = path.join(outputDirectory, 'og', 'generic.svg');
await writeFile(genericImagePath, createSocialPreview({ events: genericEvents }), 'utf8');

const genericTitle = 'Munazza & Tajdar | Wedding Invitation';
const genericDescription = 'Join Munazza Fatma and Tajdar Abbas Rizvi for their wedding celebrations.';
const genericHtml = createPageHtml({
  pageUrl: `${origin}/`,
  imageUrl: `${origin}/og/generic.svg`,
  title: genericTitle,
  description: genericDescription,
  greeting: 'A wedding celebration'
});
await writeFile(
  path.join(outputDirectory, 'index.html'),
  genericHtml,
  'utf8'
);
await writeFile(
  path.join(outputDirectory, '404.html'),
  genericHtml,
  'utf8'
);

for (const [guestId, guest] of Object.entries(guests)) {
  const events = guest.events.map((eventId) => weddingDetails.events[eventId]).filter(Boolean);
  const greeting = `Dear ${guest.name}`;
  const eventSummary = events.map(({ title, date, venue }) => `${title} on ${date} at ${venue}`).join(' and ');
  const title = `${greeting} | Munazza & Tajdar Wedding Invitation`;
  const description = `${greeting}, you are invited to ${eventSummary} celebrating Munazza Fatma and Tajdar Abbas Rizvi.`;
  const imageName = `${encodeURIComponent(guestId)}.svg`;
  const guestDirectory = path.join(outputDirectory, 'invite', guestId);
  const guestImagePath = path.join(outputDirectory, 'og', imageName);
  const pageUrl = `${origin}/invite/${encodeURIComponent(guestId)}/`;
  const imageUrl = `${origin}/og/${imageName}`;

  await mkdir(guestDirectory, { recursive: true });
  await writeFile(guestImagePath, createSocialPreview({ guestName: guest.name, events }), 'utf8');
  await writeFile(
    path.join(guestDirectory, 'index.html'),
    createPageHtml({ pageUrl, imageUrl, title, description, greeting }),
    'utf8'
  );
}

console.log(`Generated generic and ${Object.keys(guests).length} guest-specific social previews for ${origin}.`);