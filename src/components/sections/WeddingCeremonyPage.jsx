import { invitationCopy } from '../../data/invitationCopy.js';
import { weddingDetails } from '../../data/weddingDetails.js';
import { DividerWithContent } from '../shared/utils.jsx';

export default function WeddingCeremonyPage() {
  const { ceremony } = invitationCopy;

  return (
    <section className="wedding-ceremony-page" aria-label="Wedding ceremony invitation">
      <article className="ceremony-panel">
        <p className="ceremony-invitation-copy">{ceremony.invitationLines[0]}<br />{ceremony.invitationLines[1]}</p>
        <h1 className="ceremony-title">{ceremony.title}</h1>
         <DividerWithContent className="ceremony-divider">
          <p>OF</p>
        </DividerWithContent>
        <h2 className="ceremony-person-name">{weddingDetails.bride}</h2>
        <p className="ceremony-relation">{weddingDetails.ceremony.brideRelation}</p>
        <p className="ceremony-address">{weddingDetails.ceremony.brideLocation}</p>
        <DividerWithContent className="ceremony-divider2">
          <p>{ceremony.conjunction}</p>
        </DividerWithContent>
        <h2 className="ceremony-person-name">{weddingDetails.groom}</h2>
        <p className="ceremony-relation">{weddingDetails.ceremony.groomRelation}</p>
        <p className="ceremony-address">{weddingDetails.ceremony.groomLocation}</p>
      </article>
    </section>
  );
}