import { motion } from 'framer-motion';
import { invitationMotionSettings } from '../../data/animationSettings.js';
import LocationMap from '../shared/LocationMap.jsx';

const icons = { haldi: '✿', baraat: '◈' };

export default function EventDetails({ event }) {
  return (
    <div className={`event-details event-details--${event.id}`}>
      <div className="event-icon" aria-hidden="true">{icons[event.id]}</div>
      <p className="event-inshaAllah">إِنْ شَاءَٱللَّٰهُ</p>
      <h2>{event.title}</h2>
      <motion.div
        className="event-copy text-reveal"
        initial={{ opacity: 0.15, filter: 'brightness(0.65)' }}
        whileInView={{ opacity: 1, filter: 'brightness(1)' }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: event.id === 'baraat'
            ? invitationMotionSettings.pages.baraat.detailsRevealSeconds
            : invitationMotionSettings.pages.haldi.transitionSeconds,
          delay: event.id === 'baraat' ? invitationMotionSettings.pages.baraat.detailsRevealDelaySeconds : 0
        }}
      >
        <div className={`event-date${event.dateStyle === 'stacked' ? ' event-date--stacked' : ''}`}>
          {event.dateParts.day} {event.dateParts.month} {event.dateParts.year}
        </div>
        <p className="event-time">Time : {event.time}</p>
        <p className="event-venue">{event.venue}</p>
        <p className="event-address">{event.address}</p>
      </motion.div>
      <LocationMap location={event.address} mapLink={event.mapLink} />
    </div>
  );
}
