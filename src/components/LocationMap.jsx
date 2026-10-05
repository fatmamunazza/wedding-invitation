export function createGoogleMapsSearchUrl(location) {
  const mapsUrl = new URL('https://www.google.com/maps/search/');
  mapsUrl.searchParams.set('api', '1');
  mapsUrl.searchParams.set('query', location.trim());
  return mapsUrl.href;
}

export default function LocationMap({ location, mapLink }) {
  if (!location?.trim()) return null;

  const accessibleLabel = `View ${location} on Google Maps`;

  return (
    <a
      className="map-button"
      href={mapLink || createGoogleMapsSearchUrl(location)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel}
      title={accessibleLabel}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.25" />
      </svg>
      <span>View on Map</span>
    </a>
  );
}