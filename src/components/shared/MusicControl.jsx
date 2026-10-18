export default function MusicControl({ audio, available, playing, onPlayingChange }) {
  if (!available) return null;

  const toggle = async () => {
    if (!audio) return;
    if (playing) {
      audio.pause();
      onPlayingChange(false);
      return;
    }

    try {
      await audio.play();
      onPlayingChange(true);
    } catch {
      onPlayingChange(false);
    }
  };

  return (
    <button
      className={`music-control${playing ? ' music-control--playing' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <span aria-hidden="true">{playing ? 'Ⅱ' : '♪'}</span>
    </button>
  );
}
