export function FloralDivider() {
  return (
    <div className="wedding-divider" aria-hidden="true">
      <span className="divider-line" />
      <svg className="divider-flower" viewBox="0 0 44 44" role="presentation">
        <path d="M22 3 C26 11 26 11 22 18 C18 11 18 11 22 3Z" />
        <path d="M41 22 C33 26 33 26 26 22 C33 18 33 18 41 22Z" />
        <path d="M22 41 C18 33 18 33 22 26 C26 33 26 33 22 41Z" />
        <path d="M3 22 C11 18 11 18 18 22 C11 26 11 26 3 22Z" />
        <path d="M22 14 L30 22 L22 30 L14 22 Z" className="divider-diamond" />
        <circle cx="22" cy="22" r="2.1" className="divider-center" />
      </svg>
      <span className="divider-line" />
    </div>
  );
}

export function DividerWithContent({ children, className = '' }) {
  return (
    <div className={`wedding-divider wedding-divider--content ${className}`.trim()}>
      <span className="divider-line" aria-hidden="true" />
      <div className="wedding-divider__content">{children}</div>
      <span className="divider-line" aria-hidden="true" />
    </div>
  );
}

export function QuranVerse({ arabic, reference, translation }) {
  return (
    <section className="quran-verse">
      <p className="verse-arabic" lang="ar" dir="rtl">{arabic}</p>
      <p className="verse-reference">{reference}</p>
      <p className="verse-translation">{translation}</p>
    </section>
  );
}