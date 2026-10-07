import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPageTransition } from '../animations/pageTransition.js';
import DoorIntro from '../components/intro/DoorIntro.jsx';
import EventSection from '../components/sections/EventSection.jsx';
import Footer from '../components/sections/Footer.jsx';
import IslamicBlessingsPage from '../components/sections/IslamicBlessingsPage.jsx';
import WeddingCeremonyPage from '../components/sections/WeddingCeremonyPage.jsx';
import MusicControl from '../components/shared/MusicControl.jsx';
import { invitationMotionSettings } from '../data/animationSettings.js';
import { mediaSettings } from '../data/mediaSettings.js';
import { weddingDetails } from '../data/weddingDetails.js';

const BARAAT_SLIDE_INDEX = 3;
const HALDI_SLIDE_INDEX = 2;
const BARAAT_REVEAL_SECONDS = 4.2 + 0.8;
const BARAAT_READING_PAUSE_SECONDS = 2;
const PAPER_ROLL_DURATION_SECONDS = 2;

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [firstPageRevealStarted, setFirstPageRevealStarted] = useState(false);
  const [paperRollStarted, setPaperRollStarted] = useState(false);
  const [backgroundStage, setBackgroundStage] = useState(0);
  const [rollingBackgroundStage, setRollingBackgroundStage] = useState(0);
  const [musicAvailable, setMusicAvailable] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const audioRef = useRef(null);
  const paperRollTimerRef = useRef(null);
  const invitationSlideRef = useRef(null);

  const startOpening = () => {
    setFirstPageRevealStarted(true);

    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = mediaSettings.backgroundMusicStartSeconds;
    audio.play()
      .then(() => setMusicPlaying(true))
      .catch(() => setMusicPlaying(false));
  };

  const finishIntro = () => {
    setOpened(true);
  };

  const slides = [
    <IslamicBlessingsPage key="blessings" />,
    <WeddingCeremonyPage key="ceremony" />,
    <EventSection key="haldi" event={weddingDetails.events.haldi} />,
    <EventSection key="baraat" event={weddingDetails.events.baraat} />,
    <Footer key="closing" />
  ];

  const goToSlide = useCallback((index) => {
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    const nextBackgroundStage = nextIndex >= BARAAT_SLIDE_INDEX
      ? 2
      : nextIndex >= HALDI_SLIDE_INDEX
        ? 1
        : 0;

    window.clearTimeout(paperRollTimerRef.current);

    if (nextIndex > activeSlide && nextBackgroundStage === 1 && backgroundStage === 0) {
      invitationSlideRef.current?.classList.remove('invitation-slide--folding');
      void invitationSlideRef.current?.offsetWidth;
      invitationSlideRef.current?.classList.add('invitation-slide--folding');
      setRollingBackgroundStage(backgroundStage);
      setPaperRollStarted(true);
      setBackgroundStage(nextBackgroundStage);
      paperRollTimerRef.current = window.setTimeout(() => {
        setActiveSlide(nextIndex);
        setPaperRollStarted(false);
      }, PAPER_ROLL_DURATION_SECONDS * 1000);
      return;
    }

    setPaperRollStarted(false);
    setRollingBackgroundStage(backgroundStage);
    setBackgroundStage((currentStage) => Math.max(currentStage, nextBackgroundStage));
    setActiveSlide(nextIndex);
  }, [activeSlide, backgroundStage]);

  useEffect(() => () => window.clearTimeout(paperRollTimerRef.current), []);

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
      goToSlide(activeSlide + 1);
    }, advanceDelaySeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [opened, autoAdvance, activeSlide, slides.length, goToSlide]);

  const updateMusicPlaying = (playing) => setMusicPlaying(playing);
  const pageTransitionProps = backgroundStage >= 2
    ? {
        initial: false,
        animate: { opacity: 1, filter: 'none', scale: 1 },
        exit: { opacity: 1, filter: 'none', scale: 1 },
        transition: { duration: 0 }
      }
    : createPageTransition({
        duration: activeSlide === 0 && firstPageRevealStarted
          ? 4
          : activeSlide === 0 && opened
            ? 1
            : invitationMotionSettings.transitionSeconds,
        visible: activeSlide !== 0 || firstPageRevealStarted,
        useBrightness: activeSlide !== 0,
        ease: activeSlide === 0 && firstPageRevealStarted
          ? [0.42, 0, 0.58, 1]
          : 'easeInOut'
      });

  return (
    <main className={`wedding-app${backgroundStage === 1 ? ' wedding-app--haldi' : ''}${backgroundStage >= 2 ? ' wedding-app--nikah' : ''}`}>
      <audio
        ref={audioRef}
        src={mediaSettings.backgroundMusicUrl}
        loop
        preload="auto"
        onCanPlayThrough={() => setMusicAvailable(true)}
        onError={() => setMusicAvailable(false)}
      />
      {!opened && (
        <DoorIntro
          onStart={startOpening}
          onComplete={finishIntro}
        />
      )}
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
                ref={invitationSlideRef}
                className={`invitation-slide invitation-slide--background-${paperRollStarted ? rollingBackgroundStage : backgroundStage}${activeSlide === 0 ? ' invitation-slide--first-reveal' : ''}${paperRollStarted ? ' invitation-slide--folding' : ''}`}
                {...pageTransitionProps}
              >
                {slides[activeSlide]}
              </motion.div>
            </AnimatePresence>
            {paperRollStarted && (
              <div className="paper-roll-edge" aria-hidden="true" />
            )}
          </div>
          {/* {opened && (
            <nav className="slide-controls" aria-label="Invitation sections">
              <button type="button" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0} aria-label="Previous section">‹</button>
              <span>{activeSlide + 1} / {slides.length}</span>
              <button
                type="button"
                onClick={() => setAutoAdvance((playing) => !playing)}
                aria-label={autoAdvance ? 'Pause automatic slides' : 'Resume automatic slides'}
              >
                {autoAdvance ? 'Ⅱ' : '▶'}
              </button>
              <button type="button" onClick={() => goToSlide(activeSlide + 1)} disabled={activeSlide === slides.length - 1} aria-label="Next section">›</button>
            </nav>
          )} */}
      </div>
    </main>
  );
}
