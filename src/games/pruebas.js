// Primer lote de pruebas jugables. Para añadir una: prueba({...}) con start/frame/ai/bot.
import { prueba, D, R, LV } from './engine.js';
import { PREGUNTAS, DICCIONARIO, NUMERICAS, POSES } from './banco.js';
import { sfx } from '../audio.js';
const vo = (k) => { if (window.__fast) return; try { const a = new Audio('assets/voz/' + k + '.mp3'); a.play().catch(() => {}); } catch (e) {} };
const ri = (n) => Math.round(n);

// ============ CON VAQUILLA ============
prueba({ id: 'pichichi', name: 'La vaca pichichi', cat: 'vaquilla', unit: 'goles', dur: 0, how: 'Toca para chutar cuando la flecha apunte al hueco. ¡La vaquilla es la portera! 6 tiros.',
  ai: (l) => ri(R(1.5, 3.8) * LV[l]),
  start(g) { g.s = { shots: 6, ang: 0, ball: null, keeper: 0, msg: '' }; g.onTap = () => { const s = g.s; if (s.ball || g.ended || !s.shots) return; s.ball = { t: 0, tx: Math.sin(s.ang) }; s.shots--; }; },
  bot(g) { if (!g.s.ball && Math.abs(Math.sin(g.s.ang) - (-Math.sin(g.t * 1.3) * 0.5)) > 0.6 && Math.random() < 0.08) g.onTap(); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H); c.fillStyle = '#4caf50'; c.fillRect(0, H * .5, W, H * .5);
    const gx = W / 2, gy = H * .42, gw = W * .5, gh = H * .22;
    c.strokeStyle = '#fff'; c.lineWidth = 8; c.strokeRect(gx - gw / 2, gy - gh, gw, gh); c.fillStyle = '#ffffff22'; c.fillRect(gx - gw / 2, gy - gh, gw, gh);
    s.keeper = Math.sin(g.t * 1.3 * (g.level === 'dificil' ? 1.5 : 1)) * 0.5;
    D.vaca(c, gx + s.keeper * gw * .8, gy, 1.5, g.t, s.keeper > 0 ? -1 : 1);
    s.ang = Math.sin(g.t * 2.2) * 0.75;
    const bx = gx, by = H * .88;
    if (!s.ball) { c.strokeStyle = '#ffd21a'; c.lineWidth = 6; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + Math.sin(s.ang) * gw * .7, by - H * .3); c.stroke(); }
    let ballx = bx, bally = by;
    if (s.ball) { s.ball.t += g.dt * 1.8; const k = Math.min(1, s.ball.t); ballx = bx + s.ball.tx * gw * .66 * k; bally = by - (by - (gy - gh / 2)) * k;
      if (k >= 1 && !s.ball.done) { s.ball.done = 1; const tx = s.ball.tx * .66 / .5 * .5; const saved = Math.abs(s.ball.tx * .66 - s.keeper * .8 * 1) < 0.22; const out = Math.abs(s.ball.tx) > 0.74;
        s.msg = out ? '¡Fuera!' : saved ? '¡Para la vaquilla!' : '¡GOOOL!'; if (!out && !saved) g.score++; setTimeout(() => { s.ball = null; s.msg = ''; if (!s.shots) g.end(); }, 700); } }
    D.person(c, bx - 30, by + 20, 1.3, g.col);
    c.fillStyle = '#fff'; c.beginPath(); c.arc(ballx, bally, 12, 0, 7); c.fill(); c.strokeStyle = '#000'; c.lineWidth = 2; c.stroke();
    if (s.msg) D.text(c, s.msg, W / 2, H * .55, 44, '#ffd21a');
    g.hud(); D.text(c, 'Tiros: ' + s.shots, 12, 104, 18, '#fff', 'left');
  } });

prueba({ id: 'regadores', name: 'Los regadores', cat: 'vaquilla', unit: 'litros', dur: 35, how: 'Mantén pulsado para correr con el cubo hasta la tinaja. ¡Suelta cuando la vaquilla mire!',
  ai: (l) => ri(R(14, 26) * LV[l]),
  start(g) { g.s = { x: 0, dir: 1, water: 10, look: false, lt: R(2, 4), hit: 0 }; },
  bot(g) { g.down = !g.s.look && !(g.s.lt < 0.35); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H); D.sand(c, 0, H * .55, W, H * .45);
    s.lt -= g.dt; if (s.lt <= 0) { s.look = !s.look; s.lt = s.look ? R(1, 2) : R(1.5, 3.5); }
    const run = g.down && !g.ended && s.hit <= 0; if (s.hit > 0) s.hit -= g.dt;
    if (run) { s.x += s.dir * g.dt * 0.32; if (s.look) { s.hit = 1.2; s.water = Math.max(0, s.water - 5); } }
    if (s.x >= 1) { s.x = 1; s.dir = -1; g.score += s.water; s.water = 0; } if (s.x <= 0 && s.dir < 0) { s.x = 0; s.dir = 1; s.water = 10; }
    const x0 = W * .1, x1 = W * .85, px = x0 + (x1 - x0) * s.x, py = H * .82;
    c.fillStyle = '#2b88d8'; c.fillRect(x0 - 50, py - 40, 40, 40); D.text(c, 'POZO', x0 - 30, py - 50, 14);
    c.fillStyle = '#8a5a2a'; c.fillRect(x1 + 10, py - 70, 50, 70); c.fillStyle = '#2ec4e8'; const lv = Math.min(1, g.score / 40); c.fillRect(x1 + 14, py - 4 - 62 * lv, 42, 62 * lv); D.text(c, 'TINAJA', x1 + 35, py - 82, 14);
    D.vaca(c, W * .5, H * .58, 1.4, s.look ? g.t : 0, s.look ? 1 : -1); D.text(c, s.look ? '👀 ¡QUIETO!' : 'Corre…', W * .5, H * .4, 26, s.look ? '#ff5b4b' : '#fff');
    D.person(c, px, py, 1.4, g.col, { run: run ? g.t * 14 : 0, rot: s.hit > 0 ? 1.2 : 0 });
    c.fillStyle = '#9aa'; c.fillRect(px + 14, py - 50, 16, 18); c.fillStyle = '#2ec4e8'; c.fillRect(px + 15, py - 49 + 17 * (1 - s.water / 10), 14, 17 * s.water / 10);
    D.btn(c, W - 190, H - 80, 170, 60, g.down ? 'CORRIENDO' : 'MANTÉN', '#ffd21a', g.down);
    g.hud();
  } });

prueba({ id: 'huevos', name: 'Huevos fritos', cat: 'vaquilla', unit: 'huevos', dur: 30, how: 'Desliza o toca a izquierda/derecha para cambiar de carril. Coge huevos y esquiva a la vaquilla.',
  ai: (l) => ri(R(8, 15) * LV[l]),
  start(g) { g.s = { lane: 1, items: [], next: 0, hit: 0 }; const mv = (d) => { g.s.lane = Math.max(0, Math.min(2, g.s.lane + d)); };
    g.onTap = (x) => mv(x < g.W / 2 ? -1 : 1); g.swipe = (d) => mv(d === 'l' ? -1 : d === 'r' ? 1 : 0); },
  bot(g) { const s = g.s; const th = s.items.find((i) => i.y > .55 && i.y < .8 && i.lane === s.lane && i.vaca); if (th && Math.random() < .2) g.onTap(s.lane === 0 ? g.W : s.lane === 2 ? 0 : (Math.random() < .5 ? 0 : g.W)); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H); D.sand(c, 0, H * .3, W, H * .7);
    const lx = (l, y) => W / 2 + (l - 1) * W * (0.12 + 0.18 * y); const yy = (y) => H * .3 + y * H * .7;
    c.strokeStyle = '#fff8'; c.lineWidth = 3; for (const l of [0.5, 1.5]) { c.beginPath(); c.moveTo(lx(l, 0), yy(0)); c.lineTo(lx(l, 1), yy(1)); c.stroke(); }
    s.next -= g.dt; if (s.next <= 0 && !g.ended) { s.next = R(.45, .9); s.items.push({ lane: ri(R(-.49, 2.49)), y: 0, vaca: Math.random() < .38 }); }
    if (s.hit > 0) s.hit -= g.dt;
    for (const i of s.items) { i.y += g.dt * (0.45 + g.t * 0.01);
      if (!i.done && i.y > .82 && i.y < .95 && i.lane === s.lane) { i.done = 1; if (i.vaca) { s.hit = 1; g.score = Math.max(0, g.score - 2); } else g.score++; }
      const sc = 0.4 + i.y; if (i.done && !i.vaca) continue;
      if (i.vaca) D.vaca(c, lx(i.lane, i.y), yy(i.y), sc, g.t); else { c.fillStyle = '#fff'; c.beginPath(); c.ellipse(lx(i.lane, i.y), yy(i.y) - 10 * sc, 14 * sc, 18 * sc, 0, 0, 7); c.fill(); c.strokeStyle = '#ccc'; c.stroke(); } }
    s.items = s.items.filter((i) => i.y < 1.1);
    D.person(c, lx(s.lane, .9), yy(.9), 1.5, g.col, { run: g.t * 12, rot: s.hit > 0 ? Math.sin(g.t * 30) * .5 : 0 });
    c.fillStyle = '#333'; c.beginPath(); c.ellipse(lx(s.lane, .9) + 26, yy(.9) - 60, 18, 6, 0, 0, 7); c.fill();
    g.hud();
  } });

// ============ FÍSICAS ============
prueba({ id: 'rampa', name: 'La rampa', cat: 'fisica', unit: 'subidas', dur: 30, how: 'Toca muy rápido para subir la rampa enjabonada y tocar la campana. ¡Si paras, resbalas!',
  ai: (l) => ri(R(3, 6) * LV[l]),
  start(g) { g.s = { y: 0, v: 0, ring: 0 }; g.onTap = () => { if (!g.ended) g.s.v += 0.065; }; g.onDown = g.onTap; g.onTap = null; },
  bot(g) { if (Math.random() < .42) g.onDown(); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H);
    s.v -= g.dt * 0.55; s.v *= 0.96; s.y = Math.max(0, s.y + s.v * g.dt * 10); if (s.y === 0) s.v = Math.max(0, s.v);
    if (s.y >= 1) { g.score++; s.y = 0; s.v = 0; s.ring = 1; }
    if (s.ring > 0) s.ring -= g.dt;
    const x0 = W * .15, y0 = H * .9, x1 = W * .8, y1 = H * .25;
    c.fillStyle = '#e8f6ff'; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.lineTo(x1, y0); c.fill();
    c.strokeStyle = '#3aa0ff'; c.lineWidth = 6; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
    for (let i = 0; i < 12; i++) { c.fillStyle = '#ffffffaa'; c.beginPath(); c.arc(x0 + (x1 - x0) * ((i * .083 + g.t * .02) % 1), y0 + (y1 - y0) * ((i * .083 + g.t * .02) % 1) - 8, 5 + (i % 3) * 2, 0, 7); c.fill(); }
    c.fillStyle = '#ffd21a'; c.beginPath(); c.arc(x1 + 20, y1 - 30, 18 + (s.ring > 0 ? Math.sin(g.t * 50) * 4 : 0), 0, 7); c.fill();
    D.person(c, x0 + (x1 - x0) * s.y, y0 + (y1 - y0) * s.y, 1.3, g.col, { run: s.v > .02 ? g.t * 18 : 0, rot: -0.6 });
    if (s.ring > 0) D.text(c, '🔔 ¡DING!', W / 2, H * .2, 40, '#ffd21a');
    D.text(c, '👆 ¡TOCA RÁPIDO!', W * .3, H * .3, 26); g.hud();
  } });

prueba({ id: 'rompepuertas', name: 'Rompepuertas', cat: 'fisica', unit: 'paredes', dur: 30, how: 'Elige una puerta: dos son de papel y una es de verdad. ¡Atraviesa todas las paredes que puedas!',
  ai: (l) => ri(R(5, 9) * LV[l]),
  start(g) { const s = g.s = { solid: ri(R(-.49, 2.49)), anim: 0, pick: -1, bad: 0 };
    g.onTap = (x, y) => { if (s.anim > 0 || g.ended) return; const d = Math.floor(x / (g.W / 3)); s.pick = d; s.anim = 0.6; s.bad = d === s.solid; }; },
  bot(g) { if (g.s.anim <= 0 && Math.random() < .05) g.onTap(R(0, g.W), 200); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H, '#ffb36b', '#ffe3b8'); c.fillStyle = '#c8a070'; c.fillRect(0, H * .8, W, H * .2);
    if (s.anim > 0) { s.anim -= g.dt; if (s.anim <= 0) { if (!s.bad) g.score++; s.solid = ri(R(-.49, 2.49)); s.pick = -1; } }
    for (let i = 0; i < 3; i++) { const x = W / 6 + i * W / 3, w = W / 4.2, h = H * .55, y = H * .8 - h;
      const broken = s.pick === i && !s.bad && s.anim > 0; const reveal = s.pick >= 0 && s.anim > 0;
      c.fillStyle = reveal && i === s.solid ? '#7a4a22' : ['#ff6b6b', '#6bc5ff', '#8ee86b'][i]; if (!broken) { c.fillRect(x - w / 2, y, w, h); c.strokeStyle = '#fff'; c.lineWidth = 4; c.strokeRect(x - w / 2, y, w, h); }
      else { c.strokeStyle = '#fff'; c.setLineDash([8, 8]); c.strokeRect(x - w / 2, y, w, h); c.setLineDash([]); }
      D.text(c, ['A', 'B', 'C'][i], x, y + h / 2, 48); }
    if (s.pick >= 0) { const x = W / 6 + s.pick * W / 3; const k = 1 - Math.max(0, s.anim) / .6; D.person(c, x, H * .95 - k * 30, 1.6 + k * .4, g.col, { rot: s.bad && k > .5 ? -1.4 : 0, armsUp: !s.bad }); if (s.bad && k > .5) D.text(c, '¡PUM! ¡Era de madera!', W / 2, H * .25, 30, '#ff5b4b'); if (!s.bad && k > .3) D.text(c, '¡CRASH!', W / 2, H * .25, 40, '#ffd21a'); }
    g.hud();
  } });

// Recreada con el decorado de las fotos 3-4: bolos hinchables (concursantes disfrazados) sobre la tarima roja y balón de playa gigante colgado de una cuerda.
function pinGuy(c, x, y, s, down, t) { c.save(); c.translate(x, y); c.rotate(down ? 1.35 : Math.sin(t * 3 + x) * .05); c.scale(s, s);
  c.fillStyle = '#00000033'; c.beginPath(); c.ellipse(0, 2, 22, 6, 0, 0, 7); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-20, 0); c.bezierCurveTo(-28, -40, -10, -60, -12, -80); c.bezierCurveTo(-16, -100, -10, -118, 0, -120); c.bezierCurveTo(10, -118, 16, -100, 12, -80); c.bezierCurveTo(10, -60, 28, -40, 20, 0); c.closePath(); c.fill();
  c.save(); c.clip(); c.fillStyle = '#ffd21a'; c.fillRect(-30, -130, 18, 140); c.fillRect(12, -130, 18, 140); c.fillStyle = '#fff'; c.fillRect(-30, -86, 60, 8); c.restore();
  c.fillStyle = '#f1c6a0'; c.beginPath(); c.arc(0, -98, 7, 0, 7); c.fill(); c.restore(); }
function beachBall(c, x, y, r, rot) { const cols = ['#fff', '#ffd21a', '#fff', '#3a9aff', '#fff', '#ff5a3a']; for (let i = 0; i < 6; i++) { c.fillStyle = cols[i]; c.beginPath(); c.moveTo(x, y); c.arc(x, y, r, rot + i * Math.PI / 3, rot + (i + 1) * Math.PI / 3); c.fill(); } c.strokeStyle = '#0003'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r, 0, 7); c.stroke(); }
function platoBg(c, W, H) { // fondo del plató actual: pared rosa-azul con casas, suelo azul claro
  const g = c.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#ff5ab4'); g.addColorStop(.5, '#8fd0ff'); g.addColorStop(1, '#ff5ab4'); c.fillStyle = g; c.fillRect(0, 0, W, H * .55);
  const hc = ['#f6c43a', '#f08a3a', '#9a6ad8', '#f27ab0', '#c7a6f0']; for (let i = 0; i < 7; i++) { const x = i * W / 6 - 30, w = W / 8, h = H * (.28 + (i % 3) * .05); c.fillStyle = hc[i % 5]; c.fillRect(x, H * .55 - h, w, h); c.fillStyle = '#a8402a'; c.beginPath(); c.moveTo(x - 8, H * .55 - h); c.lineTo(x + w / 2, H * .55 - h - 30); c.lineTo(x + w + 8, H * .55 - h); c.fill();
    c.fillStyle = '#3a6ad8'; for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) c.fillRect(x + 10 + k * w / 2, H * .55 - h + 14 + r * 44, w / 2 - 20, 30); }
  const f = c.createLinearGradient(0, H * .55, 0, H); f.addColorStop(0, '#8ad8f4'); f.addColorStop(1, '#c8f2ff'); c.fillStyle = f; c.fillRect(0, H * .55, W, H * .45);
  c.fillStyle = '#4fe0e8'; c.fillRect(0, H * .55, W, 6); }
prueba({ id: 'pinguipato', name: 'Tiro al pingüi-pato', cat: 'fisica', unit: 'puntos', dur: 30, how: 'Patos y pingüinos desfilan bajo el toldo. Toca uno para lanzarle el balón de la cuerda. Pato 1 punto, pingüino 2. ¡Al árbitro no!',
  ai: (l) => ri(R(9, 16) * LV[l]),
  start(g) { const s = g.s = { list: [], next: 0, shot: null };
    g.onDown = (x) => { if (s.shot || g.ended) return; s.shot = { tx: x, t: 0 }; }; },
  bot(g) { const t = g.s.list.find((d) => !d.hit && !d.ref && d.x > .25 && d.x < .75); if (t && !g.s.shot && Math.random() < .08) g.onDown(t.x * g.W + t.v * g.W * .45); },
  frame(g) {
    const { c, W, H } = g, s = g.s; platoBg(c, W, H);
    for (let i = 0; i < 12; i++) { c.fillStyle = i % 2 ? '#fff' : '#e2321e'; c.beginPath(); c.moveTo(i * W / 12, 0); c.lineTo((i + 1) * W / 12, 0); c.lineTo((i + 1) * W / 12, H * .12); c.lineTo(i * W / 12, H * .12); c.fill(); }
    s.next -= g.dt; if (s.next <= 0 && !g.ended) { s.next = R(.7, 1.3); const r = Math.random(); s.list.push({ x: -.06, v: R(.14, .24), kind: r < .12 ? 'ref' : r < .45 ? 'pen' : 'pato', hit: 0 }); }
    const gy = H * .82;
    for (const d of s.list) { d.x += d.v * g.dt; const x = d.x * W, sc = Math.min(1.2, H / 450);
      c.save(); c.translate(x, gy); if (d.hit) c.rotate(Math.min(1.4, d.hit * 4)); c.scale(sc, sc);
      if (d.kind === 'ref') { c.restore(); D.person(c, x, gy, 1.3 * sc, '#111'); D.text(c, 'ÁRBITRO', x, gy - 100 * sc, 13); continue; }
      const col = d.kind === 'pen' ? '#222' : '#ffd21a'; c.fillStyle = col; c.beginPath(); c.ellipse(0, -40, 26, 40, 0, 0, 7); c.fill(); c.beginPath(); c.arc(0, -92, 18, 0, 7); c.fill();
      if (d.kind === 'pen') { c.fillStyle = '#fff'; c.beginPath(); c.ellipse(0, -36, 15, 28, 0, 0, 7); c.fill(); }
      c.fillStyle = '#ff8a1a'; c.beginPath(); c.moveTo(10, -94); c.lineTo(30, -88); c.lineTo(10, -84); c.fill(); c.fillRect(-14, -4, 10, 5); c.fillRect(4, -4, 10, 5);
      c.fillStyle = '#111'; c.beginPath(); c.arc(6, -98, 3, 0, 7); c.fill(); c.restore();
      if (d.hit) d.hit += g.dt; }
    s.list = s.list.filter((d) => d.x < 1.1);
    const px = W / 2, L = gy - 60;
    let bx = px, by = L * .35;
    if (s.shot) { s.shot.t += g.dt * 2; const k = Math.min(1, s.shot.t); bx = px + (s.shot.tx - px) * k; by = L * .35 + (gy - 60 - L * .35) * Math.sin(k * Math.PI / 2);
      if (k >= 1 && !s.shot.done) { s.shot.done = 1; const tgt = s.list.find((d) => !d.hit && Math.abs(d.x * W - bx) < 40);
        if (tgt) { tgt.hit = .01; g.score = Math.max(0, g.score + (tgt.kind === 'ref' ? -3 : tgt.kind === 'pen' ? 2 : 1)); } setTimeout(() => { s.shot = null; }, 350); } }
    c.strokeStyle = '#ddd'; c.lineWidth = 2; c.beginPath(); c.moveTo(px, H * .12); c.lineTo(bx, by); c.stroke(); beachBall(c, bx, by, 26, g.t * 4);
    g.hud();
  } });

// ============ PISCINA ============
prueba({ id: 'salta', name: '¡Salta!', cat: 'piscina', unit: 'saltos', dur: 30, how: 'Una barra gigante gira sobre la piscina. Toca para saltar justo cuando llegue a tus pies.',
  ai: (l) => ri(R(9, 16) * LV[l]),
  start(g) { g.s = { a: 0, jump: 0, fall: 0, sp: 1.6 }; g.onDown = () => { if (g.s.jump <= 0 && g.s.fall <= 0) g.s.jump = .7; }; },
  bot(g) { const d = ((g.s.a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2); if (d > Math.PI * 2 - .55 && Math.random() < .5) g.onDown(); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H); D.water(c, 0, H * .7, W, H * .3, g.t);
    const cx = W / 2, cy = H * .62, r = Math.min(W * .4, H * .5);
    c.fillStyle = '#ddd'; c.beginPath(); c.ellipse(cx, cy, r, r * .3, 0, 0, 7); c.fill(); c.fillStyle = '#e23a2a'; c.beginPath(); c.arc(cx, cy, 16, 0, 7); c.fill();
    const prev = s.a; if (!g.ended) { s.sp = 1.6 + g.t * .05; s.a += g.dt * s.sp; }
    const pa = Math.PI / 2; // posición del jugador (delante)
    const crossed = Math.floor((prev - pa) / (Math.PI * 2)) !== Math.floor((s.a - pa) / (Math.PI * 2));
    if (crossed && s.fall <= 0 && !g.ended) { if (s.jump > 0.12 && s.jump < 0.62) g.score++; else { s.fall = 1.3; } }
    if (s.jump > 0) s.jump -= g.dt; if (s.fall > 0) s.fall -= g.dt;
    const bx = cx + Math.cos(s.a) * r, by = cy + Math.sin(s.a) * r * .3;
    const pjy = cy + r * .3 - Math.max(0, Math.sin(Math.max(0, s.jump) / .7 * Math.PI)) * 80;
    const behind = Math.sin(s.a) < 0;
    const drawBar = () => { c.strokeStyle = '#ff9b1a'; c.lineWidth = 14; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx, cy); c.lineTo(bx, by); c.stroke(); c.fillStyle = '#ffd21a'; c.beginPath(); c.arc(bx, by, 16, 0, 7); c.fill(); };
    if (behind) drawBar();
    if (s.fall > 0) D.text(c, '¡PLAF! 💦', cx, cy + r * .3, 36, '#fff'); else D.person(c, cx, pjy, 1.4, g.col, { armsUp: s.jump > 0 });
    if (!behind) drawBar(); g.hud();
  } });

prueba({ id: 'cocos', name: 'Los recoge-cocos', cat: 'piscina', unit: 'cocos', dur: 30, how: 'Arrastra la barca por la piscina y recoge los cocos que caen de la palmera.',
  ai: (l) => ri(R(10, 18) * LV[l]),
  start(g) { g.s = { x: .5, items: [], next: 0 }; g.onMove = (x) => { if (g.down) g.s.x = Math.max(.08, Math.min(.92, x / g.W)); }; g.onDown = (x) => { g.s.x = Math.max(.08, Math.min(.92, x / g.W)); }; },
  bot(g) { const t = g.s.items.filter((i) => !i.done && i.y < .85).sort((a, b) => b.y - a.y)[0]; if (t) g.s.x += Math.sign(t.x - g.s.x) * Math.min(Math.abs(t.x - g.s.x), g.dt * .9); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H); D.water(c, 0, H * .78, W, H * .22, g.t);
    c.fillStyle = '#2f8a3a'; for (let i = 0; i < 5; i++) { c.beginPath(); c.ellipse(W * (.1 + i * .2), 60, W * .12, 30, Math.sin(i) * .3, 0, 7); c.fill(); }
    s.next -= g.dt; if (s.next <= 0 && !g.ended) { s.next = R(.5, 1); s.items.push({ x: R(.08, .92), y: .08, v: R(.25, .4), bomb: Math.random() < .15 }); }
    for (const i of s.items) { if (i.done) continue; i.y += g.dt * i.v; i.v += g.dt * .08;
      if (i.y > .78 && i.y < .84 && Math.abs(i.x - s.x) < .08) { i.done = 1; g.score += i.bomb ? -2 : 1; g.score = Math.max(0, g.score); }
      c.fillStyle = i.bomb ? '#e23a2a' : '#6a4520'; c.beginPath(); c.arc(i.x * W, i.y * H, 16, 0, 7); c.fill(); if (i.bomb) D.text(c, '🍅', i.x * W, i.y * H, 20); }
    s.items = s.items.filter((i) => i.y < 1.05 && !i.done);
    const bx = s.x * W, by = H * .82; c.fillStyle = g.col; c.beginPath(); c.moveTo(bx - 60, by - 10); c.lineTo(bx + 60, by - 10); c.lineTo(bx + 42, by + 16); c.lineTo(bx - 42, by + 16); c.fill();
    D.person(c, bx, by - 8, 1.1, g.col, { armsUp: true }); g.hud();
  } });

prueba({ id: 'tomatazos', name: 'Tomatazos', cat: 'piscina', unit: 'blancos', dur: 25, how: 'Toca los blancos que pasan sobre la piscina para lanzarles un tomate. ¡No le des al árbitro!',
  ai: (l) => ri(R(12, 20) * LV[l]),
  start(g) { const s = g.s = { tg: [], next: 0, sp: [] };
    g.onDown = (x, y) => { if (g.ended) return; for (const t of s.tg) if (!t.hit && Math.hypot(t.x * g.W - x, t.y * g.H - y) < 46) { t.hit = 1; g.score += t.ref ? -3 : 1; g.score = Math.max(0, g.score); s.sp.push({ x, y, t: .5 }); return; } }; },
  bot(g) { const t = g.s.tg.find((t) => !t.hit && !t.ref && t.x > .1 && t.x < .9); if (t && Math.random() < .07) g.onDown(t.x * g.W, t.y * g.H); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H); D.water(c, 0, H * .7, W, H * .3, g.t);
    s.next -= g.dt; if (s.next <= 0 && !g.ended) { s.next = R(.4, .8); const l = Math.random() < .5; s.tg.push({ x: l ? -.05 : 1.05, y: R(.25, .62), v: (l ? 1 : -1) * R(.2, .38), ref: Math.random() < .14 }); }
    for (const t of s.tg) { t.x += t.v * g.dt; if (t.hit) continue;
      if (t.ref) { D.person(c, t.x * W, t.y * H + 40, 1.1, '#111'); D.text(c, 'ÁRBITRO', t.x * W, t.y * H - 40, 12); }
      else { c.fillStyle = '#fff'; c.beginPath(); c.arc(t.x * W, t.y * H, 36, 0, 7); c.fill(); c.fillStyle = '#e23a2a'; c.beginPath(); c.arc(t.x * W, t.y * H, 24, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(t.x * W, t.y * H, 10, 0, 7); c.fill(); } }
    s.tg = s.tg.filter((t) => t.x > -.1 && t.x < 1.1);
    for (const p of s.sp) { p.t -= g.dt; c.fillStyle = '#d42a1a'; for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(p.x + Math.cos(i) * (1 - p.t) * 40, p.y + Math.sin(i * 2) * (1 - p.t) * 40, 8, 0, 7); c.fill(); } }
    s.sp = s.sp.filter((p) => p.t > 0); g.hud();
  } });

// ============ YINCANA ============
prueba({ id: 'sandia', name: 'La sandía', cat: 'yincana', unit: 'rondas', dur: 0, how: 'Mira el orden en que se iluminan las casetas y repítelo. Cada ronda, una más.',
  ai: (l) => ri(R(3, 6) * LV[l]),
  start(g) { const s = g.s = { seq: [], show: 0, idx: 0, input: 0, flash: -1, ft: 0, wait: 1, fail: 0 };
    s.add = () => { s.seq.push(ri(R(-.49, 3.49))); s.show = 1; s.idx = 0; s.ft = 0; s.input = 0; };
    g.onDown = (x, y) => { if (!s.input || g.ended) return; const k = (x < g.W / 2 ? 0 : 1) + (y < g.H * .58 ? 0 : 2); s.flash = k; s.ft = .25;
      if (k === s.seq[s.idx]) { s.idx++; if (s.idx === s.seq.length) { g.score++; s.input = 0; s.wait = .9; } } else { s.fail = 1; s.input = 0; g.end(); } }; },
  bot(g) { const s = g.s; if (s.input && Math.random() < .08) { const k = Math.random() < .9 ? s.seq[s.idx] : 0; g.onDown((k % 2 ? .75 : .25) * g.W, (k < 2 ? .4 : .8) * g.H); } },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H); D.sand(c, 0, H * .2, W, H * .8);
    if (s.wait > 0) { s.wait -= g.dt; if (s.wait <= 0) s.add(); }
    if (s.show) { s.ft += g.dt; const k = Math.floor(s.ft / .7); s.flash = (s.ft % .7) < .45 ? s.seq[k] : -1; if (k >= s.seq.length) { s.show = 0; s.input = 1; s.flash = -1; } }
    else if (s.ft > 0) { s.ft -= g.dt; if (s.ft <= 0) s.flash = -1; }
    const icons = ['🍉', '🍓', '🌽', '🍋'], cols = ['#2fb84a', '#e23a2a', '#ffb31a', '#ffe14a'];
    for (let k = 0; k < 4; k++) { const x = (k % 2) * W / 2 + 20, y = 56 + (k < 2 ? 0 : (H - 56) / 2), w = W / 2 - 40, h = (H - 56) / 2 - 20;
      c.fillStyle = s.flash === k ? '#fff' : cols[k]; c.globalAlpha = s.flash === k ? 1 : .75; c.beginPath(); c.roundRect(x, y, w, h, 20); c.fill(); c.globalAlpha = 1; D.text(c, icons[k], x + w / 2, y + h / 2, 60); }
    D.text(c, s.show ? 'Mira…' : s.input ? '¡Tu turno!' : s.fail ? '¡Fallo!' : '¡Bien!', W / 2, H * .58, 30, '#fff'); g.hud();
  } });

// ============ CONOCIMIENTO (alcaldes y padrinos) ============
function quiz(id, name, how, unit, bank, mk) {
  return prueba({ id, name, cat: 'saber', unit, dur: 0, how, ai: (l) => ri(R(2, 4.5) * LV[l]),
    start(g) { const s = g.s = { q: bank.slice().sort(() => Math.random() - .5).slice(0, 6), i: 0, sel: -1, st: 0, fuse: 12, boom: 0 };
      s.cur = () => mk(s.q[s.i]);
      g.onDown = (x, y) => { if (s.sel >= 0 || g.ended || s.boom) return; const o = s.cur().opts; for (let k = 0; k < o.length; k++) { const by = g.H * .45 + k * g.H * .15; if (y > by && y < by + g.H * .12) { s.sel = k; s.st = .9; if (k === s.cur().ok) g.score++; } } }; },
    bot(g) { if (g.s.sel < 0 && !g.s.boom && Math.random() < .03) { const k = Math.random() < .7 ? g.s.cur().ok : 0; g.onDown(g.W / 2, g.H * .45 + k * g.H * .15 + 5); } },
    frame(g) {
      const { c, W, H } = g, s = g.s; D.sky(c, W, H, '#0a1a4a', '#22408a');
      if (id === 'patata') { if (s.sel < 0 && !s.boom && !g.ended) { s.fuse -= g.dt; if (s.fuse <= 0) { s.boom = 1.2; } } if (s.boom) { s.boom -= g.dt; if (s.boom <= 0) { s.boom = 0; g.end(); return g.hud(); } }
        const sh = s.fuse < 4 ? Math.sin(g.t * 40) * 4 : 0; c.fillStyle = s.boom ? '#ff5b1a' : '#c08a3a'; c.beginPath(); c.ellipse(W - 80 + sh, 110, 40, 28, .3, 0, 7); c.fill(); D.text(c, s.boom ? '💥' : Math.ceil(s.fuse) + '', W - 80, 110, 26); }
      if (s.st > 0) { s.st -= g.dt; if (s.st <= 0) { const ok = s.sel === s.cur().ok; s.sel = -1; s.i++; if (id === 'patata') s.fuse = ok ? Math.max(5, s.fuse + 2) : s.fuse - 3; if (s.i >= s.q.length) return g.end(); } }
      const q = s.cur(); if (!q) return g.hud();
      c.fillStyle = '#000a'; c.beginPath(); c.roundRect(W * .06, H * .16, W * .88, H * .24, 16); c.fill();
      wrap(c, q.q, W / 2, H * .28, W * .8, Math.min(26, W / 30));
      q.opts.forEach((o, k) => { const by = H * .45 + k * H * .15; const done = s.sel >= 0; const col = done && k === q.ok ? '#2fb84a' : done && k === s.sel ? '#e23a2a' : '#1f6fe0';
        c.fillStyle = col; c.strokeStyle = '#ffd21a'; c.lineWidth = 3; c.beginPath(); c.roundRect(W * .12, by, W * .76, H * .12, 30); c.fill(); c.stroke(); D.text(c, o, W / 2, by + H * .06, Math.min(22, W / 36)); });
      g.hud(); D.text(c, `Pregunta ${Math.min(s.i + 1, s.q.length)}/${s.q.length}`, 12, 64, 16, '#fff', 'left');
    } });
}
function wrap(c, t, x, y, mw, size) { c.font = `900 ${size}px Arial`; const w = t.split(' '); const lines = []; let l = ''; for (const s of w) { if (c.measureText(l + s).width > mw) { lines.push(l); l = ''; } l += s + ' '; } lines.push(l); lines.forEach((ln, i) => D.text(c, ln.trim(), x, y + (i - (lines.length - 1) / 2) * size * 1.2, size)); }
quiz('diccionario', 'El diccionario', 'El padrino elige la definición correcta de cada palabra rara.', 'aciertos', DICCIONARIO, (q) => q && ({ q: '¿Qué significa «' + q[0] + '»?', opts: q[1], ok: q[2] }));

// ============ ESPECIAL 2026 ============
prueba({ id: 'capitanes', name: 'Pasión de capitanes', cat: 'especial', unit: 'puntos', dur: 0, how: 'Duelo de capitanes: toca en cuanto el semáforo se ponga VERDE. Al mejor de 5. ¡Se juega la Vaquilla dorada!',
  ai: () => 2, // el rival gana 2 rondas si no le ganas antes: hay que ganar 3
  start(g) { const s = g.s = { r: 0, st: 'wait', t: R(1.2, 3), you: 0, riv: 0, msg: '', rt: 0 };
    g.onDown = () => { if (g.ended) return; if (s.st === 'wait') { s.msg = '¡Te has adelantado!'; s.riv++; s.st = 'res'; s.t = 1.2; } else if (s.st === 'go') { const rt = s.rt; const ai = R(.28, .55); if (rt < ai) { s.you++; s.msg = `¡Ganas! ${Math.round(rt * 1000)} ms`; } else { s.riv++; s.msg = `Más rápido el rival (${Math.round(ai * 1000)} ms)`; } s.st = 'res'; s.t = 1.3; } }; },
  bot(g) { if (g.s.st === 'go' && g.s.rt > .3) g.onDown(); },
  frame(g) {
    const { c, W, H } = g, s = g.s; D.sky(c, W, H, '#1a0a3a', '#4a1a6a');
    if (!g.ended) { if (s.st === 'go') s.rt += g.dt; else s.t -= g.dt;
      if (s.st === 'wait' && s.t <= 0) { s.st = 'go'; s.rt = 0; }
      if (s.st === 'go' && s.rt > 1) { s.riv++; s.msg = 'Demasiado lento…'; s.st = 'res'; s.t = 1.2; }
      if (s.st === 'res' && s.t <= 0) { if (s.you >= 3 || s.riv >= 3) { g.score = s.you; g.opts.rivalScore = s.riv; g.end(s.you); } else { s.st = 'wait'; s.t = R(1.2, 3); s.msg = ''; } } }
    c.fillStyle = '#222'; c.beginPath(); c.roundRect(W / 2 - 60, H * .2, 120, 200, 20); c.fill();
    ['#e23a2a', '#ffb31a', '#2fb84a'].forEach((col, i) => { const on = (s.st === 'go' && i === 2) || (s.st === 'wait' && i === 0); c.fillStyle = on ? col : '#444'; c.beginPath(); c.arc(W / 2, H * .2 + 36 + i * 64, 26, 0, 7); c.fill(); });
    D.person(c, W * .2, H * .9, 2, g.col, { armsUp: s.st === 'res' && s.msg.startsWith('¡Ganas') }); D.person(c, W * .8, H * .9, 2, g.rcol);
    D.vaca(c, W / 2, H * .95, 1.2, 0, 1, true); D.text(c, 'VAQUILLA DORADA', W / 2, H * .97 - 90, 14, '#ffd21a');
    D.text(c, `${s.you} - ${s.riv}`, W / 2, H * .14, 36, '#ffd21a'); if (s.msg) D.text(c, s.msg, W / 2, H * .7, 28);
    g.hud(`${s.you}`);
  } });
