import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './DoorIntro.css';

const MOBILE_WELCOME_IMAGE = '/assets/WelcomeCard.png';
const DESKTOP_WELCOME_IMAGE = '/assets/welcomeCardDesktop.png';

const OPENING_DURATION = 4000;
const OPENING_EASE = [0.42, 0, 0.58, 1];

export default function DoorIntro({ onStart, onComplete }) {
  const [phase, setPhase] = useState('ready');
  const completeTimeoutRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    [MOBILE_WELCOME_IMAGE, DESKTOP_WELCOME_IMAGE].forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
    return () => {
      window.clearTimeout(completeTimeoutRef.current);
    };
  }, []);

  const startOpening = () => {
    if (startedRef.current) return;

    startedRef.current = true;

    onStart();

    setPhase('opening');
    completeTimeoutRef.current = window.setTimeout(onComplete, OPENING_DURATION);
  };

  return (
    <motion.section
      className={`welcome-intro welcome-intro--${phase}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'opening' ? 0 : 1 }}
      transition={{ opacity: { duration: OPENING_DURATION / 1000, ease: OPENING_EASE } }}
      aria-label="Open the wedding invitation"
    >
      <picture className="welcome-intro__artwork">
        <source
          media="(min-width: 700px)"
          srcSet={DESKTOP_WELCOME_IMAGE}
        />

        <img
          className="welcome-intro__image"
          src={MOBILE_WELCOME_IMAGE}
          alt="A warmly lit wedding lantern surrounded by flowers"
          fetchPriority="high"
        />
      </picture>

      <button
        className="welcome-intro__trigger"
        type="button"
        onClick={startOpening}
        disabled={phase !== 'ready'}
        aria-label="Open invitation"
      >
        <span className="welcome-intro__heart" aria-hidden="true">
          <svg viewBox="0 0 48 48" focusable="false">
            <path d="M24 39S7 29 7 17.5C7 11.2 15 7 24 16c9-9 17-4.8 17 1.5C41 29 24 39 24 39Z" />
          </svg>
        </span>

        <span className="welcome-intro__label">
          Open Invitation
        </span>
      </button>

      {phase === 'opening' && (
        <div className="welcome-intro__flash" aria-hidden="true" />
      )}
    </motion.section>
  );
}