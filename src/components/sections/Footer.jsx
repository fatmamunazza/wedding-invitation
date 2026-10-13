import { invitationCopy } from '../../data/invitationCopy.js';
import { weddingDetails } from '../../data/weddingDetails.js';

export default function Footer() {
  const { closing } = invitationCopy;

  return (
    <footer className="closing-section section-pad">
      <img
        className="closing-artwork"
        src="/assets/blessing.png"
        alt="Bride and groom standing together"
      />
      <div className="closing-blessing-state">
        <div className="arabic-mark">{closing.arabic}</div>
        <p className="duas">{closing.dua}</p>
        <div className="ornament-rule"><span>✦</span></div>
        <p className="duas">{closing.reminder}</p>
      </div>
      <div className="closing-farewell-state">
        <div className="farewell-copy">
          <p className="farewell-names">{weddingDetails.bride} &amp; {weddingDetails.groom} ({weddingDetails.groomNickname})</p>
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
