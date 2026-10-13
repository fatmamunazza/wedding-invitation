import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
const NIKAH_PETAL_SHOWER_DELAY_MS = 1000;
const NIKAH_PETAL_SHOWER_DURATION_MS = 4000;
const NIKAH_PETAL_COUNT = 100;

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
  const [showNikahPetals, setShowNikahPetals] = useState(false);
  const nikahPetals = useMemo(() => {
    if (!showNikahPetals) return [];

    return Array.from({ length: NIKAH_PETAL_COUNT }, (_, index) => {
      const side = Math.floor(Math.random() * 3);
      const left = side === 0
        ? `${Math.random() * 110 - 5}%`
        : side === 1
          ? `${Math.random() * 4 - 8}%`
          : `${104 + Math.random() * 4}%`;
      const top = side === 0
        ? `${-12 + Math.random() * 10}%`
        : `${Math.random() * 88 - 4}%`;
      const inwardDrift = side === 1
        ? 12 + Math.random() * 38
        : side === 2
          ? -(12 + Math.random() * 38)
          : (Math.random() - 0.5) * 70;

      return {
        id: index,
        color: Math.random() < 0.5 ? 'white' : 'rose',
        left,
        top,
        delay: Math.random() * 450,
        drift: `${inwardDrift + (Math.random() - 0.5) * 20}vw`,
        drop: `${75 + Math.random() * 55}vh`,
        rotation: `${Math.random() * 1080 - 540}deg`,
        duration: `${2 + Math.random() * 1.3}s`
      };
    });
  }, [showNikahPetals]);
  const audioRef = useRef(null);
  const paperRollTimerRef = useRef(null);
  const nikahPetalsTimerRef = useRef(null);
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

    if (nextBackgroundStage === 2 && backgroundStage < 2) {
      window.clearTimeout(nikahPetalsTimerRef.current);
      nikahPetalsTimerRef.current = window.setTimeout(() => {
        setShowNikahPetals(true);
        nikahPetalsTimerRef.current = window.setTimeout(() => {
          setShowNikahPetals(false);
        }, NIKAH_PETAL_SHOWER_DURATION_MS);
      }, NIKAH_PETAL_SHOWER_DELAY_MS);
    }

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

  useEffect(() => () => {
    window.clearTimeout(paperRollTimerRef.current);
    window.clearTimeout(nikahPetalsTimerRef.current);
  }, []);

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
            <AnimatePresence mode={backgroundStage >= 2 ? 'sync' : 'wait'} initial={false}>
              <motion.div
                key={backgroundStage >= 2 ? 'nikah-scene' : activeSlide}
                ref={invitationSlideRef}
                className={`invitation-slide invitation-slide--background-${paperRollStarted ? rollingBackgroundStage : backgroundStage}${activeSlide === 0 ? ' invitation-slide--first-reveal' : ''}${paperRollStarted ? ' invitation-slide--folding' : ''}`}
                {...pageTransitionProps}
              >
                {backgroundStage >= 2 ? (
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={activeSlide}
                      className="invitation-content-transition"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: 'easeInOut' }}
                    >
                      {slides[activeSlide]}
                    </motion.div>
                  </AnimatePresence>
                ) : slides[activeSlide]}
              </motion.div>
            </AnimatePresence>
            {paperRollStarted && (
              <div className="paper-roll-edge" aria-hidden="true" />
            )}
            {showNikahPetals && (
              <div className="nikah-petal-shower" aria-hidden="true">
                {nikahPetals.map((petal) => (
                  <span
                    key={petal.id}
                    className={`nikah-petal-shower__petal nikah-petal-shower__petal--${petal.color}`}
                    style={{
                      left: petal.left,
                      top: petal.top,
                      animationDelay: `${petal.delay}ms`,
                      '--petal-drift': petal.drift,
                      '--petal-drop': petal.drop,
                      '--petal-rotation': petal.rotation,
                      '--petal-duration': petal.duration
                    }}
                  />
                ))}
              </div>
            )}
          </div>
      </div>
    </main>
  );
}
