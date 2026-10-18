// import React from "react";
// import "./WeddingVersePage.css";

// function FloralDivider() {
//   return (
//     <div className="wedding-divider" aria-hidden="true">
//       <span className="divider-line" />
//       <svg className="divider-flower" viewBox="0 0 44 44" role="presentation">
//         <path d="M22 3 C26 11 26 11 22 18 C18 11 18 11 22 3Z" />
//         <path d="M41 22 C33 26 33 26 26 22 C33 18 33 18 41 22Z" />
//         <path d="M22 41 C18 33 18 33 22 26 C26 33 26 33 22 41Z" />
//         <path d="M3 22 C11 18 11 18 18 22 C11 26 11 26 3 22Z" />
//         <path d="M22 14 L30 22 L22 30 L14 22 Z" className="divider-diamond" />
//         <circle cx="22" cy="22" r="2.1" className="divider-center" />
//       </svg>
//       <span className="divider-line" />
//     </div>
//   );
// }

// function QuranVerse({ arabic, reference, translation }) {
//   return (
//     <section className="quran-verse">
//       <p className="verse-arabic" lang="ar" dir="rtl">{arabic}</p>
//       <p className="verse-reference">{reference}</p>
//       <p className="verse-translation">{translation}</p>
//     </section>
//   );
// }

// export default function WeddingVersePage() {
//   return (
//     <main className="wedding-verse-page">
//       <div className="wedding-card">
//         <div className="wedding-frame" aria-hidden="true" />

//         <header className="bismillah-block">
//           <p className="bismillah" lang="ar" dir="rtl">
//             بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
//           </p>
//         </header>

//         <FloralDivider />

//         <div className="verses-block">
//           <QuranVerse
//             arabic="وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
//             reference="SURAH AR-RUM · 30:21"
//             translation="“And He placed between you affection and mercy.”"
//           />

//           <FloralDivider />

//           <QuranVerse
//             arabic="وَخَلَقْنَاكُمْ أَزْوَاجًا"
//             reference="SURAH AN-NABA · 78:8"
//             translation="“And We created you in pairs.”"
//           />
//         </div>

//         <FloralDivider />

//         <section className="blessing-text">
//           <p>In the Name of Allah the Most Beneficent,</p>
//           <p>the Most Merciful,</p>
//           <p>and with the Blessings of</p>
//           <p>14 Masoomeen (a.s.)</p>
//           <p>&amp; their Last Hujjat (a.t.f.s.)</p>
//         </section>

//         <div className="monogram" aria-label="Munazza and Tajdar monogram">
//           <span className="monogram-m">M</span>
//           <span className="monogram-t">T</span>
//           <svg className="monogram-sprig" viewBox="0 0 48 76" aria-hidden="true">
//             <path d="M7 69 C24 50 27 28 40 7" />
//             <path d="M16 55 C4 53 4 45 6 41 C15 43 18 48 16 55Z" />
//             <path d="M25 39 C14 36 14 29 17 25 C26 28 29 33 25 39Z" />
//             <path d="M32 24 C24 20 25 14 29 11 C36 15 37 19 32 24Z" />
//             <path d="M11 63 C21 62 24 67 23 72 C15 73 11 69 11 63Z" />
//           </svg>
//         </div>

//         <FloralDivider />
//         <p className="closing-line">With prayers for a life filled with love and mercy</p>
//       </div>
//     </main>
//   );
// }
