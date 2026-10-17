// Cabecera RECREADA, sincronizada con el audio original (assets/snd/cabecera.m4a, 78 s).
// Secuencia según el vídeo de Iker: playa pixel art → medallón → bailarines en el plató, gradas, copresentadoras, bolas, dino, vaquilla, presentador → foto de grupo.
// El medallón es ORIGINAL (vaquilla en aro de laurel), no el logo real.
import { music, HAS_CAB, stopMusic } from './audio.js';
import { CAST } from './data.js';

export function laurelRoundel(size = 512) {
  const c = document.createElement('canvas'); c.width = c.height = size; const x = c.getContext('2d'); const s = size / 256; x.scale(s, s);
  x.fillStyle = '#2f9a3a'; x.beginPath(); x.arc(128, 128, 126, 0, 7); x.fill();
  x.fillStyle = '#7ad04a'; for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2; x.save(); x.translate(128 + Math.cos(a) * 112, 128 + Math.sin(a) * 112); x.rotate(a + .6); x.beginPath(); x.ellipse(0, 0, 11, 5, 0, 0, 7); x.fill(); x.restore(); }
  x.fillStyle = '#ffffff'; x.beginPath(); x.arc(128, 128, 98, 0, 7); x.fill(); x.fillStyle = '#1f6fe0'; x.beginPath(); x.arc(128, 128, 92, 0, 7); x.fill();
  x.fillStyle = '#ff8a2a'; x.beginPath(); x.arc(128, 138, 48, 0, 7); x.fill();
  x.fillStyle = '#c9782e'; x.beginPath(); x.ellipse(128, 136, 30, 36, 0, 0, 7); x.fill(); x.fillStyle = '#f2b8a8'; x.beginPath(); x.ellipse(128, 158, 20, 12, 0, 0, 7); x.fill();
  x.fillStyle = '#fff'; [112, 144].forEach((ex) => { x.beginPath(); x.arc(ex, 124, 8, 0, 7); x.fill(); }); x.fillStyle = '#111'; [114, 142].forEach((ex) => { x.beginPath(); x.arc(ex, 125, 4, 0, 7); x.fill(); });
  x.strokeStyle = '#f4ede2'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); x.moveTo(102, 106); x.quadraticCurveTo(90, 90, 98, 82); x.moveTo(154, 106); x.quadraticCurveTo(166, 90, 158, 82); x.stroke();
  x.font = '900 34px Arial Black, Arial'; x.textAlign = 'center'; x.lineWidth = 6; x.strokeStyle = '#7a3a00'; x.fillStyle = '#ffd21a';
  x.strokeText('GRAND', 128, 78); x.fillText('GRAND', 128, 78); x.strokeText('PRIX', 128, 214); x.fillText('PRIX', 128, 214);
  return c;
}

// Plano: [inicio s, cámara, mira, extra]
const SHOTS = [
  [7, [0, 2, 10], [0, 1.6, 0], 'dance'], [9, [12, 6, 8], [26, 6, -10]], [11, [-2, 2.6, 7], [0, 2.2, -2], 'co'], [15, [6, 3, 10], [0, 1.6, -1], 'inflat'],
  [20, [-6, 4, 12], [0, 1, -2]], [25, [3, 3, 9], [0, 1.8, 3]], [27, [-4, 3, 6], [-3, 2.4, -7], 'co2'], [30, [-12, 6, 8], [-26, 6, -10]],
  [33, [2, 2.6, 8], [0, 2, -2], 'co'], [37, [-10, 3, 18], [-14, 2, 12]], [39, [18, 4, 20], [14, 2, 12]], [43, [12, 6, 8], [26, 6, -10]], [44, [-12, 6, 8], [-26, 6, -10]],
  [45, [0, 15, 26], [0, 0, -2], 'wide'], [55, [-12, 7, 8], [-26, 6, -10]], [57.5, [12, 7, 8], [26, 6, -10]], [60, [0, 3, 10], [0, 2.4, -4], 'host'],
  [63, [-12, 6, 8], [-26, 6, -10]], [65, [0, 4, 14], [0, 2.4, -2], 'host2'], [72, [0, 5, 16], [0, 2.4, -1], 'grupo'],
];
const CREDITS = [[8, 'Producción ejecutiva', 'Iker Rodriguez Tejedor'], [13, 'Dirección de entretenimiento', 'Grand Prix 3D'], [18, 'Producción', 'Remake de fans'], [23, 'Diseño del plató', 'Three.js'],
  [28, 'Realización', 'Iker R. T.'], [33, 'Dirección', 'Iker Rodriguez Tejedor'], [38, 'Voces', 'Piper TTS']];

export function playCabecera(S, et, { mode = 'recreada', skip } = {}) {
  return new Promise((resolve) => {
    if (mode === 'video') return playVideo(resolve);
    const cv = document.getElementById('cab'); const c = cv.getContext('2d'); cv.classList.remove('hidden');
    const W = () => innerWidth, H = () => innerHeight; const fit = () => { cv.width = W(); cv.height = H(); }; fit(); addEventListener('resize', fit);
    const P = S.P23; const wasModern = S.modern; P.dancers.visible = true; S.setAutoOrbit(false);
    const hostF = S.chars.host, coF = S.chars.co, dino = S.chars.dino, vaca = S.chars.vaca;
    const a = music('tema', { loop: false }); const t0 = performance.now();
    const now = () => (a && !a.paused && a.currentTime > 0 ? a.currentTime : (performance.now() - t0) / 1000);
    const rnd = laurelRoundel(512); let raf = 0, last = -1, done = false;
    const end = () => { if (done) return; done = true; cancelAnimationFrame(raf); removeEventListener('resize', fit); cv.classList.add('hidden'); P.dancers.visible = false; stopMusic();
      hostF.position.set(-6, 0, -7.5); coF.position.set(-3, 0, -7); document.getElementById('skip').classList.add('hidden'); resolve(); };
    const sk = document.getElementById('skip'); sk.classList.remove('hidden'); sk.onclick = end;
    function frame() {
      raf = requestAnimationFrame(frame); const t = now(); if (t >= 78 || (a && a.ended)) return end();
      const w = W(), h = H(); c.clearRect(0, 0, w, h);
      if (t < 7) { pixelIntro(c, w, h, t, rnd); return; }
      // planos 3D
      let k = 0; for (let i = 0; i < SHOTS.length; i++) if (t >= SHOTS[i][0]) k = i;
      const sh = SHOTS[k], nx = SHOTS[k + 1] ? SHOTS[k + 1][0] : 78, u = (t - sh[0]) / (nx - sh[0]);
      const pos = sh[1].map((v, j) => v + (j === 0 ? Math.sin(u * 1.2) * 1.5 : 0) + (j === 2 ? -u * 2 : 0)); S.cam(pos, sh[2]);
      if (k !== last) { last = k; c.fillStyle = '#fff'; }
      if (sh[3] === 'co' || sh[3] === 'co2') coF.position.set(sh[3] === 'co2' ? -3 : 0, Math.abs(Math.sin(t * 4)) * .3, sh[3] === 'co2' ? -7 : -2);
      if (t >= 60) hostF.position.set(0, 0, Math.min(-2, -12 + (t - 60) * 2.5));
      if (t >= 72) { coF.position.set(2.2, 0, -1.5); dino.position.set(-4, 0, -2); vaca.position.set(4.5, 0, -2); }
      // rótulos de créditos (abajo a la izquierda, letra blanca)
      for (const [ct, a1, a2] of CREDITS) if (t >= ct && t < ct + 4.2) { c.font = `900 ${Math.round(h * .03)}px Arial`; c.fillStyle = '#fff'; c.shadowColor = '#000'; c.shadowBlur = 6; c.textAlign = 'left'; c.fillText(a1.toUpperCase(), w * .06, h * .84); c.font = `700 ${Math.round(h * .022)}px Arial`; c.fillText(a2.toUpperCase(), w * .06, h * .88); c.shadowBlur = 0; }
      // rótulo naranja con el nombre del presentador
      if (t >= 61.5 && t < 66) { const bw = w * .26, bh = h * .07, bx = w * .37, by = h * .82; c.fillStyle = '#ff7a1a'; c.beginPath(); c.roundRect(bx, by, bw, bh, 8); c.fill(); c.strokeStyle = '#ffd21a'; c.lineWidth = 3; c.stroke();
        c.font = `900 ${Math.round(bh * .5)}px Arial`; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText(CAST[et.host].name.toUpperCase(), bx + bw / 2, by + bh * .68); }
      if (t > 76.5) { c.fillStyle = `rgba(255,255,255,${(t - 76.5) / 1.5})`; c.fillRect(0, 0, w, h); }
    }
    raf = requestAnimationFrame(frame);
  });
}
function pixelIntro(c, w, h, t, rnd) {
  c.imageSmoothingEnabled = false; const px = Math.max(4, Math.round(w / 160));
  const sq = (x, y, ww, hh, col) => { c.fillStyle = col; c.fillRect(Math.round(x / px) * px, Math.round(y / px) * px, Math.ceil(ww / px) * px, Math.ceil(hh / px) * px); };
  sq(0, 0, w, h, t < 2 ? '#3a8ae8' : '#1f5fd0');
  for (let i = 0; i < 6; i++) { const cx = ((i * 260 + t * 30) % (w + 200)) - 100, cy = h * (.1 + (i % 3) * .1); sq(cx, cy, 70, 14, '#fff'); sq(cx + 14, cy - 12, 42, 14, '#fff'); }
  if (t < 2) {
    sq(0, h * .48, w, h * .22, '#2fa8e8'); for (let i = 0; i < 6; i++) sq(((i * 180 + t * 60) % w), h * (.52 + (i % 3) * .05), 60, px, '#bfe8ff');
    sq(0, h * .7, w, h * .3, '#f2c66a'); sq(0, h * .7, w, px * 2, '#fff');
    const pj = (x, col) => { sq(x, h * .72, 28, 28, '#c9782e'); sq(x + 4, h * .69, 20, 14, '#c9782e'); sq(x + 6, h * .66, 4, 8, '#fff'); sq(x + 18, h * .66, 4, 8, '#fff'); sq(x + 2, h * .76, 24, 10, col); };
    pj(w * .22 + Math.sin(t * 6) * 6, '#1f6fe0'); pj(w * .45 + Math.sin(t * 6 + 1) * 6, '#ffd21a');
    const bx = w * .6 + t * 40, by = h * .74 - Math.abs(Math.sin(t * 5)) * 50; sq(bx, by, 24, 24, '#fff'); sq(bx, by, 12, 12, '#e23a2a'); sq(bx + 12, by + 12, 12, 12, '#1f6fe0');
    if (t > .9) { const ax = w * 1.1 - (t - .9) * w * .7, ay = h * .14; sq(ax, ay, 40, 12, '#e23a2a'); sq(ax + 10, ay - 8, 14, 8, '#fff'); sq(ax + 44, ay + 2, 120, 10, '#ffd21a'); }
    return;
  }
  const k = Math.min(1, (t - 2) / .45), sc = k < 1 ? k * 1.15 : 1 + Math.sin((t - 2.45) * 3) * .02; const r = Math.min(w, h) * .33 * sc;
  c.imageSmoothingEnabled = true; c.drawImage(rnd, w / 2 - r, h * .44 - r, r * 2, r * 2);
  if (t > 2.6) { c.font = `900 ${Math.round(h * .07)}px Arial Black, Arial`; c.textAlign = 'center'; c.lineWidth = 8; c.strokeStyle = '#0a2a6a'; c.fillStyle = '#fff'; c.strokeText('EL JUEGO', w / 2, h * .9); c.fillText('EL JUEGO', w / 2, h * .9); }
  if (t > 6.7) { c.fillStyle = `rgba(255,255,255,${(t - 6.7) / .3})`; c.fillRect(0, 0, w, h); }
}
function playVideo(resolve) {
  const v = document.createElement('video'); v.src = 'assets/vid/cabecera.mp4'; v.playsInline = true; v.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;background:#000;z-index:40;object-fit:contain';
  document.body.appendChild(v); stopMusic(); const sk = document.getElementById('skip'); sk.classList.remove('hidden'); sk.style.zIndex = 41;
  const end = () => { v.pause(); v.remove(); sk.classList.add('hidden'); resolve(); };
  sk.onclick = end; v.onended = end; v.onerror = end; v.play().catch(end);
}
export async function hasVideo() { try { const r = await fetch('assets/vid/cabecera.mp4', { method: 'HEAD' }); return r.ok; } catch (e) { return false; } }
