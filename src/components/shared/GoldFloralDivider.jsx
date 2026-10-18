export default function GoldFloralDivider({ color = '#b68a42', className = '' }) {
  return (
    <div
      className={`gold-floral-divider ${className}`.trim()}
      role="img"
      aria-label="Floral wedding divider"
      style={{ backgroundColor: color }}
    />
  );
}