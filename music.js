// Після вибору треку: заповніть audioSrc файлом або spotifyUrl посиланням.
window.MUSIC = {title: 'Мій саундтрек', audioSrc: '', spotifyUrl: 'https://open.spotify.com/track/6DhVYzWHyu51m9xEGRAqyU?si=7e2b6819fa5d4de5'};
document.addEventListener('DOMContentLoaded', () => {
  const music = window.MUSIC;
  const title = document.getElementById('music-title');
  const hint = document.getElementById('music-hint');
  if (music.audioSrc) {
    const player = document.getElementById('personal-audio');
    document.getElementById('spotify-player').hidden = true;
    player.src = music.audioSrc;
    player.hidden = false;
    title.textContent = music.title || 'Мій саундтрек';
    hint.textContent = 'Натисни play — відчуй мій настрій.';
    player.addEventListener('error', () => { hint.textContent = 'Не вдалося завантажити трек.'; });
  } else if (music.spotifyUrl) {
    const match = music.spotifyUrl.match(/^https:\/\/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|playlist|album)\/([a-zA-Z0-9]+)(?:\?.*)?$/);
    if (!match) return;
    const frame = document.createElement('iframe');
    frame.src = 'https://open.spotify.com/embed/' + match[1] + '/' + match[2] + '?theme=0';
    frame.title = music.title || 'Мій саундтрек у Spotify';
    frame.height = '152'; frame.width = '100%';
    frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    frame.loading = 'eager';
    const host = document.getElementById('spotify-player');
    if (!host.querySelector('iframe')) host.append(frame);
    host.hidden = false;
    title.textContent = music.title || 'Мій саундтрек';
    hint.hidden = true;
  }
});
