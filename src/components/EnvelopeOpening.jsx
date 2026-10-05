import { motion } from 'framer-motion';
import WelcomeSection from './WelcomeSection.jsx';

export default function EnvelopeOpening({ guestName, onOpen }) {
  return (
    <motion.section
      className="opening-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 1 }}
      aria-label="Open wedding invitation"
    >
      <img className="opening-greeting-image" src="/assets/Assalamoalaikum.png" alt="Wedding envelope greeting" />
      <WelcomeSection guestName={guestName} />
      <motion.button
        className="open-invitation"
        onClick={onOpen}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -2 }}
      >
        <span className="seal">♡</span>
        <span>Open Invitation</span>
      </motion.button>
    </motion.section>
  );
}
