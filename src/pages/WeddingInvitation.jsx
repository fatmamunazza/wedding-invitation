import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { resolveGuest } from '../services/guestResolver.js';

const EVENT_ORDER = ['haldi', 'baraat'];
export default function WeddingInvitation() {
  const { guestId } = useParams();
  const guest = useMemo(() => resolveGuest(guestId), [guestId]);
  const guestEvents = useMemo(() => guest
    ? EVENT_ORDER.filter((eventId) => guest.events.includes(eventId))
    : EVENT_ORDER, [guest]);
  const invitationPages = useMemo(() => [
    { key: 'blessings', content: <IslamicBlessingsPage /> },
    { key: 'ceremony', content: <WeddingCeremonyPage /> },
    { key: 'calendar', content: <JanuaryCalendarPage events={guestEvents.map((eventId) => weddingDetails.events[eventId])} /> },
    ...guestEvents.map((eventId) => ({
      key: eventId,
      content: <EventSection event={weddingDetails.events[eventId]} />
    })),
    { key: 'closing', content: <Footer /> }
  ], [guestEvents]);
  const pageKeys = useMemo(() => invitationPages.map(({ key }) => key), [invitationPages]);
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

  const activePageKey = pageKeys[activeSlide];
  const activePageSettings = invitationMotionSettings.pages[activePageKey];

  const goToSlide = useCallback((index) => {
    const nextIndex = Math.max(0, Math.min(index, invitationPages.length - 1));
    const nextPageKey = pageKeys[nextIndex];
    const nextBackgroundStage = nextPageKey === 'baraat' || nextPageKey === 'closing'
      ? 2
      : nextPageKey === 'haldi'
        ? 1
        : 0;

    window.clearTimeout(paperRollTimerRef.current);

    if (nextIndex > activeSlide && nextPageKey === 'haldi' && backgroundStage === 0) {
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
  }, [activeSlide, backgroundStage, guestEvents, invitationPages.length, pageKeys]);

  useEffect(() => () => {
    window.clearTimeout(paperRollTimerRef.current);
  }, []);

  useEffect(() => {
    if (!opened || !autoAdvance) return;
    if (activeSlide >= invitationPages.length - 1) {
      setAutoAdvance(false);
      return;
    }

    const timer = window.setTimeout(() => {
      goToSlide(activeSlide + 1);
    }, activePageSettings.autoAdvanceSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [opened, autoAdvance, activeSlide, activePageSettings.autoAdvanceSeconds, invitationPages.length, goToSlide]);

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
            {invitationPages[activeSlide].content}
          </InvitationSlide>
          {paperRollStarted && (
            <PaperRollEdge durationSeconds={invitationMotionSettings.pages.haldi.transitionSeconds} />
          )}
          <NikahPetalShower
            active={backgroundStage >= 2 && (
              activePageKey === 'baraat'
              || (activePageKey === 'closing' && guestEvents.includes('baraat'))
            )}
          />
        </div>
      </div>
    </main>
  );
}
