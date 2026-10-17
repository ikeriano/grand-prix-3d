// Audio: música de verano SINTETIZADA (PROVISIONAL, hasta tener la cabecera original del vídeo de Iker), efectos y voces Piper.
export const A = { ctx: null, master: null, music: null, musicVol: 0.7, voiceOn: true, cur: null };
function ctx() { if (!A.ctx) { A.ctx = new (window.AudioContext || window.webkitAudioContext)(); A.master = A.ctx.createGain(); A.master.connect(A.ctx.destination); } if (A.ctx.state === 'suspended') A.ctx.resume(); return A.ctx; }
const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12);
function tone(t, f, d, type = 'square', v = .12, dest) { const c = A.ctx, o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g); g.connect(dest || A.master); o.start(t); o.stop(t + d + .02); }
// TEMA PROVISIONAL: melodía original alegre (Do mayor, 132 bpm). NO es la cabecera del programa.
const MEL = [72, 76, 79, 76, 77, 81, 79, 0, 76, 79, 84, 83, 81, 79, 77, 76, 74, 77, 81, 79, 76, 72, 74, 76, 77, 76, 74, 71, 72, 0, 0, 0];
const BASS = [48, 48, 53, 53, 55, 55, 48, 48];
export function playMusic(on = true) {
  stopMusic(); if (!on || A.musicVol <= 0) return; const c = ctx(); const g = c.createGain(); g.gain.value = A.musicVol * .5; g.connect(A.master);
  const beat = 60 / 132 / 2; let step = 0, next = c.currentTime + .05;
  const id = setInterval(() => { while (next < c.currentTime + .3) { const m = MEL[step % MEL.length]; if (m) tone(next, NOTE(m), beat * .9, 'square', .07, g);
      if (step % 2 === 0) tone(next, NOTE(BASS[(step >> 2) % BASS.length]), beat * 1.8, 'triangle', .18, g);
      if (step % 4 === 2) noise(next, .05, .08, g); next += beat; step++; } }, 80);
  A.music = { id, g };
}
export function stopMusic() { if (A.music) { clearInterval(A.music.id); try { A.music.g.disconnect(); } catch (e) {} A.music = null; } }
export function setMusicVol(v) { A.musicVol = v; if (A.music) A.music.g.gain.value = v * .5; }
function noise(t, d, v, dest) { const c = A.ctx, b = c.createBuffer(1, c.sampleRate * d, c.sampleRate), a = b.getChannelData(0); for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1; const s = c.createBufferSource(), g = c.createGain(); s.buffer = b; g.gain.value = v; s.connect(g); g.connect(dest || A.master); s.start(t); }
export function sfx(n) { try { const c = ctx(), t = c.currentTime;
  if (n === 'tap') tone(t, 880, .06, 'sine', .08);
  else if (n === 'win') [72, 76, 79, 84].forEach((m, i) => tone(t + i * .12, NOTE(m), .3, 'square', .1));
  else if (n === 'lose') [67, 63, 60].forEach((m, i) => tone(t + i * .18, NOTE(m), .35, 'sawtooth', .08));
  else if (n === 'whistle') { tone(t, 2400, .4, 'sine', .12); tone(t + .05, 2550, .35, 'sine', .08); }
  else if (n === 'bell') [0, .25, .5].forEach((d) => tone(t + d, 1320, .5, 'triangle', .14));
  else if (n === 'moo') { const o = c.createOscillator(), g = c.createGain(); o.type = 'sawtooth'; o.frequency.setValueAtTime(140, t); o.frequency.linearRampToValueAtTime(110, t + .9); g.gain.setValueAtTime(.15, t); g.gain.linearRampToValueAtTime(0, t + 1); o.connect(g); g.connect(A.master); o.start(t); o.stop(t + 1); }
  else if (n === 'fanfare') [60, 64, 67, 72, 67, 72].forEach((m, i) => tone(t + i * .14, NOTE(m), .25, 'square', .1));
} catch (e) {} }
// Voces: assets/voz/<clave>.mp3 (Piper). Si falta, solo subtítulo.
const sub = () => document.getElementById('sub');
export function say(key, text, who) {
  return new Promise((res) => {
    const s = sub(); s.classList.remove('hidden'); s.innerHTML = (who ? `<b>${who}:</b> ` : '') + text;
    const done = () => { s.classList.add('hidden'); res(); };
    const fallback = () => setTimeout(done, Math.max(1600, text.length * 55) / (window.__fast ? 8 : 1));
    if (!A.voiceOn || !key || window.__fast) return fallback();
    const a = new Audio('assets/voz/' + key + '.mp3'); A.cur = a; a.onended = () => setTimeout(done, 250); a.onerror = fallback;
    a.play().catch(fallback);
  });
}
export function stopVoice() { if (A.cur) { A.cur.pause(); A.cur = null; } }
export { ctx as unlockAudio };
