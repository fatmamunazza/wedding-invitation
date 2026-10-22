import { invitationCopy } from '../../data/invitationCopy.js';
import { weddingDetails } from '../../data/weddingDetails.js';
import ClosingFireworks from '../animations/ClosingFireworks.jsx';
import {QuranVerse, FloralDivider} from '../shared/utils.jsx';
import Firecracker from '../animations/FireCrackers.jsx';
import ColdSparkFountain from '../animations/ColdSparkFountain.jsx';
export default function Footer() {
  const { closing } = invitationCopy;

  return (
    <footer className="closing-section section-pad">
      <img
        className="closing-artwork"
        src="/assets/blessing.jpeg"
        alt="Bride and groom standing together"
      />
      <div className="closing-content-shell">
        <div className="closing-content-area">
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
        </div>
      </div>
      <ClosingFireworks />
      <Firecracker autoPlay={true} />
      <ColdSparkFountain x="5%" density={8} height={320} />
      <ColdSparkFountain x="90%" density={8} height={320} />

    </footer>
  );
}
