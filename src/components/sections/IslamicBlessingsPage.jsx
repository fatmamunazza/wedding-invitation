import { invitationCopy } from '../../data/invitationCopy.js';

export default function IslamicBlessingsPage() {
  const { blessings } = invitationCopy;

  return (
    <section className="blessings-page" aria-label="Islamic blessings">
      <div className="blessings-panel">
        <p className="blessings-arabic" lang="ar" dir="rtl">{blessings.arabic}</p>
        <div className="blessings-copy">
          {blessings.lines.map((line, index) => (
            <p>
              {line}
            </p>
          ))}
           
        </div>
        <img
            className="logo"
            src="/assets/logo.png"
          />
      </div>
    </section>
  );
}