import React, { useState, useEffect } from 'react';
import './Invitation.css';
import bgImage from '../../public/assets/desktop-background.png'; // <-- your background image

const lines = [
  { text: "In the name of Allah, the Most Beneficent, the Most Merciful", className: "line-top" },
  { text: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ", className: "line-arabic" },
  { text: "Bismillah ir Rahman ir Raheem", className: "line-bismillah-en" },
  { text: "We Request the pleasure of your company", className: "line-body" },
  { text: "at the Wedding Ceremony", className: "line-heading" },
  { text: "OF", className: "line-divider" },
  { text: "Munazza Fatma", className: "line-name" },
  { text: "(D/O Mr. Akbar Ali)", className: "line-detail" },
  { text: "Pandriba Lane, Patna, Bihar", className: "line-detail" },
  { text: "WITH", className: "line-divider" },
  { text: "Tajdar Abbas Rizvi", className: "line-name" },
  { text: "(S/O Late Mr. Zuhair Qain Rizvi)", className: "line-detail" },
  { text: "Qazipara, Bijnor, UP", className: "line-detail" },
  { text: "BarakAllahu Lakuma", className: "line-bottom" },
];

export default function Invitation() {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    lines.forEach((line, lineIndex) => {
      const lineDelay = lineIndex * 800; // each line starts after 0.8s
      setTimeout(() => {
        setVisibleLines(prev => [...prev, { ...line, chars: [] }]);
        // animate letters one by one
        line.text.split('').forEach((char, charIndex) => {
          setTimeout(() => {
            setVisibleLines(prev => {
              const copy = [...prev];
              const target = copy.find((_, i) => i === lineIndex);
              if (target) target.chars.push(char);
              return [...copy];
            });
          }, charIndex * 40); // 40ms per letter
        });
      }, lineDelay);
    });
  }, []);

  return (
    <div className="invitation-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="invitation-overlay">
        {visibleLines.map((line, i) => (
          <div key={i} className={`animated-line ${line.className}`}>
            {line.chars.map((c, j) => (
              <span key={j} className="char">{c === ' ' ? '\u00A0' : c}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}