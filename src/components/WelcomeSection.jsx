import { invitationCopy } from '../data/invitationCopy.js';

export default function WelcomeSection({ guestName }) {
  return (
    <div className="personal-welcome">
      <p className="personal-welcome__salutation">{invitationCopy.welcome.greeting}</p>
      <h1 className="personal-welcome__guest">{guestName}</h1>
    </div>
  );
}
