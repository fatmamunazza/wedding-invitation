# Munazza Fatma & Tajdar Abbas Rizvi Wedding Invitation

A mobile-first React invitation with six screens, a guest-specific welcome, event details, and background music.

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

The app uses the static image `public/assets/preview.png` as the social-sharing preview for WhatsApp and other platforms. Keep the image at that path so the Open Graph and Twitter metadata resolves correctly when shared.

## Change Fonts

Edit the font tokens near the top of [`src/styles/theme.css`](src/styles/theme.css):

```css
--font-body: 'Cormorant Garamond', Georgia, serif;
--font-display: 'Great Vibes', cursive;
--font-heading: 'Playfair Display', Georgia, serif;
```

`--font-body` is used for general text, `--font-display` for calligraphic names and titles, and `--font-heading` for event venue headings. If you select a web font, add its import at the top of `src/styles.css`; always keep a system fallback in the token.

## Change Font Sizes

The theme file uses mobile-first font sizes, followed by responsive overrides:

- The default `:root` values apply below 700px.
- `@media (max-width: 380px)` reduces selected display sizes on narrow phones.
- `@media (min-width: 700px)` selects the desktop background and modestly enlarges type for tablets and larger screens.
- `@media (min-width: 1024px)` increases type further for desktop layouts.
- `@media (max-height: 700px)` reduces decorative vertical spacing and keeps long panels scrollable on short screens.

Change the relevant tokens instead of hunting through component selectors. Examples include `--font-size-body`, `--font-size-greeting`, `--font-size-couple`, `--font-size-event-title`, and `--font-size-closing-title`. Use pixel values for predictable sizes. If a title is too large only on small phones, adjust its token in the `max-width: 380px` block; for desktop-only changes use the `min-width: 1024px` block.

The invitation uses a fixed-height page. Keep long text readable: test the smallest phone width, and avoid increasing several large text tokens at once. If a section's content exceeds the available height, its content panel can scroll independently while the page background and controls remain in place.

## Change Colors

Edit the brand palette in `src/styles/theme.css`:

| Token | Used for |
| --- | --- |
| `--color-paper` | Light card and control surfaces |
| `--color-blush`, `--color-blush-deep` | Soft pink surfaces |
| `--color-rose` | Primary text, links, and controls |
| `--color-rose-muted` | Secondary text |
| `--color-gold` | Decorative accents |
| `--color-ink` | Body copy |
| `--color-app-background`, `--color-page-background`, `--color-scene-background` | Page and section base colors |
| `--color-line` | Fine borders and separators |

Decorative surfaces, borders, shadows, and the CSS couple illustration also use `--color-*` tokens in `src/styles/theme.css`. Change a token once to update its uses across the invitation. Check text contrast after changing foreground or background colors.

## Change Backgrounds

The entire app uses responsive artwork: `public/assets/mobile-background.png` below 700px and `public/assets/desktop-background.png` at 700px and above. The selected image fills the viewport using `background-size: 100% 100%`, so none of it is cropped. This may stretch the artwork when the screen and image aspect ratios differ. To replace the images:

1. Put the optimized image in `public/assets/`, for example `public/assets/invitation-background.webp`.
2. In `src/styles/theme.css`, update the responsive `--invitation-background-image` value in the base `:root` and its desktop override inside `@media (min-width: 700px)`:

```css
--invitation-background-image: url('/assets/invitation-background.webp');
```

The same responsive image is used on the welcome and every invitation screen. Keep the mobile image portrait and the desktop image landscape. The app stretches each image to fill the complete viewport without cropping. Set `--invitation-background-image` to `none` in both theme blocks to remove the image.

For public assets, use URLs such as `/assets/file.webp`; do not include `public` in the browser URL. The `public/` directory name is only used on disk.

## Change Invitation Content

- Add or update a guest in `src/data/guests.js`. The object key becomes the `guestId` in `/invite/<guestId>` and `name` is the displayed greeting.
- Change the fallback welcome name in `src/data/invitationCopy.js`. Fixed page copy lives there; bride/groom names, family facts, event dates, times, venues, and addresses live in `src/data/weddingDetails.js`.
- Both Haldi and Baraat screens appear for every guest. Each event can define a `mapLink` in `src/data/weddingDetails.js`; `LocationMap.jsx` uses it, with an address-based Google Maps search as a fallback.
- The root `/` and invalid IDs use the generic invitation. The UI route is defined in `src/App.jsx`; guest validation is in `src/services/guestResolver.js`.
- Re-run the production build after changing guests or event data so the static social metadata and preview files are regenerated.

The six screens always appear in this order: Personal Welcome, Islamic Blessings, Wedding Ceremony, Haldi, Baraat, and Final Blessing. The final screen first shows the dua and couple names; after a pause, the dua blurs away, the image moves from the bottom to the center, and the farewell text appears on the same screen.

Current configured links:

- `/` — six-screen invitation using the fallback welcome name.
- `/invite/abc123` — Ali & Family.
- `/invite/xyz456` — Fatima & Family.
- `/invite/demoHaldi` — Ayesha & Family.

## Change Page Timing

Edit `src/data/animationSettings.js`:

```js
export const invitationMotionSettings = {
	transitionSeconds: 5,
	dwellSeconds: 2
};
```

`transitionSeconds` controls the in-place text reveal duration. `dwellSeconds` is the additional time each page remains before automatic advance. The page advances after the transition plus the dwell time. The visitor can pause or manually navigate using the controls.

## Background Music

Place an audio file at `public/assets/wedding-music.mp3`. Edit `src/data/mediaSettings.js` to change its public URL or start position (`backgroundMusicStartSeconds`, measured from zero). Playback starts at that point after the visitor opens the invitation, then loops. The music control can pause or resume it. Browsers require a user interaction before playing audio.

## Reduced Motion

The stylesheet has a `prefers-reduced-motion` rule for visitors who request reduced motion in their operating system settings. Preserve that rule when adjusting animations.
