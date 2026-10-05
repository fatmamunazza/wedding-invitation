import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeOpening from '../components/EnvelopeOpening.jsx';
import IslamicBlessingsPage from '../components/IslamicBlessingsPage.jsx';
import EventSection from '../components/EventSection.jsx';
import Footer from '../components/Footer.jsx';
import MusicControl from '../components/MusicControl.jsx';
import WeddingCeremonyPage from '../components/WeddingCeremonyPage.jsx';
import { invitationMotionSettings } from '../data/animationSettings.js';
import { invitationCopy } from '../data/invitationCopy.js';
import { mediaSettings } from '../data/mediaSettings.js';
import { weddingDetails } from '../data/weddingDetails.js';
import { getGuestIdFromPath, resolveGuest } from '../services/guestResolver.js';

const BARAAT_SLIDE_INDEX = 4;
const BARAAT_REVEAL_SECONDS = 4.2 + 0.8;
const BARAAT_READING_PAUSE_SECONDS = 2;

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [musicAvailable, setMusicAvailable] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const audioRef = useRef(null);
  const guest = useMemo(() => resolveGuest(getGuestIdFromPath()), []);
  const openInvitation = () => {
    setOpened(true);
    setActiveSlide(1);
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = mediaSettings.backgroundMusicStartSeconds;
    audio.play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicPlaying(false));
  };

  const slides = [
    <EnvelopeOpening
      key="welcome"
      guestName={guest?.name ?? invitationCopy.defaultGuestName}
      onOpen={openInvitation}
    />,
    <IslamicBlessingsPage key="blessings" />,
    <WeddingCeremonyPage key="ceremony" />,
    <EventSection key="haldi" event={weddingDetails.events.haldi} />,
    <EventSection key="baraat" event={weddingDetails.events.baraat} />,
    <Footer key="closing" />
  ];

  useEffect(() => {
    if (!opened || !autoAdvance) return;
    if (activeSlide >= slides.length - 1) {
      setAutoAdvance(false);
      return;
    }

    const advanceDelaySeconds = activeSlide === BARAAT_SLIDE_INDEX
      ? BARAAT_REVEAL_SECONDS + BARAAT_READING_PAUSE_SECONDS
      : invitationMotionSettings.transitionSeconds + invitationMotionSettings.dwellSeconds;
    const timer = window.setTimeout(() => {
      setActiveSlide(activeSlide + 1);
    }, advanceDelaySeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [opened, autoAdvance, activeSlide, slides.length]);

  const updateMusicPlaying = (playing) => setMusicPlaying(playing);
  const goToSlide = (index) => {
    const nextIndex = Math.max(1, Math.min(index, slides.length - 1));
    setActiveSlide(nextIndex);
  };

  return (
    <main className="wedding-app">
      <audio
        ref={audioRef}
        src={mediaSettings.backgroundMusicUrl}
        loop
        preload="auto"
        onCanPlayThrough={() => setMusicAvailable(true)}
        onError={() => setMusicAvailable(false)}
      />
      <div className="invitation-content">
          <MusicControl
            audio={audioRef.current}
            available={musicAvailable}
            playing={musicPlaying}
            onPlayingChange={updateMusicPlaying}
          />
          <div className="invitation-stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide}
                className="invitation-slide"
                initial={{ opacity: 0, filter: 'brightness(.8)' }}
                animate={{ opacity: 1, filter: 'brightness(1)' }}
                exit={{ opacity: 0, filter: 'blur(8px)', scale: activeSlide === 0 ? 1.04 : .985 }}
                transition={{ duration: invitationMotionSettings.transitionSeconds, ease: 'easeInOut' }}
              >
                {slides[activeSlide]}
              </motion.div>
            </AnimatePresence>
          </div>
          {opened && (
            <nav className="slide-controls" aria-label="Invitation sections">
              <button type="button" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 1} aria-label="Previous section">‹</button>
              <span>{activeSlide} / {slides.length - 1}</span>
              <button
                type="button"
                onClick={() => setAutoAdvance((playing) => !playing)}
                aria-label={autoAdvance ? 'Pause automatic slides' : 'Resume automatic slides'}
              >
                {autoAdvance ? 'Ⅱ' : '▶'}
              </button>
              <button type="button" onClick={() => goToSlide(activeSlide + 1)} disabled={activeSlide === slides.length - 1} aria-label="Next section">›</button>
            </nav>
          )}
      </div>
    </main>
  );
}
