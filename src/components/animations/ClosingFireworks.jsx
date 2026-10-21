import { useEffect, useState } from 'react';

const SPARK_COUNT = 40;
const FIREWORK_SIDES = ['left', 'right'];
const VOLLEYS = ['upper', 'middle', 'lower'];

function createSparks(side) {
  return Array.from({ length: SPARK_COUNT }, (_, index) => ({
    id: index,
    x: (side === 'left' ? 1 : -1) * (70 + (index % 8) * 20),
    y: (index % 2 === 0 ? -1 : 1) * (24 + ((index * 17) % 118)),
    delay: `${(index % 8) * 32}ms`,
    size: `${3 + (index % 4)}px`
  }));
}

const SPARKS_BY_SIDE = Object.fromEntries(
  FIREWORK_SIDES.map((side) => [
    side,
    createSparks(side).map((spark) => ({
      ...spark,
      angle: `${Math.atan2(spark.y, spark.x) * (180 / Math.PI)}deg`
    }))
  ])
);

export default function ClosingFireworks() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setVisible(true), 7200);
    const hideTimer = window.setTimeout(() => setVisible(false), 10800);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="closing-fireworks" aria-hidden="true">
      {VOLLEYS.flatMap((volley, volleyIndex) => FIREWORK_SIDES.map((side, sideIndex) => (
        <div
          className={`closing-fireworks__burst closing-fireworks__burst--${side} closing-fireworks__burst--${volley}`}
          key={`${volley}-${side}`}
          style={{ '--burst-delay': `${volleyIndex * 430 + sideIndex * 160}ms` }}
        >
          {SPARKS_BY_SIDE[side].map((spark) => (
            <span
              className="closing-fireworks__spark"
              key={`${side}-${spark.id}`}
              style={{
                '--spark-x': spark.x,
                '--spark-y': spark.y,
                '--spark-angle': spark.angle,
                '--spark-delay': spark.delay,
                '--spark-size': spark.size
              }}
            />
          ))}
        </div>
      )))}
    </div>
  );
}
