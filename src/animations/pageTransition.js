export function createPageTransition({
  duration,
  visible = true,
  useBrightness = true,
  ease = 'easeInOut',
  exit = { opacity: 0, filter: 'blur(8px)', scale: 0.985 }
} = {}) {
  const initial = { opacity: 0 };
  const animate = { opacity: visible ? 1 : 0 };

  if (useBrightness) {
    initial.filter = 'brightness(.8)';
    animate.filter = visible ? 'brightness(1)' : 'brightness(.8)';
  }

  return {
    initial,
    animate,
    exit,
    transition: { duration, ease }
  };
}

export function getInvitationStageTransition({
  activePageSettings,
  activeSlide,
  backgroundStage,
  firstPageRevealStarted,
  opened
}) {
  if (backgroundStage >= 2) {
    return {
      initial: false,
      animate: { opacity: 1, filter: 'none', scale: 1 },
      exit: { opacity: 1, filter: 'none', scale: 1 },
      transition: { duration: 0 }
    };
  }

  const duration = activeSlide === 0 && firstPageRevealStarted
    ? activePageSettings.introRevealSeconds
    : activeSlide === 0 && opened
      ? activePageSettings.openedRevealSeconds
      : activePageSettings.transitionSeconds;

  return createPageTransition({
    duration,
    visible: activeSlide !== 0 || firstPageRevealStarted,
    useBrightness: activeSlide !== 0,
    ease: activeSlide === 0 && firstPageRevealStarted
      ? [0.42, 0, 0.58, 1]
      : 'easeInOut'
  });
}
