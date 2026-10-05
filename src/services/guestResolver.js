import { guests } from '../data/guests.js';

export function resolveGuest(guestId) {
  if (!guestId) return null;
  const guest = guests[guestId];
  if (!guest?.name || !Array.isArray(guest.events)) return null;
  return {
    id: guestId,
    name: guest.name,
    events: guest.events.filter(Boolean)
  };
}

export function getGuestIdFromPath(pathname = window.location.pathname) {
  const match = pathname.match(/^\/invite\/([^/]+)\/?$/i);
  return match?.[1] ?? null;
}
