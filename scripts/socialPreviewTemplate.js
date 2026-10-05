function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function createSocialPreview({ guestName = null, events = [] } = {}) {
  const greeting = guestName ? `Dear ${guestName}` : 'A wedding celebration';
  const eventLine = events.length
    ? events.map(({ title, date }) => `${title} | ${date}`).join('  •  ')
    : 'With the blessings of our parents';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(greeting)} | Munazza and Tajdar</title>
  <desc id="description">Wedding invitation for Munazza Fatma and Tajdar Abbas Rizvi</desc>
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff9f3" />
      <stop offset="0.55" stop-color="#f6e5df" />
      <stop offset="1" stop-color="#efd2cc" />
    </linearGradient>
    <radialGradient id="light">
      <stop offset="0" stop-color="#fff" stop-opacity=".9" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#paper)" />
  <ellipse cx="600" cy="260" rx="440" ry="330" fill="url(#light)" />
  <rect x="28" y="28" width="1144" height="574" rx="3" fill="none" stroke="#a98158" stroke-opacity=".65" stroke-width="2" />
  <rect x="43" y="43" width="1114" height="544" rx="2" fill="none" stroke="#8c332f" stroke-opacity=".2" />
  <path d="M90 600V290a510 510 0 0 1 1020 0v310M145 600V300a455 455 0 0 1 910 0v300M205 600V315a395 395 0 0 1 790 0v285" fill="none" stroke="#a98158" stroke-opacity=".22" stroke-width="2" />
  <g fill="#a95b54" fill-opacity=".48">
    <circle cx="130" cy="130" r="8"/><circle cx="157" cy="155" r="6"/><circle cx="1070" cy="120" r="8"/><circle cx="1045" cy="150" r="6"/>
    <circle cx="92" cy="197" r="5"/><circle cx="1108" cy="205" r="5"/><circle cx="180" cy="93" r="4"/><circle cx="1020" cy="91" r="4"/>
  </g>
  <g text-anchor="middle" fill="#8c332f">
    <text x="600" y="150" font-family="Georgia,serif" font-size="20" letter-spacing="7">A CELEBRATION OF LOVE</text>
    <text x="600" y="242" font-family="Georgia,serif" font-size="55" font-style="italic">${escapeXml(greeting)}</text>
    <path d="M390 282H535M665 282H810" stroke="#a98158" stroke-width="1" />
    <text x="600" y="292" font-family="Georgia,serif" font-size="19" fill="#a98158">✦</text>
    <text x="600" y="372" font-family="Georgia,serif" font-size="54" font-style="italic">Munazza Fatma</text>
    <text x="600" y="424" font-family="Georgia,serif" font-size="27" fill="#a98158">&amp;</text>
    <text x="600" y="482" font-family="Georgia,serif" font-size="49" font-style="italic">Tajdar Abbas Rizvi</text>
    <text x="600" y="531" font-family="Georgia,serif" font-size="19" letter-spacing="2">${escapeXml(eventLine)}</text>
  </g>
</svg>`;
}