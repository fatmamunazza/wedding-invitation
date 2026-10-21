import { AnimatePresence, motion } from 'framer-motion';

export default function InvitationSlide({
  activeSlide,
  backgroundStage,
  children,
  contentTransitionDuration,
  paperRollDuration,
  paperRollStarted,
  rollingBackgroundStage,
  slideRef,
  transitionProps
}) {
  const isNikahScene = backgroundStage >= 2;
  const displayedBackgroundStage = paperRollStarted
    ? rollingBackgroundStage
    : backgroundStage;
  const className = [
    'invitation-slide',
    `invitation-slide--background-${displayedBackgroundStage}`,
    activeSlide === 0 && 'invitation-slide--first-reveal',
    paperRollStarted && 'invitation-slide--folding animation--page-roll'
  ].filter(Boolean).join(' ');

  return (
    <AnimatePresence mode={isNikahScene ? 'sync' : 'wait'} initial={false}>
      <motion.div
        key={isNikahScene ? 'nikah-scene' : activeSlide}
        ref={slideRef}
        className={className}
        style={{ '--paper-roll-duration': `${paperRollDuration}s` }}
        {...transitionProps}
      >
        {isNikahScene ? (
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={activeSlide}
              className="invitation-content-transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: contentTransitionDuration, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        ) : children}
      </motion.div>
    </AnimatePresence>
  );
}
