import { invitationCopy } from '../../data/invitationCopy.js';
import {QuranVerse, FloralDivider} from '../shared/utils.jsx';
import FancyDivider from '../shared/FancyDivider.jsx';
import GoldFloralDivider from '../shared/GoldFloralDivider.jsx';
export default function IslamicBlessingsPage() {
  const { blessings } = invitationCopy;

  return (
    <section className="blessings-page" aria-label="Islamic blessings">
      <div className="blessings-panel">
        <div className="blessings-main">
          
          <div className="verses-block">
            <p className="blessings-arabic" lang="ar" dir="rtl">{blessings.arabic}</p>
            <QuranVerse
              arabic="وَخَلَقْنَاكُمْ أَزْوَاجًا"
              reference="SURAH AN-NABA · 78:8"
              translation="“And We created you in pairs.”"
            />
            <FloralDivider />
            <div className="blessings-copy">
              {blessings.lines.map((line, index) => (
                <p>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="blessings-footer">
          <p className="closing-line">With prayers for a life filled with love and mercy</p>
          <GoldFloralDivider color="#8c332f" />
        </div>
      </div>
    </section>
  );
}