import { useCallback, useEffect, useRef, useState } from 'react';
import { getInvitationStageTransition } from '../animations/pageTransition.js';
import { replayCssAnimation } from '../animations/replayCssAnimation.js';
import InvitationSlide from '../components/animations/InvitationSlide.jsx';
import NikahPetalShower from '../components/animations/NikahPetalShower.jsx';
import PaperRollEdge from '../components/animations/PaperRollEdge.jsx';
import DoorIntro from '../components/intro/DoorIntro.jsx';
import JanuaryCalendarPage from '../components/sections/JanuaryCalendarPage.jsx';
import EventSection from '../components/sections/EventSection.jsx';
import Footer from '../components/sections/Footer.jsx';
import IslamicBlessingsPage from '../components/sections/IslamicBlessingsPage.jsx';
import WeddingCeremonyPage from '../components/sections/WeddingCeremonyPage.jsx';
import MusicControl from '../components/shared/MusicControl.jsx';
import { invitationMotionSettings } from '../data/animationSettings.js';
import { mediaSettings } from '../data/mediaSettings.js';
import { weddingDetails } from '../data/weddingDetails.js';

const BARAAT_SLIDE_INDEX = 4;
const HALDI_SLIDE_INDEX = 3;
const INVITATION_PAGE_KEYS = ['blessings', 'ceremony', 'calendar', 'haldi', 'baraat', 'closing'];
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
    <JanuaryCalendarPage key="calendar" />,
    <EventSection key="haldi" event={weddingDetails.events.haldi} />,
    <EventSection key="baraat" event={weddingDetails.events.baraat} />,
    <Footer key="closing" />
  ];
  const activePageSettings = invitationMotionSettings.pages[INVITATION_PAGE_KEYS[activeSlide]];

  const goToSlide = useCallback((index) => {
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    const nextBackgroundStage = nextIndex >= BARAAT_SLIDE_INDEX
      ? 2
      : nextIndex >= HALDI_SLIDE_INDEX
        ? 1
        : 0;

    window.clearTimeout(paperRollTimerRef.current);

    if (nextIndex > activeSlide && nextBackgroundStage === 1 && backgroundStage === 0) {
      replayCssAnimation(invitationSlideRef.current, 'animation--page-roll');
      setRollingBackgroundStage(backgroundStage);
      setPaperRollStarted(true);
      setBackgroundStage(nextBackgroundStage);
      paperRollTimerRef.current = window.setTimeout(() => {
        setActiveSlide(nextIndex);
        setPaperRollStarted(false);
      }, invitationMotionSettings.pages.haldi.transitionSeconds * 1000);
      return;
    }

    setPaperRollStarted(false);
    setRollingBackgroundStage(backgroundStage);
    setBackgroundStage((currentStage) => Math.max(currentStage, nextBackgroundStage));
    setActiveSlide(nextIndex);
  }, [activeSlide, backgroundStage]);

  useEffect(() => () => {
    window.clearTimeout(paperRollTimerRef.current);
  }, []);

  useEffect(() => {
    if (!opened || !autoAdvance) return;
    if (activeSlide >= slides.length - 1) {
      setAutoAdvance(false);
      return;
    }

    const timer = window.setTimeout(() => {
      goToSlide(activeSlide + 1);
    }, activePageSettings.autoAdvanceSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [opened, autoAdvance, activeSlide, activePageSettings.autoAdvanceSeconds, slides.length, goToSlide]);

  const updateMusicPlaying = (playing) => setMusicPlaying(playing);
  const pageTransitionProps = getInvitationStageTransition({
    activePageSettings,
    activeSlide,
    backgroundStage,
    firstPageRevealStarted,
    opened
  });
  const sceneClassName = backgroundStage === 1
    ? ' wedding-app--haldi'
    : backgroundStage >= 2
      ? ' wedding-app--nikah'
      : '';

  return (
    <main className={`wedding-app${sceneClassName}`}>
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
          onPlayingChange={setMusicPlaying}
        />
        <div className="invitation-stage">
          <InvitationSlide
            activeSlide={activeSlide}
            backgroundStage={backgroundStage}
            contentTransitionDuration={activePageSettings.transitionSeconds}
            paperRollDuration={invitationMotionSettings.pages.haldi.transitionSeconds}
            paperRollStarted={paperRollStarted}
            rollingBackgroundStage={rollingBackgroundStage}
            slideRef={invitationSlideRef}
            transitionProps={pageTransitionProps}
          >
            {slides[activeSlide]}
          </InvitationSlide>
          {paperRollStarted && (
            <PaperRollEdge durationSeconds={invitationMotionSettings.pages.haldi.transitionSeconds} />
          )}
          <NikahPetalShower active={backgroundStage >= 2} />
        </div>
      </div>
    </main>
  );
}
