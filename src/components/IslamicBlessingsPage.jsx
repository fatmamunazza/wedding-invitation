import { invitationCopy } from '../data/invitationCopy.js';

export default function IslamicBlessingsPage() {
  const { blessings } = invitationCopy;

  return (
    <section className="blessings-page" aria-label="Islamic blessings">
      <div className="blessings-panel">
        <p className="blessings-arabic" lang="ar" dir="rtl">{blessings.arabic}</p>
        <div className="blessings-copy">
          {blessings.lines.map((line, index) => (
            <p
              className={index === 2 ? 'blessings-copy__second-stanza' : undefined}
              key={line}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}