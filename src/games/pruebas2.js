// Pruebas ajustadas a las reglas de los vídeos de Iker (ref/reglas_videos.md). Nombres de personajes originales.
import { prueba, D, R, LV } from './engine.js';
import { NUMERICAS, POSES } from './banco.js';
import { sfx } from '../audio.js';
const ri = Math.round;
export const vo = (k) => { if (window.__fast) return; try { const a = new Audio('assets/voz/' + k + '.mp3'); a.play().catch(() => {}); } catch (e) {} };
const btn = (c, x, y, w, h, label, col) => D.btn(c, x, y, w, h, label, col);
const inBox = (x, y, b) => x > b[0] && x < b[0] + b[2] && y > b[1] && y < b[1] + b[3];
function platoBg(c, W, H) {
  const g = c.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#ff5ab4'); g.addColorStop(.5, '#8fd0ff'); g.addColorStop(1, '#ff5ab4'); c.fillStyle = g; c.fillRect(0, 0, W, H * .55);
  const hc = ['#f6c43a', '#f08a3a', '#9a6ad8', '#f27ab0', '#c7a6f0']; for (let i = 0; i < 7; i++) { const x = i * W / 6 - 30, w = W / 8, h = H * (.28 + (i % 3) * .05); c.fillStyle = hc[i % 5]; c.fillRect(x, H * .55 - h, w, h); c.fillStyle = '#3a6ad8'; for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) c.fillRect(x + 10 + k * w / 2, H * .55 - h + 14 + r * 44, w / 2 - 20, 30); }
  const f = c.createLinearGradient(0, H * .55, 0, H); f.addColorStop(0, '#8ad8f4'); f.addColorStop(1, '#c8f2ff'); c.fillStyle = f; c.fillRect(0, H * .55, W, H * .45); c.fillStyle = '#4fe0e8'; c.fillRect(0, H * .55, W, 6);
}
function stripedBall(c, x, y, r, rot) { const cols = ['#e23a2a', '#fff', '#1f4fc8', '#ffd21a', '#2fb84a', '#fff']; for (let i = 0; i < 6; i++) { c.fillStyle = cols[i]; c.beginPath(); c.moveTo(x, y); c.arc(x, y, r, rot + i * Math.PI / 3, rot + (i + 1) * Math.PI / 3); c.fill(); } }
function pinGuy(c, x, y, s, gold, fall) { c.save(); c.translate(x, y); c.rotate(fall * 1.4); c.scale(s, s);
  c.fillStyle = gold ? '#f6c431' : '#fff'; c.beginPath(); c.moveTo(-20, 0); c.bezierCurveTo(-28, -40, -10, -60, -12, -80); c.bezierCurveTo(-16, -100, -10, -118, 0, -120); c.bezierCurveTo(10, -118, 16, -100, 12, -80); c.bezierCurveTo(10, -60, 28, -40, 20, 0); c.closePath(); c.fill();
  c.save(); c.clip(); c.fillStyle = gold ? '#fff1a8' : '#ffd21a'; c.fillRect(-30, -130, 16, 140); c.fillRect(14, -130, 16, 140); c.fillStyle = '#e23a2a'; c.fillRect(-30, -86, 60, 7); c.restore();
  c.fillStyle = '#f1c6a0'; c.beginPath(); c.arc(0, -98, 7, 0, 7); c.fill(); c.restore(); }

// ===== Los superbolos (v02): lanzador vendado en patines, guiado por su padrino; 6 bolos rivales en triángulo, uno es el Bolo dorado (2). 2:30. El ganador suma 2.
prueba({ id: 'superbolos', name: 'Los superbolos', cat: 'fisica', unit: 'bolos', icon: '🎳', dur: 150, pts: { win: 2 }, shot: 'bolera',
  how: 'Vas con los ojos vendados y en patines. Tu padrino te guía: «¡Izquierda! ¡Derecha! ¡Tira!». Mueve ◀ ▶ y pulsa TIRAR. 6 bolos, el dorado vale 2. Tienes 2:30.',
  ai: (l) => ri(Math.min(7, R(3, 6.5) * LV[l])),
  start(g) { const s = g.s = { x: .5, mv: 0, ball: null, guide: '', gt: 0, cool: 0,
      pins: [[.5, 0], [.44, 1], [.56, 1], [.38, 2], [.5, 2], [.62, 2]].map(([x, row], i) => ({ x, row, gold: i === 4, dn: 0, gone: 0 })) };
    const B = () => ({ l: [20, g.H - 90, 90, 70], r: [120, g.H - 90, 90, 70], t: [g.W - 200, g.H - 90, 180, 70] });
    g.onDown = (x, y) => { const b = B(); if (inBox(x, y, b.l)) s.mv = -1; else if (inBox(x, y, b.r)) s.mv = 1; else if (inBox(x, y, b.t)) throwB(); };
    g.onRelease = () => { s.mv = 0; };
    const throwB = () => { if (s.ball || g.ended) return; s.ball = { t: 0, x: s.x }; };
    s.throwB = throwB; },
  bot(g) { const s = g.s; const tgt = s.pins.find((p) => !p.dn); if (!tgt) return; const d = tgt.x - s.x; s.mv = Math.abs(d) > .025 ? Math.sign(d) : 0; if (!s.mv && !s.ball && Math.random() < .1) s.throwB(); },
  frame(g) {
    const { c, W, H } = g, s = g.s; platoBg(c, W, H);
    c.fillStyle = '#e2321e'; c.beginPath(); c.ellipse(W / 2, H * .62, W * .3, H * .1, 0, Math.PI, 0); c.fill(); c.fillRect(W * .2, H * .6, W * .6, H * .06);
    s.x = Math.max(.15, Math.min(.85, s.x + s.mv * g.dt * .35));
    const pinY = (row) => H * (.6 - row * .025) - 0, pinS = (row) => Math.min(1, H / 600) * (1 - row * .08);
    const left = s.pins.filter((p) => !p.gone);
    for (const p of left.slice().sort((a, b) => b.row - a.row)) { if (p.dn > 0) { p.dn += g.dt; if (p.dn > 1.6) p.gone = 1; } pinGuy(c, W * p.x, pinY(p.row), pinS(p.row), p.gold, Math.min(1, p.dn * 2) * (p.x < .5 ? -1 : 1)); }
    // pelota de rayas colgada de la cuerda
    let bx = W * s.x, by = H * .72, br = Math.min(W, H) * .07;
    if (s.ball) { s.ball.t += g.dt * 1.4; const k = s.ball.t; const out = k < 1 ? k : 2 - k; bx = W * s.ball.x; by = H * (.74 - out * .14); br *= 1 - out * .35;
      if (k >= 1 && !s.ball.hit) { s.ball.hit = 1; let n = 0; for (const p of s.pins) if (!p.dn && Math.abs(p.x - s.ball.x) < .055 && n < 2) { p.dn = .01; g.score += p.gold ? 2 : 1; n++; } sfx(n ? 'pop' : 'whistle'); }
      if (k >= 2) s.ball = null; }
    c.strokeStyle = '#ddd'; c.lineWidth = 2; c.beginPath(); c.moveTo(W / 2, 0); c.lineTo(bx, by - br); c.stroke(); stripedBall(c, bx, by, br, g.t);
    // antifaz: vista casi a oscuras con dos agujeros dibujados
    c.fillStyle = 'rgba(0,0,10,.78)'; c.fillRect(0, 0, W, H);
    c.globalCompositeOperation = 'destination-out'; c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(W * .4, H * .45, W * .1, H * .08, 0, 0, 7); c.ellipse(W * .6, H * .45, W * .1, H * .08, 0, 0, 7); c.fill(); c.globalCompositeOperation = 'source-over';
    D.person(c, W * s.x, H * .95, 1.5, g.col, { armsUp: !s.ball }); c.fillStyle = '#111'; c.fillRect(W * s.x - 10, H * .95 - 64, 20, 6);
    // guía del padrino
    s.gt -= g.dt; if (s.gt <= 0 && !g.ended) { s.gt = 1.4; const tgt = s.pins.filter((p) => !p.dn).sort((a, b) => Math.abs(a.x - s.x) - Math.abs(b.x - s.x))[0];
      if (tgt) { const d = tgt.x - s.x; s.guide = Math.abs(d) < .03 ? '¡Corre, tira!' : d < 0 ? '¡Izquierda, izquierda!' : '¡Derecha, derecha!'; vo(Math.abs(d) < .03 ? 'g_tira' : d < 0 ? 'g_izq' : 'g_der'); } else { s.guide = '¡Todos abajo!'; g.end(); } }
    c.fillStyle = '#fff'; c.beginPath(); c.roundRect(W * .3, 64, W * .4, 44, 14); c.fill(); D.text(c, '🎤 Padrino: ' + s.guide, W / 2, 86, 18, '#1f4fc8');
    btn(c, 20, H - 90, 90, 70, '◀', '#ffd21a'); btn(c, 120, H - 90, 90, 70, '▶', '#ffd21a'); btn(c, W - 200, H - 90, 180, 70, s.ball ? '…' : 'TIRAR', '#ff7a1a');
    g.hud();
  } });

// ===== Los troncos locos (v04): relevos sobre 6 troncos; coger 1 salmón y volver a la cesta. Caer = volver a la escalera (y perder el salmón). 2:30. Gana: 4 pts + 2 comodines; pierde: 2 + 1.
prueba({ id: 'troncos', name: 'Los troncos locos', cat: 'piscina', unit: 'salmones', dur: 150, pts: { win: 4, lose: 2, comWin: 2, comLose: 1 }, intro: 'h_troncos',
  how: 'Relevos: cruza los 6 troncos que giran, coge un salmón y tráelo a la cesta. Toca a los lados para no caerte y SALTA para pasar de tronco. Si caes con el salmón, lo pierdes.',
  ai: (l) => ri(R(3, 6) * LV[l]),
  start(g) { const s = g.s = { pos: 0, dir: 1, fish: false, tilt: 0, vt: 0, fall: 0, jump: 0, runner: 1 };
    g.onDown = (x, y) => { if (s.fall > 0 || g.ended) return; if (y > g.H - 100 && Math.abs(x - g.W / 2) < 110) { if (s.jump <= 0) { s.jump = .45; } } else s.vt += (x < g.W / 2 ? -1 : 1) * .55; }; },
  bot(g) { const s = g.s; if (Math.random() < .22) s.vt += (s.tilt > 0 ? -1 : 1) * .55; if (Math.abs(s.tilt) < .3 && s.jump <= 0 && Math.random() < .05) s.jump = .45; },
  frame(g) {
    const { c, W, H } = g, s = g.s; platoBg(c, W, H); const wy = H * .66; D.water(c, 0, wy, W, H - wy, g.t);
    const lx = (i) => W * (.08 + i * .84 / 7);
    // escalera (cesta del equipo) y cesta de salmones
    c.fillStyle = '#ddd'; c.fillRect(lx(0) - 30, wy - 70, 10, 90); c.fillRect(lx(0) + 20, wy - 70, 10, 90); for (let k = 0; k < 5; k++) c.fillRect(lx(0) - 30, wy - 60 + k * 18, 60, 5);
    c.fillStyle = '#8a5a2a'; c.fillRect(lx(0) - 50, wy - 104, 50, 30); D.text(c, '🐟×' + g.score, lx(0) - 25, wy - 120, 16);
    c.fillStyle = '#e2321e'; c.fillRect(lx(7) - 24, wy - 40, 48, 40); D.text(c, '🐟', lx(7), wy - 52, 22);
    for (let i = 1; i <= 6; i++) { const x = lx(i); c.fillStyle = '#8a5a2a'; c.beginPath(); c.roundRect(x - 34, wy - 14, 68, 26, 13); c.fill(); c.fillStyle = '#ffd21a'; c.fillRect(x - 34, wy - 14, 8, 26); c.fillRect(x + 26, wy - 14, 8, 26);
      c.strokeStyle = '#5a3a1a'; c.lineWidth = 2; for (let k = 0; k < 3; k++) { const xx = x - 20 + ((k * 14 + g.t * 60 * (i % 2 ? 1 : -1)) % 42 + 42) % 42; c.beginPath(); c.moveTo(xx, wy - 12); c.lineTo(xx, wy + 10); c.stroke(); } }
    if (s.fall > 0) { s.fall -= g.dt; if (s.fall <= 0) { s.pos = 0; s.dir = 1; s.tilt = s.vt = 0; s.runner++; } }
    else if (!g.ended) {
      if (s.pos > 0 && s.pos < 7) { s.vt += (Math.sin(g.t * 1.9) * .8 + Math.sin(g.t * 3.3) * .5 + s.tilt * 2.2) * g.dt; s.vt *= .97; s.tilt += s.vt * g.dt; } else { s.tilt *= .9; s.vt = 0; }
      if (Math.abs(s.tilt) > 1) { s.fall = 1.6; if (s.fish) { s.fish = false; } sfx('pop'); }
      if (s.jump > 0) { s.jump -= g.dt; if (s.jump <= 0) { s.pos += s.dir; s.tilt *= .5;
        if (s.pos >= 7) { s.pos = 7; s.fish = true; s.dir = -1; }
        if (s.pos <= 0 && s.dir < 0) { s.pos = 0; if (s.fish) { g.score++; sfx('brass'); } s.fish = false; s.dir = 1; s.runner++; } } } }
    const jx = s.jump > 0 ? (1 - s.jump / .45) * s.dir : 0;
    const px = lx(s.pos + jx), py = wy - 12 - (s.jump > 0 ? Math.sin((1 - s.jump / .45) * Math.PI) * 50 : 0);
    if (s.fall > 0) { D.text(c, '¡AL AGUA! 💦', W / 2, H * .3, 36, '#fff'); D.text(c, s.fish ? '' : 'Vuelve nadando a la escalera', W / 2, H * .38, 18); }
    else { D.person(c, px, py, 1.3, g.col, { rot: s.tilt * .9, armsUp: true }); if (s.fish) D.text(c, '🐟', px + 22, py - 70, 26); }
    D.person(c, W * .5, wy - 140, .9, '#111'); D.text(c, 'ÁRBITRO', W * .5, wy - 205, 11);
    c.fillStyle = '#0006'; c.fillRect(W / 2 - 100, H - 128, 200, 12); c.fillStyle = Math.abs(s.tilt) > .7 ? '#ff5b4b' : '#8eff8e'; c.fillRect(W / 2 + s.tilt * 100 - 6, H - 132, 12, 20);
    btn(c, W / 2 - 100, H - 100, 200, 56, s.dir > 0 ? 'SALTA ➜' : '⬅ SALTA', '#ff7a1a'); D.text(c, '◀', 30, H * .45, 44); D.text(c, '▶', W - 30, H * .45, 44);
    g.hud();
  } });

// ===== La patata caliente (v03): duelo alcalde contra alcalde con un globo que se infla. Pregunta numérica, el presentador dice «¡Más!» o «¡Menos!»; al acertar, el globo pasa. 2 rondas.
prueba({ id: 'patata', name: 'La patata caliente', cat: 'saber', unit: 'rondas', dur: 0, live: true, shot: 'host',
  how: 'El globo se infla sin parar. Teclea un número: el presentador te dirá «¡Más!» o «¡Menos!». Cuando aciertes, el globo pasa al rival. Pierde quien lo tenga al explotar. 2 rondas.',
  ai: () => 0,
  start(g) { const s = g.s = { round: 0, you: 0, riv: 0, holder: 'you', q: null, input: '', msg: '', mt: 0, size: 0, popAt: 0, ai: null, pause: 1.2, popped: 0, tick: 0, used: new Set() };
    s.newQ = () => { let q; do { q = NUMERICAS[Math.floor(Math.random() * NUMERICAS.length)]; } while (s.used.has(q[0]) && s.used.size < NUMERICAS.length); s.used.add(q[0]); s.q = q; s.input = ''; s.ai = { lo: q[2], hi: q[3], next: R(1, 1.8) }; };
    s.startRound = () => { s.size = 0; s.popAt = R(20, 34) / (window.__bot ? 3 : 1); s.holder = s.round % 2 ? 'riv' : 'you'; s.newQ(); s.popped = 0; };
    s.startRound();
    s.guess = (n, who) => { const a = s.q[1]; if (n === a) { s.msg = '¡Correcto!'; vo('h_correcto'); sfx('brass'); s.holder = who === 'you' ? 'riv' : 'you'; s.newQ(); } else { s.msg = (who === 'you' ? n + ': ' : 'Rival dice ' + n + ': ') + (n < a ? '¡MÁS!' : '¡MENOS!'); vo(n < a ? 'h_mas' : 'h_menos'); if (who === 'riv') { if (n < a) s.ai.lo = n + 1; else s.ai.hi = n - 1; } } s.mt = 1.4; };
    const keys = () => { const kw = Math.min(64, g.W * .07), x0 = g.W - kw * 3 - 30, y0 = g.H * .26; const out = []; '789456123C0✓'.split('').forEach((k, i) => out.push([k, x0 + (i % 3) * (kw + 6), y0 + Math.floor(i / 3) * (kw * .8 + 6), kw, kw * .8])); return out; };
    s.keys = keys;
    g.onDown = (x, y) => { if (s.holder !== 'you' || s.pause > 0 || g.ended) return; for (const [k, kx, ky, kw, kh] of keys()) if (inBox(x, y, [kx, ky, kw, kh])) { sfx('tap');
      if (k === 'C') s.input = s.input.slice(0, -1); else if (k === '✓') { if (s.input) { s.guess(+s.input, 'you'); s.input = ''; } } else if (s.input.length < 5) s.input += k; } }; },
  bot(g) { const s = g.s; if (s.holder === 'you' && s.pause <= 0 && Math.random() < .08) { if (!s.bai) s.bai = { lo: s.q[2], hi: s.q[3], q: s.q }; if (s.bai.q !== s.q) s.bai = { lo: s.q[2], hi: s.q[3], q: s.q };
      const n = Math.round((s.bai.lo + s.bai.hi) / 2); s.guess(n, 'you'); if (n < s.q[1]) s.bai.lo = n + 1; else s.bai.hi = n - 1; } },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H, '#0a1a4a', '#22408a');
    c.fillStyle = '#e8d8b8'; c.beginPath(); c.ellipse(W * .38, H * .78, W * .3, H * .08, 0, 0, 7); c.fill();
    D.person(c, W * .16, H * .86, 1.6, g.col, { armsUp: s.holder === 'you' }); D.person(c, W * .6, H * .86, 1.6, g.rcol, { armsUp: s.holder === 'riv' });
    D.text(c, 'TU ALCALDE', W * .16, H * .58, 14); D.text(c, 'ALCALDE RIVAL', W * .6, H * .58, 14);
    if (s.pause > 0) { s.pause -= g.dt; }
    else if (!g.ended && !s.popped) { s.size += g.dt; s.tick -= g.dt; if (s.tick <= 0) { sfx('tick'); s.tick = Math.max(.12, .8 - s.size / s.popAt * .7); }
      if (s.holder === 'riv') { s.ai.next -= g.dt; if (s.ai.next <= 0) { const n = Math.round(s.ai.lo + (s.ai.hi - s.ai.lo) * R(.35, .65)); s.guess(n, 'riv'); s.ai.next = R(1.1, 2) / (window.__bot ? 3 : 1); } }
      if (s.size >= s.popAt) { s.popped = 1.6; sfx('pop'); setTimeout(() => sfx('brass'), 300); if (s.holder === 'you') s.riv++; else s.you++; g.opts.rivalScore = s.riv; g.score = s.you; } }
    if (s.popped > 0) { s.popped -= g.dt; D.text(c, '💥 ¡PUM!', W * .38, H * .4, 60, '#ff5b1a'); D.text(c, s.holder === 'you' ? 'Ronda para el rival' : '¡Ronda para ti!', W * .38, H * .52, 28);
      if (s.popped <= 0) { s.round++; if (s.round >= 2) { g.opts.rivalScore = s.riv; g.end(s.you); } else { s.startRound(); s.pause = 1.2; } } }
    else { const k = Math.min(1, s.size / s.popAt), r = 26 + k * 70, bx = s.holder === 'you' ? W * .24 : W * .52, by = H * .5 - k * 30 + Math.sin(g.t * 20) * k * 3;
      c.fillStyle = '#e23a2a'; c.beginPath(); c.ellipse(bx, by, r, r * 1.15, 0, 0, 7); c.fill(); c.fillStyle = '#ffffff55'; c.beginPath(); c.ellipse(bx - r * .35, by - r * .4, r * .2, r * .3, -.5, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.beginPath(); c.moveTo(bx, by + r * 1.15); c.lineTo(bx, by + r * 1.15 + 30); c.stroke(); }
    // rótulo naranja de la pregunta (abajo)
    if (s.q) { c.fillStyle = '#ff7a1a'; c.beginPath(); c.roundRect(W * .05, H - 100, W * .9, 44, 10); c.fill(); D.text(c, s.q[0].toUpperCase(), W / 2, H - 78, Math.min(20, W / 48), '#fff'); }
    if (s.mt > 0) { s.mt -= g.dt; D.text(c, s.msg, W * .38, H * .2, 30, '#ffd21a'); }
    if (s.holder === 'you' && !s.popped) { c.fillStyle = '#000a'; c.fillRect(W - Math.min(64, W * .07) * 3 - 46, H * .14, Math.min(64, W * .07) * 3 + 40, H * .62); D.text(c, s.input || '…', W - Math.min(64, W * .07) * 1.5 - 24, H * .2, 30, '#fff');
      for (const [k, kx, ky, kw, kh] of s.keys()) { c.fillStyle = k === '✓' ? '#2fb84a' : k === 'C' ? '#e23a2a' : '#1f6fe0'; c.beginPath(); c.roundRect(kx, ky, kw, kh, 10); c.fill(); D.text(c, k, kx + kw / 2, ky + kh / 2, 24); } }
    else if (!s.popped) D.text(c, 'El rival piensa…', W * .82, H * .3, 20);
    D.text(c, `Ronda ${Math.min(2, s.round + 1)}/2`, W * .82, H * .1, 18);
    g.hud(s.you);
  } });

// ===== Los Pegajosos (v01): dos saltadores botan en la cama elástica y se pegan al muro de velcro en una pose; el adivinador (con auriculares) dice la frase.
prueba({ id: 'pegajosos', name: 'Los Pegajosos', cat: 'fisica', unit: 'aciertos', dur: 0, live: true, pts: { tie: 3, tieCancelsDorada: true }, shot: 'gradas', intro: 'h_pegajosos',
  how: 'Suena el gong y tus saltadores se pegan al muro de velcro con una pose. Tú eres el adivinador: elige qué frase representan. 2 tarjetas por equipo. Empate: 3 puntos para cada uno.',
  ai: () => 0,
  start(g) { const cards = POSES.slice().sort(() => Math.random() - .5); const s = g.s = { i: 0, cards, phase: 'gong', pt: 1.5, you: 0, riv: 0, sel: -1, opts: [], turn: 'you', msg: '' };
    s.setup = () => { const card = s.cards[s.i]; const others = POSES.filter((p) => p !== card).sort(() => Math.random() - .5).slice(0, 3); s.opts = [card, ...others].sort(() => Math.random() - .5); s.card = card; s.sel = -1; s.phase = 'gong'; s.pt = 1.2; sfx('gong'); };
    s.setup();
    g.onDown = (x, y) => { if (s.phase !== 'guess' || s.turn !== 'you') return; s.opts.forEach((o, k) => { const b = [g.W * .55, g.H * .2 + k * g.H * .15, g.W * .4, g.H * .12]; if (inBox(x, y, b)) { s.sel = k; s.phase = 'res'; s.pt = 1.6; if (o === s.card) { s.you++; sfx('brass'); s.msg = '¡Acierto!'; } else { s.msg = 'Era: ' + s.card[0]; sfx('lose'); } } }); }; },
  bot(g) { const s = g.s; if (s.phase === 'guess' && s.turn === 'you' && Math.random() < .05) { const k = Math.random() < .7 ? s.opts.indexOf(s.card) : 0; const b = [g.W * .55, g.H * .2 + k * g.H * .15]; g.onDown(b[0] + 5, b[1] + 5); } },
  frame(g) {
    const { c, W, H } = g, s = g.s; platoBg(c, W, H);
    // muro de velcro negro con cuadrícula
    const wx = W * .05, wy = H * .12, ww = W * .45, wh = H * .6; c.fillStyle = '#111'; c.fillRect(wx, wy, ww, wh); c.strokeStyle = '#333'; c.lineWidth = 1; for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(wx + i * ww / 12, wy); c.lineTo(wx + i * ww / 12, wy + wh); c.stroke(); } for (let i = 0; i < 8; i++) { c.beginPath(); c.moveTo(wx, wy + i * wh / 8); c.lineTo(wx + ww, wy + i * wh / 8); c.stroke(); }
    c.fillStyle = '#1f4fc8'; c.fillRect(wx + 10, H * .8, ww * .35, 12); c.fillStyle = '#ffd21a'; c.fillRect(wx + ww * .55, H * .8, ww * .35, 12); // cama elástica
    s.pt -= g.dt; const col = s.turn === 'you' ? g.col : g.rcol;
    if (s.phase === 'gong' && s.pt <= 0) { s.phase = 'jump'; s.pt = 1.2; }
    if (s.phase === 'jump') { const k = 1 - Math.max(0, s.pt) / 1.2; D.person(c, wx + ww * .3, H * .8 - Math.sin(k * Math.PI) * H * .4, 1.2, col, { armsUp: true }); D.person(c, wx + ww * .7, H * .8 - Math.sin(k * Math.PI) * H * .35, 1.2, col, { armsUp: true }); if (s.pt <= 0) { s.phase = 'pose'; s.pt = 2.5; } }
    if (s.phase === 'pose' || s.phase === 'guess' || s.phase === 'res') drawPose(c, s.card, wx, wy, ww, wh, col, g.t);
    if (s.phase === 'pose') { D.text(c, '⏱ ' + Math.ceil(s.pt * 12), wx + ww / 2, wy - 16, 20); if (s.pt <= 0) { s.phase = 'guess'; if (s.turn === 'riv') { s.pt = 1.4; } } }
    if (s.phase === 'guess' && s.turn === 'riv') { D.text(c, 'El adivinador rival piensa…', W * .75, H * .4, 20); if (s.pt <= 0) { const ok = Math.random() < .6; if (ok) s.riv++; s.msg = ok ? 'El rival acierta' : 'El rival falla'; sfx(ok ? 'brass' : 'whistle'); s.phase = 'res'; s.pt = 1.6; } }
    if (s.phase === 'guess' && s.turn === 'you') { D.text(c, '🎧 ¿Qué representan?', W * .75, H * .13, 20, '#fff');
      s.opts.forEach((o, k) => { const y = H * .2 + k * H * .15; c.fillStyle = '#1f6fe0'; c.strokeStyle = '#ffd21a'; c.lineWidth = 3; c.beginPath(); c.roundRect(W * .55, y, W * .4, H * .12, 20); c.fill(); c.stroke(); D.text(c, o[0], W * .75, y + H * .06, Math.min(20, W / 45)); }); }
    if (s.phase === 'res') { D.text(c, s.msg, W * .75, H * .45, 26, '#ffd21a'); if (s.pt <= 0) { s.i++; s.turn = s.i % 2 ? 'riv' : 'you'; g.opts.rivalScore = s.riv; g.score = s.you; if (s.i >= 4) { g.extra = { tie: s.you === s.riv }; g.end(s.you); } else s.setup(); } }
    D.text(c, `Tarjeta ${Math.min(4, s.i + 1)}/4 · ${s.turn === 'you' ? 'Tu equipo' : 'Equipo rival'}`, W * .75, H * .9 - 60, 16);
    g.hud(s.you);
  } });
function drawPose(c, card, wx, wy, ww, wh, col, t) { // dos figuras pegadas al muro con trajes blancos de estrellas
  const fig = (x, y, P) => { const L = 38; c.save(); c.translate(x, y); c.strokeStyle = '#fff'; c.lineWidth = 10; c.lineCap = 'round';
    const seg = (a, b) => { c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }; const pol = (o, a, l) => [o[0] + Math.cos(a) * l, o[1] + Math.sin(a) * l];
    const hip = [0, 0], neck = pol(hip, P.body - Math.PI / 2, L * 1.4); seg(hip, neck);
    const ha = P.arms; seg(neck, pol(neck, ha[0], L)); seg(neck, pol(neck, ha[1], L)); const lg = P.legs; seg(hip, pol(hip, lg[0], L * 1.2)); seg(hip, pol(hip, lg[1], L * 1.2));
    c.fillStyle = '#fff'; const hd = pol(neck, P.body - Math.PI / 2, 16); c.beginPath(); c.arc(hd[0], hd[1], 14, 0, 7); c.fill(); c.fillStyle = col; c.font = '20px Arial'; c.fillText('★', hd[0] - 7, hd[1] - 12); c.fillText('★', neck[0] - 7 + (hip[0] - neck[0]) / 2, neck[1] + 8 + (hip[1] - neck[1]) / 2); c.restore(); };
  const [, a, b] = card; fig(wx + ww * .3, wy + wh * (a.y || .55), a); fig(wx + ww * .7, wy + wh * (b.y || .55), b);
}

// ===== Pingüinos matemáticos (v05): 4 contra 4 con traje de pingüino; el presentador lee una suma o resta y hay que lanzarse a la colchoneta del resultado. Eliminados: los que fallan y el último en llegar.
prueba({ id: 'pinguinos', name: 'Pingüinos matemáticos', cat: 'piscina', unit: 'pingüinos', dur: 0, live: true, shot: 'overview', intro: 'h_pinguinos',
  how: 'El presentador lee una cuenta. ¡Lánzate a la colchoneta con el resultado! Quedan eliminados los que fallan y el último en llegar. Gana el equipo al que le queden pingüinos.',
  ai: () => 0,
  start(g) { const s = g.s = { mine: [1, 1, 1, 1], his: [1, 1, 1, 1], phase: 'read', pt: 1.2, q: null, mats: [], t0: 0, my: null, msg: '' };
    s.newQ = () => { const a = ri(R(8, 45)), b = ri(R(2, 9)), plus = Math.random() < .5; const ans = plus ? a + b : a - b; const set = new Set([ans]); while (set.size < 6) set.add(ans + ri(R(-6, 6)) || ans + 7); s.q = [`${a} ${plus ? '+' : '−'} ${b}`, ans]; s.mats = [...set].sort(() => Math.random() - .5); s.my = null; s.phase = 'read'; s.pt = 1.4; };
    s.newQ();
    g.onDown = (x, y) => { if (s.phase !== 'go' || s.my) return; s.mats.forEach((m, k) => { const b = matBox(g, k); if (inBox(x, y, b)) { s.my = { v: m, t: s.t0 }; sfx('tap'); } }); }; },
  bot(g) { const s = g.s; if (s.phase === 'go' && !s.my && s.t0 > R(.4, 1.2)) { const k = Math.random() < .85 ? s.mats.indexOf(s.q[1]) : 0; const b = matBox(g, k); g.onDown(b[0] + 5, b[1] + 5); } },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H, '#8fd0ff', '#c8f2ff'); c.fillStyle = '#8ad8f4'; c.fillRect(0, H * .3, W, H * .7);
    s.mats.forEach((m, k) => { const b = matBox(g, k); const hl = s.phase === 'res' && m === s.q[1]; c.fillStyle = hl ? '#2fb84a' : '#1f4fc8'; c.beginPath(); c.roundRect(...b, 12); c.fill(); D.text(c, String(m), b[0] + b[2] / 2, b[1] + b[3] / 2, 36, '#fff'); });
    const drawTeam = (arr, col, x0) => arr.forEach((v, i) => { if (!v) return; const x = x0 + i * 46, y = H * .28; c.fillStyle = '#1a2a6a'; c.beginPath(); c.ellipse(x, y, 16, 22, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(x, y + 4, 9, 14, 0, 0, 7); c.fill(); c.fillStyle = col; c.fillRect(x - 16, y - 24, 32, 6); c.fillStyle = '#ff8a1a'; c.fillRect(x - 4, y - 14, 8, 5); });
    drawTeam(s.mine, g.col, 30); drawTeam(s.his, g.rcol, W - 30 - 3 * 46);
    s.pt -= g.dt;
    if (s.phase === 'read') { D.text(c, s.q[0] + ' = ?', W / 2, H * .18, 44, '#ffd21a'); if (s.pt <= 0) { s.phase = 'go'; s.t0 = 0; } }
    if (s.phase === 'go') { s.t0 += g.dt; D.text(c, s.q[0] + ' = ?', W / 2, H * .18, 44, '#ffd21a'); D.text(c, '¡YA!', W / 2, H * .1, 24, '#fff');
      if (s.my || s.t0 > 5) { // resolver la ronda
        const res = []; s.mine.forEach((v, i) => { if (!v) return; if (i === s.mine.findIndex((x) => x)) res.push({ team: 'm', i, ok: s.my && s.my.v === s.q[1], t: s.my ? s.my.t : 9 }); else res.push({ team: 'm', i, ok: Math.random() < .85, t: R(.7, 2.2) }); });
        s.his.forEach((v, i) => { if (v) res.push({ team: 'h', i, ok: Math.random() < (g.level === 'dificil' ? .9 : .82), t: R(.6, 2) }); });
        let out = res.filter((r) => !r.ok); const okk = res.filter((r) => r.ok).sort((a, b) => b.t - a.t); if (okk.length > 1) out.push(okk[0]);
        out.forEach((r) => { (r.team === 'm' ? s.mine : s.his)[r.i] = 0; });
        const lm = out.filter((r) => r.team === 'm').length, lh = out.length - lm; s.msg = `Eliminados: ${lm} tuyo(s), ${lh} rival(es)`; sfx('whistle'); s.phase = 'res'; s.pt = 1.8; } }
    if (s.phase === 'res') { D.text(c, s.q[0] + ' = ' + s.q[1], W / 2, H * .18, 44, '#ffd21a'); D.text(c, s.msg, W / 2, H * .9 - 50, 22);
      if (s.pt <= 0) { const a = s.mine.filter(Boolean).length, b = s.his.filter(Boolean).length; g.score = a; g.opts.rivalScore = b; if (!a || !b) g.end(a); else s.newQ(); } }
    g.hud(s.mine.filter(Boolean).length);
  } });
function matBox(g, k) { const W = g.W, H = g.H, w = W * .22, h = H * .18; return [W * .11 + (k % 3) * W * .27, H * .38 + Math.floor(k / 3) * H * .24, w, h]; }

// ===== Baloncesto en pañales (v07): bebés con pañal suben una cinta que va hacia atrás con pelotas gigantes y encestan arriba. Roja = 2. 2:30. Gana: 3 puntos.
prueba({ id: 'baloncesto', name: 'Baloncesto en pañales', cat: 'fisica', unit: 'puntos', icon: '🏀', dur: 150, pts: { win: 3 }, shot: 'bolera',
  how: 'Coge una pelota del foso, toca muy rápido para subir la cinta que va hacia atrás y, arriba, toca cuando la flecha esté en verde para encestar. La roja vale 2.',
  ai: (l) => ri(R(7, 13) * LV[l]),
  start(g) { const s = g.s = { y: 0, ball: null, aim: 0, phase: 'pick', msg: '', mt: 0, slip: 0 };
    const pick = () => { s.ball = Math.random() < .18 ? 'red' : ['yel', 'blu'][ri(R(0, 1))]; s.phase = 'run'; };
    pick(); s.pick = pick;
    g.bump = () => { if (s.phase === 'run') { s.y = Math.max(0, s.y - .45); s.msg = '¡La vaquilla te empuja!'; s.mt = 1.2; vo('h_caido'); } };
    g.onDown = () => { if (g.ended) return; if (s.phase === 'run') s.y += .045; else if (s.phase === 'shoot') { const ok = Math.abs(Math.sin(s.aim)) < .3; if (ok) { g.score += s.ball === 'red' ? 2 : 1; s.msg = s.ball === 'red' ? '¡Canasta roja! +2' : '¡Canasta! +1'; sfx('brass'); } else { s.msg = '¡Fuera!'; } s.mt = 1; s.phase = 'down'; } }; },
  bot(g) { const s = g.s; if (s.phase === 'run' && Math.random() < .5) g.onDown(); if (s.phase === 'shoot' && Math.abs(Math.sin(s.aim)) < .2) g.onDown(); },
  frame(g) {
    const { c, W, H } = g, s = g.s; c.fillStyle = '#7a6a5a'; c.fillRect(0, 0, W, H); for (let i = 0; i < 30; i++) { c.fillStyle = i % 2 ? '#8a7a68' : '#6a5a4a'; c.beginPath(); c.arc((i * 137) % W, (i * 89) % (H * .5), 30 + (i % 4) * 10, 0, 7); c.fill(); }
    const x0 = W * .2, y0 = H * .9, x1 = W * .72, y1 = H * .3;
    c.fillStyle = '#1f4fc8'; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.lineTo(x1, y1 + 30); c.lineTo(x0, y0 + 30); c.fill();
    for (let i = 0; i < 10; i++) { const k = ((i / 10) - (g.t * .25) % .1 * 10 / 10 + 1) % 1; c.fillStyle = '#ffd21a'; const ax = x0 + (x1 - x0) * k, ay = y0 + (y1 - y0) * k + 14; c.beginPath(); c.moveTo(ax + 10, ay - 8); c.lineTo(ax - 8, ay); c.lineTo(ax + 10, ay + 8); c.fill(); }
    c.fillStyle = '#c84a1a'; c.beginPath(); c.ellipse(x0 - 40, y0 + 10, 70, 22, 0, 0, 7); c.fill(); ['#ffd21a', '#3a8aff', '#e23a2a', '#ffd21a', '#3a8aff'].forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.arc(x0 - 80 + i * 20, y0, 12, 0, 7); c.fill(); });
    c.fillStyle = '#fff'; c.fillRect(x1 + 30, y1 - 120, 70, 50); c.strokeStyle = '#e23a2a'; c.lineWidth = 5; c.beginPath(); c.ellipse(x1 + 50, y1 - 66, 26, 7, 0, 0, 7); c.stroke();
    if (s.phase === 'run') { s.y -= g.dt * .22; if (s.y < 0) s.y = 0; if (s.y >= 1) { s.y = 1; s.phase = 'shoot'; s.aim = 0; } }
    if (s.phase === 'shoot') s.aim += g.dt * 3;
    if (s.phase === 'down') { s.y -= g.dt * 1.2; if (s.y <= 0) { s.y = 0; s.pick(); } }
    const px = x0 + (x1 - x0) * s.y, py = y0 + (y1 - y0) * s.y;
    D.person(c, px, py, 1.3, g.col, { run: s.phase === 'run' ? g.t * 18 : 0, armsUp: !!s.ball }); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(px, py - 20, 13, 8, 0, 0, 7); c.fill();
    if (s.ball && s.phase !== 'down') { c.fillStyle = { red: '#e23a2a', yel: '#ffd21a', blu: '#3a8aff' }[s.ball]; c.beginPath(); c.arc(px, py - 90, 18, 0, 7); c.fill(); }
    if (s.phase === 'shoot') { c.fillStyle = '#0008'; c.fillRect(W * .3, 64, W * .4, 26); c.fillStyle = '#2fb84a'; c.fillRect(W * .5 - W * .06, 64, W * .12, 26); c.fillStyle = '#fff'; c.fillRect(W * .5 + Math.sin(s.aim) * W * .19 - 3, 60, 6, 34); D.text(c, '¡TIRA EN VERDE!', W / 2, 110, 20, '#ffd21a'); }
    else if (s.phase === 'run') D.text(c, '👆 ¡TOCA RÁPIDO!', W * .5, 80, 22);
    if (s.mt > 0) { s.mt -= g.dt; D.text(c, s.msg, W / 2, H * .45, 30, '#ffd21a'); }
    g.hud();
  } });

// ===== Alicia en el país de las caidillas (v08): llenar el cubo de bolitas, cruzar la plataforma giratoria de caramelo y vaciarlo en el bol. 2:30. Gana 4, pierde 2.
prueba({ id: 'alicia', name: 'Alicia en el país de las caidillas', cat: 'fisica', unit: 'bolas', icon: '🔵', dur: 150, pts: { win: 4, lose: 2 }, shot: 'arena',
  how: 'Mantén pulsado para llenar el cubo de bolitas y suelta para cruzar la plataforma giratoria. ¡Cuidado con el brazo que gira! Vacía las bolas en el bol transparente.',
  ai: (l) => ri(R(18, 32) * LV[l]),
  start(g) { const s = g.s = { x: 0, fill: 0, balls: 0, cross: false, fall: 0, a: 0, msg: '', mt: 0 };
    const spill = (m) => { if (s.cross && s.fall <= 0) { s.fall = 1.4; s.balls = Math.floor(s.balls / 3); s.msg = m; s.mt = 1.4; vo('h_trompazo'); sfx('pop'); } };
    g.bump = () => spill('💘 ¡La vaquilla enamorada te tira!'); s.spill = spill;
    g.onRelease = () => { if (!s.cross && s.balls > 0 && s.fall <= 0) s.cross = true; }; },
  bot(g) { const s = g.s; g.down = !s.cross && s.balls < 8; if (!s.cross && s.balls >= 8) g.onRelease(); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H, '#ffb0d8', '#ffe8f4');
    const cx = W * .5, cy = H * .66, r = Math.min(W * .26, H * .3);
    s.a += g.dt * 1.4;
    c.save(); c.translate(cx, cy); c.scale(1, .35); for (let i = 0; i < 16; i++) { c.fillStyle = i % 2 ? '#fff' : '#e2321e'; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, r, s.a + i * Math.PI / 8, s.a + (i + 1) * Math.PI / 8); c.fill(); } c.restore();
    const armA = s.a * 1.3; c.strokeStyle = '#e2321e'; c.lineWidth = 10; c.beginPath(); c.moveTo(cx, cy - 60); c.lineTo(cx + Math.cos(armA) * r, cy - 60 + Math.sin(armA) * r * .35); c.stroke();
    c.fillStyle = '#fff'; c.fillRect(cx - 6, cy - 80, 12, 80); for (let k = 0; k < 6; k++) { c.fillStyle = '#e2321e'; c.fillRect(cx - 6, cy - 80 + k * 14, 12, 6); }
    c.fillStyle = '#c84aff'; c.beginPath(); c.ellipse(W * .08, cy, 50, 16, 0, 0, 7); c.fill(); for (let i = 0; i < 12; i++) { c.fillStyle = ['#e23a2a', '#ffd21a', '#3a8aff', '#2fb84a'][i % 4]; c.beginPath(); c.arc(W * .08 - 36 + (i % 6) * 14, cy - 6 - Math.floor(i / 6) * 10, 6, 0, 7); c.fill(); }
    c.fillStyle = '#ffd21a'; c.fillRect(W * .9 - 18, cy - 40, 36, 60); c.strokeStyle = '#ffffffcc'; c.lineWidth = 3; c.beginPath(); c.arc(W * .9, cy - 70, 34, 0, Math.PI); c.stroke(); c.fillStyle = '#3a8aff88'; const lv = Math.min(1, g.score / 40); c.fillRect(W * .9 - 30, cy - 70 + 34 * (1 - lv), 60, 34 * lv);
    if (s.fall > 0) { s.fall -= g.dt; if (s.fall <= 0) { s.cross = false; s.x = 0; } }
    if (!s.cross && s.fall <= 0) { s.x = 0; if (g.down && !g.ended) { s.fill += g.dt * 6; s.balls = Math.min(12, Math.floor(s.fill)); } }
    if (s.cross && s.fall <= 0) { s.x += g.dt * .3; const px = W * .08 + (W * .82) * s.x; const ex = cx + Math.cos(armA) * r, d = Math.abs(px - cx); if (d < r && Math.abs(Math.sin(armA)) < .25 && Math.abs(ex - px) < 30) s.spill('¡Qué trompazo!');
      if (s.x >= 1) { g.score += s.balls; s.balls = 0; s.fill = 0; s.cross = false; sfx('brass'); } }
    const px = W * .08 + W * .82 * s.x;
    D.person(c, px, cy, 1.4, g.col, { run: s.cross ? g.t * 14 : 0, rot: s.fall > 0 ? 1.3 : 0 }); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(px - 10, cy - 50); c.lineTo(px + 10, cy - 50); c.lineTo(px + 14, cy - 20); c.lineTo(px - 14, cy - 20); c.fill();
    c.fillStyle = ['#e23a2a', '#2fb84a'][0]; c.fillRect(px + 16, cy - 46, 18, 20); D.text(c, String(s.balls), px + 25, cy - 56, 14);
    if (!s.cross && s.fall <= 0) D.text(c, g.down ? 'Llenando… suelta para cruzar' : 'MANTÉN para llenar el cubo', W / 2, 80, 22);
    if (s.mt > 0) { s.mt -= g.dt; D.text(c, s.msg, W / 2, H * .3, 28, '#e2163a'); }
    g.hud();
  } });
