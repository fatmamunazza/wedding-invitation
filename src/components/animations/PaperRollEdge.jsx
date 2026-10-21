export default function PaperRollEdge({ durationSeconds }) {
  return (
    <div
      className="paper-roll-edge"
      style={{ '--paper-roll-duration': `${durationSeconds}s` }}
      aria-hidden="true"
    />
  );
}
