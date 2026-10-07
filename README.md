# Munazza Fatma & Tajdar Abbas Rizvi Wedding Invitation

A mobile-first wedding invitation built with React, Vite, and Framer Motion.

## Requirements

- Node.js 20.19+ or 22.12+.
- npm, included with Node.js.

## Run Locally

```bash
npm install
npm run dev
```

Open the Vite URL printed in the terminal, usually `http://localhost:5173`.

## Production Build

```bash
npm run build
```

The build writes the deployable site to `dist/`. Upload the complete contents of that folder to your hosting provider.

## Project Structure

```text
src/
├── App.jsx                     # Routes
├── main.jsx                    # React entry point
├── pages/
│   └── WeddingInvitation.jsx   # Invitation flow, slide state, music
├── animations/                 # Reusable Framer Motion transitions
├── components/
│   ├── intro/                  # Welcome card and opening transition
│   ├── sections/               # Invitation page and event content
│   └── shared/                 # Reusable controls and map link
├── data/                       # Invitation copy, event, media, and timing data
├── services/                   # Guest lookup helpers
├── styles.css                  # Global and layout styles
└── styles/
    └── theme.css               # Colors, typography, and responsive theme tokens
```

Keep a component beside its styles when those styles belong only to that component. Shared page layout and theme rules belong in `src/styles.css` and `src/styles/theme.css`, respectively.

## Where to Make Changes

- **Invitation text, couple details, and events:** `src/data/invitationCopy.js` and `src/data/weddingDetails.js`.
- **Reusable page transition:** call `createPageTransition()` from `src/animations/pageTransition.js`; pass options such as `duration`, `visible`, `useBrightness`, or `ease` when needed.
- **Default slide timing and automatic advance:** `src/data/animationSettings.js`.
- **Background music URL and starting position:** `src/data/mediaSettings.js`.
- **Welcome images and opening transition:** `src/components/intro/DoorIntro.jsx` and `DoorIntro.css`.
- **Colors, fonts, and responsive type sizes:** tokens in `src/styles/theme.css`.
- **Social-sharing preview:** `public/assets/preview.png`; the Open Graph and Twitter metadata in `index.html` point to this image.
- **Public images and audio:** `public/assets/`. Reference them in the app with URLs like `/assets/file.webp`; do not include `public` in the browser URL.

The welcome card uses `WelcomeCard.png` on mobile and `welcomeCardDesktop.png` on desktop. The invitation starts with the standard mobile and desktop backgrounds, changes to the Haldi backgrounds at the Haldi section, then changes to the Nikah backgrounds at Baraat and keeps that background for the remaining sections.

The invitation currently presents five sections in order: Islamic blessings, Wedding Ceremony, Haldi, Baraat, and Final Blessing. `/` and `/invite/:guestId` both render the invitation page. Guest data and lookup helpers remain in `src/data/guests.js` and `src/services/guestResolver.js`.

## Accessibility and Motion

Preserve the `prefers-reduced-motion` rules when changing animations. The invitation content panels can scroll independently when content exceeds the available screen height.
