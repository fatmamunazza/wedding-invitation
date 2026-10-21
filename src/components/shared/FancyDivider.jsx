import React from 'react';

// FancyDivider.jsx
export default function FancyDivider({ 
  letters = "mt", 
  color = "#C5A059", // gold color
  width = 320,
  lineWidth = 2 
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '20px 0' }}>
      <svg 
        width={width} 
        viewBox="0 0 400 220" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C765" />
            <stop offset="25%" stopColor="#B78D3E" />
            <stop offset="50%" stopColor="#F5DE9A" />
            <stop offset="75%" stopColor="#B78D3E" />
            <stop offset="100%" stopColor="#D4A94E" />
          </linearGradient>
        </defs>

        {/* Left long line */}
        <path 
          d="M 5 110 Q 40 95 90 108 T 150 110" 
          stroke="url(#goldGradient)" 
          strokeWidth={lineWidth} 
          strokeLinecap="round"
          fill="none"
        />
        {/* Right long line */}
        <path 
          d="M 250 110 Q 310 108 360 105 T 395 110" 
          stroke="url(#goldGradient)" 
          strokeWidth={lineWidth} 
          strokeLinecap="round"
          fill="none"
        />

        {/* Top arc of wreath */}
        <path 
          d="M 135 65 Q 200 25 265 75" 
          stroke="url(#goldGradient)" 
          strokeWidth="1.5" 
          fill="none"
        />
        {/* Bottom arc of wreath */}
        <path 
          d="M 135 155 Q 200 195 265 145" 
          stroke="url(#goldGradient)" 
          strokeWidth="1.5" 
          fill="none"
        />

        {/* Top left leaves */}
        <g fill="url(#goldGradient)">
          <ellipse cx="125" cy="70" rx="14" ry="6" transform="rotate(-40 125 70)" />
          <ellipse cx="135" cy="55" rx="12" ry="5" transform="rotate(-25 135 55)" />
          <circle cx="145" cy="50" r="2" />
          <circle cx="152" cy="45" r="1.5" />
        </g>

        {/* Bottom right leaves */}
        <g fill="url(#goldGradient)">
          <ellipse cx="275" cy="145" rx="14" ry="6" transform="rotate(-40 275 145)" />
          <ellipse cx="285" cy="155" rx="12" ry="5" transform="rotate(-20 285 155)" />
          <circle cx="255" cy="170" r="2" />
          <circle cx="262" cy="178" r="1.5" />
        </g>

        {/* Small dots / buds */}
        <g fill="url(#goldGradient)">
          <circle cx="145" cy="58" r="2.5" />
          <circle cx="165" cy="42" r="2" />
          <circle cx="230" cy="40" r="2" />
          <circle cx="240" cy="45" r="2" />
          <circle cx="142" cy="175" r="2" />
          <circle cx="230" cy="175" r="2" />
        </g>

        {/* mt text - handwritten style */}
        <text
          x="200"
          y="125"
          textAnchor="middle"
          fontFamily="var(--font-monogram)"
          fontSize="var(--font-size-fancy-divider)"
          fill="url(#goldGradient)"
          style={{ fontStyle: 'italic', fontWeight: 400 }}
        >
          {letters}
        </text>
      </svg>
    </div>
  );
}