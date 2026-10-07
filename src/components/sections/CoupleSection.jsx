import { motion } from 'framer-motion';
import { invitationMotionSettings } from '../../data/animationSettings.js';

export default function CoupleSection() {
  return (
    <section className="couple-section section-pad">
      <div className="couple-card">
        <motion.div
          className="couple-copy text-reveal"
          initial={{ opacity: 0.15, filter: 'brightness(0.65)' }}
          whileInView={{ opacity: 1, filter: 'brightness(1)' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: invitationMotionSettings.transitionSeconds }}
        >
          <div className="plaque">
            <p className="script-small">Join us for the union of two souls</p>
            <h2>Walima of Hearts</h2>
            <p className="tiny-rule">✦ ─── ✦ ─── ✦</p>
          </div>
        </motion.div>
        <div className="couple-illustration" aria-label="Stylized wedding couple illustration">
          <div className="bride">
            <div className="bride-head" />
            <div className="veil" />
            <div className="bride-body" />
            <div className="bouquet" />
          </div>
          <div className="groom">
            <div className="groom-head" />
            <div className="groom-body" />
            <div className="lapel" />
          </div>
        </div>
        <motion.p
          className="couple-note text-reveal"
          initial={{ opacity: 0.15, filter: 'brightness(0.65)' }}
          whileInView={{ opacity: 1, filter: 'brightness(1)' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: invitationMotionSettings.transitionSeconds }}
        >
          A new chapter, written with grace, family and duas.
        </motion.p>
      </div>
    </section>
  );
}
