import { invitationMotionSettings } from '../data/animationSettings.js';

export function createPageTransition({
  duration = invitationMotionSettings.transitionSeconds,
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
