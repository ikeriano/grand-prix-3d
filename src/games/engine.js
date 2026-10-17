// Motor de minijuegos táctiles (canvas 2D, ligero para Redmi A2).
// Cada prueba: { id, name, cat, desc, how, dur, ai(level)->puntuación rival, unit, start(g) }
// start(g) recibe la API del juego; llama g.end(puntuación) al terminar.
export const REG = [];
export function prueba(def) { REG.push(def); return def; }
export const CATS = { vaquilla: '🐮 Con vaquilla', fisica: '💪 Físicas', piscina: '🏊 Piscina', yincana: '🏃 Yincanas', saber: '🧠 Conocimiento', especial: '⭐ Especiales' };

const R = (a, b) => a + Math.random() * (b - a);
export { R };

// ---------- dibujo (estilo dibujo animado, sin texturas) ----------
export const D = {
  sky(c, W, H, top = '#7ec8ff', bot = '#d8f1ff') { const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); c.fillStyle = g; c.fillRect(0, 0, W, H); },
  water(c, x, y, w, h, t) {
    const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#2ec4e8'); g.addColorStop(1, '#0a6fb0'); c.fillStyle = g; c.fillRect(x, y, w, h);
    c.strokeStyle = '#ffffff66'; c.lineWidth = 2;
    for (let j = 0; j < 4; j++) { c.beginPath(); for (let i = 0; i <= w; i += 20) { const yy = y + 12 + j * h / 4 + Math.sin(i / 30 + t * 2 + j) * 4; i ? c.lineTo(x + i, yy) : c.moveTo(x + i, yy); } c.stroke(); }
  },
  sand(c, x, y, w, h) { const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#f2d38a'); g.addColorStop(1, '#d9a85a'); c.fillStyle = g; c.fillRect(x, y, w, h); },
  person(c, x, y, s, col, opt = {}) { // muñeco simple con casco y camiseta del color del pueblo
    c.save(); c.translate(x, y); c.scale(s, s); if (opt.rot) c.rotate(opt.rot);
    c.fillStyle = '#00000033'; c.beginPath(); c.ellipse(0, 2, 16, 5, 0, 0, 7); c.fill();
    c.strokeStyle = '#333'; c.lineWidth = 5; c.lineCap = 'round';
    const k = opt.run ? Math.sin(opt.run) * 9 : 0;
    c.beginPath(); c.moveTo(-5, -22); c.lineTo(-7 - k, 0); c.moveTo(5, -22); c.lineTo(7 + k, 0); c.stroke();
    c.fillStyle = col; c.beginPath(); c.roundRect(-11, -50, 22, 30, 6); c.fill();
    c.strokeStyle = '#f1c6a0'; c.beginPath(); c.moveTo(-10, -45); c.lineTo(-18, opt.armsUp ? -66 : -28 + k); c.moveTo(10, -45); c.lineTo(18, opt.armsUp ? -66 : -28 - k); c.stroke();
    c.fillStyle = '#f1c6a0'; c.beginPath(); c.arc(0, -60, 10, 0, 7); c.fill();
    c.fillStyle = col; c.beginPath(); c.arc(0, -63, 10.5, Math.PI, 0); c.fill();
    c.restore();
  },
  vaca(c, x, y, s, t = 0, dir = 1, golden = false) { // vaquilla (o botarga) caricaturesca
    c.save(); c.translate(x, y); c.scale(s * dir, s);
    c.fillStyle = '#00000033'; c.beginPath(); c.ellipse(0, 4, 34, 7, 0, 0, 7); c.fill();
    const k = Math.sin(t * 14) * 6; c.strokeStyle = '#3b2412'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-20, -10); c.lineTo(-22 + k, 2); c.moveTo(-8, -10); c.lineTo(-6 - k, 2); c.moveTo(12, -10); c.lineTo(10 + k, 2); c.moveTo(22, -10); c.lineTo(24 - k, 2); c.stroke();
    c.fillStyle = golden ? '#f6c431' : '#7a4a22'; c.beginPath(); c.ellipse(0, -22, 30, 15, 0, 0, 7); c.fill();
    c.fillStyle = golden ? '#fff1a8' : '#f4ede2'; c.beginPath(); c.ellipse(-8, -24, 9, 6, .4, 0, 7); c.fill();
    c.fillStyle = golden ? '#f6c431' : '#7a4a22'; c.beginPath(); c.ellipse(32, -32, 12, 10, .3, 0, 7); c.fill();
    c.fillStyle = '#f2b8a8'; c.beginPath(); c.ellipse(41, -28, 6, 5, 0, 0, 7); c.fill();
    c.strokeStyle = '#f4ede2'; c.lineWidth = 4; c.beginPath(); c.moveTo(28, -40); c.quadraticCurveTo(24, -52, 30, -54); c.moveTo(36, -40); c.quadraticCurveTo(40, -52, 34, -55); c.stroke();
    c.fillStyle = '#111'; c.beginPath(); c.arc(35, -35, 2.2, 0, 7); c.fill();
    c.strokeStyle = golden ? '#f6c431' : '#7a4a22'; c.lineWidth = 3; c.beginPath(); c.moveTo(-30, -24); c.quadraticCurveTo(-42, -20 + k, -40, -8); c.stroke();
    c.restore();
  },
  text(c, t, x, y, size = 28, col = '#fff', align = 'center') { c.font = `900 ${size}px Arial, Roboto, sans-serif`; c.textAlign = align; c.textBaseline = 'middle'; c.lineWidth = Math.max(3, size / 7); c.strokeStyle = '#000a'; c.strokeText(t, x, y); c.fillStyle = col; c.fillText(t, x, y); },
  btn(c, x, y, w, h, label, col = '#ffd21a', pressed = false) { c.fillStyle = pressed ? '#fff' : col; c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.roundRect(x, y, w, h, h / 2); c.fill(); c.stroke(); D.text(c, label, x + w / 2, y + h / 2, Math.min(26, h * .45), '#3a1a00'); },
};

// ---------- ejecución de una prueba ----------
// opts: { color, rivalColor, level, vaca:true (el rival usa la vaquilla contra ti), fast, bot }
export function runPrueba(def, opts) {
  return new Promise((resolve) => {
    const cv = document.getElementById('mg'); const c = cv.getContext('2d');
    cv.classList.remove('hidden');
    const dpr = Math.min(devicePixelRatio || 1, opts.lowres ? 1 : 1.5);
    let W = 0, H = 0;
    const fit = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); };
    fit(); addEventListener('resize', fit);
    const speed = opts.fast ? 6 : 1;
    const g = {
      c, get W() { return W; }, get H() { return H; }, t: 0, dt: 0, opts, def, col: opts.color || '#1f6fe0', rcol: opts.rivalColor || '#ffd21a',
      level: opts.level || 'normal', vaca: !!opts.vaca, bot: !!opts.bot, ended: false, score: 0, timeLeft: def.dur || 0,
      taps: [], down: false, px: 0, py: 0, onTap: null, onRelease: null, onDown: null, swipe: null,
      hud(extra) { // marcador superior común
        c.fillStyle = '#000a'; c.fillRect(0, 0, W, 44);
        D.text(c, def.name, W / 2, 22, 20, '#ffd21a');
        if (def.dur) { const tl = Math.ceil(Math.max(0, g.timeLeft)); c.fillStyle = '#1f4fc8'; c.beginPath(); c.roundRect(8, 50, 118, 38, 19); c.fill(); c.strokeStyle = '#ffd21a'; c.lineWidth = 3; c.stroke();
          D.text(c, '🕒 ' + String(Math.floor(tl / 60)).padStart(2, '0') + ':' + String(tl % 60).padStart(2, '0'), 67, 69, 20, tl < 6 ? '#ff6b5b' : '#fff'); }
        D.text(c, `${extra != null ? extra : g.score} ${def.unit || ''} · Rival: ${opts.rivalScore} `, W - 170, 22, 18, '#fff', 'right');
      },
      end(score) { if (g.ended) return; g.ended = true; g.score = score != null ? score : g.score; setTimeout(finish, opts.fast ? 150 : 1300); },
    };
    // Interferencia de la vaquilla (comodín del rival): cruza la pantalla y empuja
    const vacaEv = { on: false, x: 0, t0: 0, next: R(4, 8) };
    const pt = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    let sx = 0, sy = 0;
    const pd = (e) => { e.preventDefault(); [g.px, g.py] = pt(e); sx = g.px; sy = g.py; g.down = true; g.onDown && g.onDown(g.px, g.py); };
    const pm = (e) => { [g.px, g.py] = pt(e); g.onMove && g.onMove(g.px, g.py); };
    const pu = (e) => { const [x, y] = pt(e); g.down = false; const dx = x - sx, dy = y - sy;
      if (Math.hypot(dx, dy) > 40 && g.swipe) g.swipe(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'r' : 'l') : (dy > 0 ? 'd' : 'u'), dx, dy);
      else g.onTap && g.onTap(x, y); g.onRelease && g.onRelease(x, y); };
    cv.addEventListener('pointerdown', pd); cv.addEventListener('pointermove', pm); cv.addEventListener('pointerup', pu);
    let raf = 0, last = performance.now(), introT = opts.fast ? 0.2 : 2.2;
    function frame(now) {
      raf = requestAnimationFrame(frame);
      let dt = Math.min(0.05, (now - last) / 1000) * speed; last = now;
      if (introT > 0) { introT -= dt; drawIntro(); return; }
      g.dt = dt; g.t += dt;
      if (def.dur && !g.ended) { g.timeLeft -= dt; if (g.timeLeft <= 0) { g.timeLeft = 0; g.end(); } }
      if (g.vaca && !g.ended) {
        vacaEv.next -= dt;
        if (!vacaEv.on && vacaEv.next <= 0) { vacaEv.on = true; vacaEv.x = -80; }
        if (vacaEv.on) { vacaEv.x += dt * W * 0.45; if (Math.abs(vacaEv.x - W / 2) < 8 && g.bump) g.bump(); if (vacaEv.x > W + 80) { vacaEv.on = false; vacaEv.next = R(5, 9); } }
      }
      if (g.bot && !g.ended && def.bot) def.bot(g);
      def.frame(g);
      if (vacaEv.on) { D.vaca(c, vacaEv.x, H * 0.62, 1.6, g.t, 1, opts.etapa && opts.etapa.vaquilla === 'botarga' && opts.dorada); D.text(c, '¡LA VAQUILLA!', vacaEv.x, H * 0.62 - 110, 24, '#ffd21a'); }
      if (g.ended) { c.fillStyle = '#0008'; c.fillRect(0, H / 2 - 50, W, 100); D.text(c, `${g.score} ${def.unit || ''}`, W / 2, H / 2 - 12, 40, '#ffd21a'); D.text(c, g.score > opts.rivalScore ? '¡Ganas la prueba!' : g.score === opts.rivalScore ? '¡Empate!' : 'Gana el rival', W / 2, H / 2 + 28, 24); }
    }
    function drawIntro() {
      D.sky(c, W, H, '#0a2a6a', '#1f6fe0'); D.text(c, CATS[def.cat] || '', W / 2, H * .22, 22, '#9fd0ff');
      D.text(c, def.name, W / 2, H * .36, Math.min(56, W / 12), '#ffd21a'); D.text(c, def.how, W / 2, H * .52, Math.min(22, W / 34));
      D.text(c, `Rival: ${opts.rivalScore} ${def.unit || ''} — ¡supéralo!`, W / 2, H * .66, 22, '#fff');
      if (g.vaca) D.text(c, '🐮 ¡El rival te ha soltado la vaquilla!', W / 2, H * .78, 22, '#ff9b6b');
    }
    function finish() {
      cancelAnimationFrame(raf); removeEventListener('resize', fit);
      cv.removeEventListener('pointerdown', pd); cv.removeEventListener('pointermove', pm); cv.removeEventListener('pointerup', pu);
      cv.classList.add('hidden'); resolve({ you: g.score, rival: opts.rivalScore });
    }
    def.start(g);
    raf = requestAnimationFrame(frame);
  });
}
// Nivel del rival → factor
export const LV = { facil: 0.7, normal: 1, dificil: 1.25 };
