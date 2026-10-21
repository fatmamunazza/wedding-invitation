import { useEffect, useState } from 'react';
import EventDetails from './EventDetails.jsx';

export default function EventSection({ event }) {
  const [playNikahAnimation, setPlayNikahAnimation] = useState(false);

  useEffect(() => {
    if (event.id !== 'baraat') return undefined;

    const frame = window.requestAnimationFrame(() => setPlayNikahAnimation(true));
    return () => {
      window.cancelAnimationFrame(frame);
      setPlayNikahAnimation(false);
    };
  }, [event.id]);

  return (
    <section className={`event-section event-${event.id} section-pad`} id={event.id}>
      {event.id === 'baraat' && (
        <img
          className={`nikah-artwork`}
          src="/assets/nikah.jpeg"
          alt="Bride and groom seated beside a floral wedding divider"
        />
      )}
      <div className={`event-card${event.id === 'baraat' ? ' event-card--baraat' : ''}`}>
        <EventDetails event={event} />
      </div>
    </section>
  );
}
