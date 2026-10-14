import { invitationCopy } from '../../data/invitationCopy.js';
import {QuranVerse, FloralDivider} from '../shared/utils.jsx';
export default function IslamicBlessingsPage() {
  const { blessings } = invitationCopy;

  return (
    <section className="blessings-page" aria-label="Islamic blessings">
      <div className="blessings-panel">
        <p className="blessings-arabic" lang="ar" dir="rtl">{blessings.arabic}</p>
        <div className="verses-block">
        
          <QuranVerse
            arabic="وَخَلَقْنَاكُمْ أَزْوَاجًا"
            reference="SURAH AN-NABA · 78:8"
            translation="“And We created you in pairs.”"
          />
          <FloralDivider />

        </div>
        <div className="blessings-copy">
          {blessings.lines.map((line, index) => (
            <p>
              {line}
            </p>
          ))}
           
        </div>
        <div className="blessings-footer">
          <img
            className="logo"
            src="/assets/logo.png"
          />
          <FloralDivider />
          <p className="closing-line">With prayers for a life filled with love and mercy</p>
           
        </div>
        
      </div>
    </section>
  );
}