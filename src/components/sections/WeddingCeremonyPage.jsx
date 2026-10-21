import { invitationCopy } from '../../data/invitationCopy.js';
import { weddingDetails } from '../../data/weddingDetails.js';
import { DividerWithContent } from '../shared/utils.jsx';
import GoldFloralDivider from '../shared/GoldFloralDivider.jsx';

export default function WeddingCeremonyPage() {
  const { ceremony } = invitationCopy;

  return (
    <section className="wedding-ceremony-page" aria-label="Wedding ceremony invitation">
      <div className="ceremony-panel">
        <div className="ceremony-main">
          <div>
            <p className="ceremony-invitation-copy">{ceremony.invitationLines[0]}<br />{ceremony.invitationLines[1]}</p>
            <h1 className="ceremony-title">{ceremony.title}</h1>
          </div>    
          <DividerWithContent className="ceremony-divider">
            <span>OF</span>
          </DividerWithContent> 
          <div>
            <h2 className="ceremony-person-name">{weddingDetails.bride}</h2>
            <span className="ceremony-relation">{weddingDetails.ceremony.brideRelation}</span><br/>
            <span className="ceremony-address">{weddingDetails.ceremony.brideLocation}</span>
          </div>
          <DividerWithContent className="ceremony-divider2">
            <span>{ceremony.conjunction}</span>
          </DividerWithContent>
          <div>
            <h2 className="ceremony-person-name">{weddingDetails.groom}</h2>
            <span className="ceremony-relation">{weddingDetails.ceremony.groomRelation}</span><br/>
            <span className="ceremony-address">{weddingDetails.ceremony.groomLocation}</span>
          </div>
        </div>
        <GoldFloralDivider color="#8c332f" />
      </div>
    </section>
  );
}