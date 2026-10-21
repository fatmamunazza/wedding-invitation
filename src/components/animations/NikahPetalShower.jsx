import { useEffect, useMemo, useState } from 'react';
import '../../animations/invitationAnimations.css';

const PETAL_COUNT = 100;

function createPetals() {
  return Array.from({ length: PETAL_COUNT }, (_, id) => {
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
      id,
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
}

export default function NikahPetalShower({
  active,
  delayMs = 1000,
  durationMs = 4000
}) {
  const [visible, setVisible] = useState(false);
  const petals = useMemo(() => (visible ? createPetals() : []), [visible]);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return undefined;
    }

    let hideTimer;
    const showTimer = window.setTimeout(() => {
      setVisible(true);
      hideTimer = window.setTimeout(() => setVisible(false), durationMs);
    }, delayMs);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [active, delayMs, durationMs]);

  if (!visible) return null;

  return (
    <div className="nikah-petal-shower" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className={`nikah-petal-shower__petal nikah-petal-shower__petal--${petal.color} animation--petal-fall`}
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
  );
}
