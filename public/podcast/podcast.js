const onoff = document.querySelector('.onoff');
const woofer = document.querySelector('.woofer-animated');
    const audio = new Audio('/assets/audio/KI-Podcast-Christina.mp3');

const ctx = new AudioContext();
const src = ctx.createMediaElementSource(audio);
const analyser = ctx.createAnalyser();
const data = new Uint8Array(analyser.frequencyBinCount);

src.connect(analyser);
analyser.connect(ctx.destination);

let isPlaying = false;

function updateButtonStatus() {

  onoff.classList.toggle('is-play', isPlaying);
  onoff.setAttribute('aria-pressed', String(isPlaying));
  onoff.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  woofer.classList.toggle('stopped', !isPlaying);
}

async function togglePlayback() {
  try {
    if (ctx.state !== 'running') {
      await ctx.resume();
    }

    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    } else {
      await audio.play();
      isPlaying = true;
    }
  } catch (e) {
    console.error('Audio-Start fehlgeschlagen:', e);
  }

  updateButtonStatus();
}

onoff.addEventListener('click', togglePlayback);

// function animate() {
//   analyser.getByteFrequencyData(data);
//   const volume = data.reduce((a, b) => a + b, 0) / data.length;
//   woofer.style.transform = `scale(${1 + volume / 200})`;
//   requestAnimationFrame(animate);
// }
function animate() {
  analyser.getByteFrequencyData(data);

  const total = data.reduce((sum, value) => sum + value, 0);
  const average = total / data.length;

  // Lautstärke in einen brauchbaren Bereich bringen
  const normalized = Math.min(average / 140, 1);

  // etwas glätten, damit es nicht zu nervös wirkt
  const scale = 1 + normalized * 0.18;
  const glow = normalized * 24;
  const brightness = 1 + normalized * 0.25;

  if (isPlaying) {
    woofer.style.transform = `scale(${scale})`;
    woofer.style.filter = `brightness(${brightness}) drop-shadow(0 0 ${glow}px rgba(9, 9, 10, 0.35))`;
  } else {
    woofer.style.transform = 'scale(1)';
    woofer.style.filter = 'none';
  }

  requestAnimationFrame(animate);
}
updateButtonStatus();
animate();

audio.addEventListener('ended', () => {
  isPlaying = false;
  audio.currentTime = 0;
  updateButtonStatus();
  woofer.style.transform = 'scale(1)';
});