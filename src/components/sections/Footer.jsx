import { invitationCopy } from '../../data/invitationCopy.js';
import { weddingDetails } from '../../data/weddingDetails.js';
import {QuranVerse, FloralDivider} from '../shared/utils.jsx';
export default function Footer() {
  const { closing } = invitationCopy;

  return (
    <footer className="closing-section section-pad">
      <img
        className="closing-artwork"
        src="/assets/blessing.jpeg"
        alt="Bride and groom standing together"
      />
      <div className="closing-blessing-state">
        <div className="arabic-mark">{closing.arabic}</div>
        <QuranVerse
              arabic={closing.duaArabic}
              translation={closing.dua}
            />
        <FloralDivider />
        <QuranVerse
              arabic={closing.reminderArabic}
              translation={closing.reminder}
            />
      </div>
      <div className="closing-farewell-state">
        <div className="farewell-copy">
          <p className="farewell-names">{weddingDetails.bride}</p>
          <p className="farewell-names">&amp;</p>
          <p className="farewell-names">{weddingDetails.groom} ({weddingDetails.groomNickname})</p>
          <p className="farewell-blessing">{closing.farewellBlessing}</p>
        </div>
        <div className="farewell-signoff">
          <p className="closing-farewell">{closing.farewell}</p>
          <p className="farewell-message">{closing.farewellMessage}</p>
        </div>
      </div>
    </footer>
  );
}
