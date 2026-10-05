function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="16" rx="1.5" />
      <path d="M7.5 3v4M16.5 3v4M4 9.5h16M8 13h2M14 13h2M8 17h2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

export default function WeddingDetailsPage() {
  return (
    <section className="wedding-details-page" aria-label="Wedding details">
      <div className="wedding-details-panel">
        <p className="wedding-details-bismillah" lang="ar" dir="rtl">إن شاء الله</p>
        <div className="wedding-details-item">
          <CalendarIcon />
          <p className="wedding-details-date">January | 16 | Saturday</p>
          <p className="wedding-details-year">2027</p>
        </div>
        <div className="wedding-details-item">
          <ClockIcon />
          <p>Time : 08:00 pm</p>
        </div>
        <div className="wedding-details-item">
          <LocationIcon />
          <p>Venue : Parmeshwar Banquet Hall</p>
        </div>
      </div>
    </section>
  );
}