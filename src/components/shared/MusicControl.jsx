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
    <button className="music-control" onClick={toggle} aria-label={playing ? 'Pause music' : 'Play music'}>
      <span className={playing ? 'is-playing' : ''}>{playing ? '◼' : '♪'}</span>
    </button>
  );
}
