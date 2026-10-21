const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const JANUARY_2027_DAYS = [
  ...Array(5).fill(null),
  ...Array.from({ length: 31 }, (_, index) => index + 1)
];

function CalendarDate({ day }) {
  const isEventDate = day === 15 || day === 16;

  return (
    <div
      className={`calendar-date${isEventDate ? ' calendar-date--event' : ''}`}
      aria-label={day ? `January ${day}, 2027${isEventDate ? ', event date' : ''}` : undefined}
      aria-hidden={day ? undefined : 'true'}
    >
      {isEventDate && (
        <svg className="calendar-date__heart" viewBox="0 0 48 44" aria-hidden="true">
          <path d="M24 40 5.8 21.8C-4.7 10.1 11.4-3.2 24 9.2 36.6-3.2 52.7 10.1 42.2 21.8Z" />
        </svg>
      )}
      <span>{day}</span>
    </div>
  );
}

export default function JanuaryCalendarPage() {
  return (
    <section className="calendar-page" aria-label="Save the date">
      <div className="calendar-page__content">
        <p className="calendar-page__eyebrow">Save The Date</p>
        <h1 className="calendar-page__month">January <span>2027</span></h1>

        <div className="calendar-grid" role="grid" aria-label="January 2027">
          {WEEKDAYS.map((weekday) => (
            <div className="calendar-grid__weekday" role="columnheader" key={weekday}>
              {weekday}
            </div>
          ))}
          {JANUARY_2027_DAYS.map((day, index) => (
            <div className="calendar-grid__cell" role="gridcell" key={day ?? `blank-${index}`}>
              {day && <CalendarDate day={day} />}
            </div>
          ))}
        </div>

        <div className="calendar-page__events" aria-label="Wedding events">
          <p><span className="calendar-page__event-heart" aria-hidden="true">♡</span> Haldi - 15 Jan 2027</p>
          <p><span className="calendar-page__event-heart" aria-hidden="true">♡</span> Nikaah - 16 Jan 2027</p>
        </div>
      </div>
    </section>
  );
}
