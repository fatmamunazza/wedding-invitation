import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { invitationMotionSettings } from '../data/animationSettings.js';
import LocationMap from './LocationMap.jsx';

const icons = { haldi: '✿', baraat: '◈' };

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
          className={`nikah-artwork${playNikahAnimation ? ' is-animating' : ''}`}
          src="/assets/nikah.png"
          alt="Bride and groom seated beside a floral wedding divider"
        />
      )}
      <div className={`event-card${event.id === 'baraat' ? ' event-card--baraat' : ''}`}>
        <div className="event-icon" aria-hidden="true">{icons[event.id]}</div>
        <p className="event-inshaAllah">InshaAllah</p>
        <h2>{event.title}</h2>
        <motion.div
          className="event-copy text-reveal"
          initial={{ opacity: 0.15, filter: 'brightness(0.65)' }}
          whileInView={{ opacity: 1, filter: 'brightness(1)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: event.id === 'baraat' ? 0.8 : invitationMotionSettings.transitionSeconds,
            delay: event.id === 'baraat' ? 4.2 : 0
          }}
        >
          <div className={`event-date${event.dateStyle === 'stacked' ? ' event-date--stacked' : ''}`}>
            <span>{event.dateParts.day}</span>
            <strong>{event.dateParts.month}</strong>
            <span>{event.dateParts.year}</span>
          </div>
          <div className="event-divider" />
          <p className="event-time">Time : {event.time}</p>
          <p className="event-venue">{event.venue}</p>
          <p className="event-address">{event.address}</p>
        </motion.div>
        <LocationMap location={event.address} mapLink={event.mapLink} />
      </div>
    </section>
  );
}
