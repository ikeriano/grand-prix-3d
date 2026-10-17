// Plató de la etapa actual (2023-2026), recreado a partir de las fotos de Iker (ref/plato/plato_01..06.jpg).
// Todo modelado por código; el medallón del logo es ORIGINAL (no se copia el logo real). Ligero: pocas luces, instancias y texturas de canvas pequeñas.
import * as THREE from 'three';
import { COLORS } from './data.js';

function tex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; }

// Medallón original: aro rojo y azul con una vaquilla caricaturesca y el texto GRAND PRIX
export function roundelTex() {
  return tex(256, 256, (c) => {
    c.fillStyle = '#ffd21a'; c.beginPath(); c.arc(128, 128, 126, 0, 7); c.fill();
    c.fillStyle = '#1f4fc8'; c.beginPath(); c.arc(128, 128, 116, 0, 7); c.fill();
    c.fillStyle = '#e2321e'; c.beginPath(); c.arc(128, 128, 86, 0, 7); c.fill();
    c.fillStyle = '#ffe9b0'; c.beginPath(); c.arc(128, 136, 58, 0, 7); c.fill();
    // cara de vaquilla
    c.fillStyle = '#c9782e'; c.beginPath(); c.ellipse(128, 132, 34, 40, 0, 0, 7); c.fill();
    c.fillStyle = '#f2b8a8'; c.beginPath(); c.ellipse(128, 156, 22, 14, 0, 0, 7); c.fill();
    c.fillStyle = '#fff'; [[112, 120], [144, 120]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 9, 0, 7); c.fill(); });
    c.fillStyle = '#111'; [[114, 121], [142, 121]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 4.5, 0, 7); c.fill(); });
    c.strokeStyle = '#f4ede2'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(100, 100); c.quadraticCurveTo(86, 82, 96, 74); c.moveTo(156, 100); c.quadraticCurveTo(170, 82, 160, 74); c.stroke();
    c.font = '900 26px Arial'; c.textAlign = 'center'; c.fillStyle = '#fff';
    const arc = (txt, r, a0, dir) => { for (let i = 0; i < txt.length; i++) { const a = a0 + dir * i * 0.17; c.save(); c.translate(128 + Math.cos(a) * r, 128 + Math.sin(a) * r); c.rotate(a + dir * Math.PI / 2); c.fillText(txt[i], 0, 8); c.restore(); } };
    arc('GRAND', 100, -Math.PI / 2 - 0.34, 1); arc('PRIX', 100, Math.PI / 2 + 0.26, -1);
  });
}

export function buildPlato2023(scene, low) {
  const G = new THREE.Group(); G.name = 'plato2023'; scene.add(G);
  const M = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: .6 }, o));
  const B = (c) => new THREE.MeshBasicMaterial({ color: c });
  const add = (geo, mat, x = 0, y = 0, z = 0, p = G) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); p.add(m); return m; };

  // Suelo azul claro brillante
  const floorTex = tex(256, 256, (c, w, h) => { const g = c.createRadialGradient(128, 128, 10, 128, 128, 180); g.addColorStop(0, '#bfeeff'); g.addColorStop(1, '#6cc8ea'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.globalAlpha = .18; c.fillStyle = '#fff'; for (let i = 0; i < 40; i++) { c.beginPath(); c.ellipse(Math.random() * w, Math.random() * h, 30, 8, Math.random() * 3, 0, 7); c.fill(); } });
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping; floorTex.repeat.set(4, 4);
  const floor = add(new THREE.PlaneGeometry(110, 80).rotateX(-Math.PI / 2), M('#ffffff', { map: floorTex, roughness: .12, metalness: .15 }), 0, 0, 5); floor.receiveShadow = true;

  // Fondo pintado: cielo azul a magenta, nubes, árboles y casas de dibujo animado
  const back = tex(2048, 512, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#ff5ab4'); g.addColorStop(.3, '#8fd0ff'); g.addColorStop(.7, '#8fd0ff'); g.addColorStop(1, '#ff5ab4'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.fillStyle = '#ffffffcc'; for (let i = 0; i < 9; i++) { const x = i * 240 + 60, y = 60 + (i % 3) * 40; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(x + k * 26, y + (k % 2) * 8, 26, 0, 7); c.fill(); } }
    c.fillStyle = '#4fae4a'; for (let i = 0; i < 8; i++) { const x = 120 + i * 260; c.beginPath(); c.ellipse(x, 300, 50, 70, 0, 0, 7); c.fill(); c.fillStyle = '#6a4520'; c.fillRect(x - 6, 350, 12, 80); c.fillStyle = '#4fae4a'; }
    c.fillStyle = '#b8b0a4'; for (const x of [140, 1880]) { c.fillRect(x - 70, 200, 140, 312); c.fillStyle = '#7ec8ff'; c.beginPath(); c.arc(x, 330, 46, Math.PI, 0); c.fill(); c.fillRect(x - 46, 330, 92, 182); c.fillStyle = '#b8b0a4'; }
  });
  const wall = add(new THREE.CylinderGeometry(52, 52, 26, 40, 1, true, -Math.PI * .72, Math.PI * .44), new THREE.MeshBasicMaterial({ map: back, side: THREE.BackSide }), 0, 13, 22);
  wall.rotation.y = Math.PI;

  // Casas de fachada (bloques con ventanas pintadas y tejado), inclinadas como en el decorado
  const houseCols = ['#f6c43a', '#f08a3a', '#9a6ad8', '#f27ab0', '#c7a6f0', '#e85a4a', '#f6c43a'];
  const winTex = tex(128, 256, (c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.globalCompositeOperation = 'source-over';
    for (let r = 0; r < 3; r++) for (let k = 0; k < 2; k++) { const x = 18 + k * 56, y = 20 + r * 80; c.fillStyle = '#fff8e0'; c.fillRect(x - 4, y - 4, 44, 60); c.fillStyle = '#3a6ad8'; c.fillRect(x, y, 36, 52); c.fillStyle = '#ffd'; c.fillRect(x + 16, y, 4, 52); c.fillRect(x, y + 24, 36, 4); c.fillStyle = '#e8508a'; c.fillRect(x - 4, y + 54, 44, 8); } });
  const houses = [[-40, -14, -0.25], [-31, -19, -0.12], [-22, -21, 0.08], [22, -21, -0.08], [31, -19, 0.12], [40, -14, 0.25], [-12, -25, 0], [12, -25, 0]];
  houses.forEach(([x, z, tilt], i) => { const hg = new THREE.Group(); hg.position.set(x, 0, z); hg.rotation.z = tilt * .4; hg.rotation.y = -x / 60; G.add(hg);
    const col = houseCols[i % houseCols.length]; const mat = M(col, { map: winTex }); const h = 15 + (i % 3) * 3;
    add(new THREE.BoxGeometry(8, h, 4), mat, 0, h / 2 + 4, 0, hg);
    const roof = add(new THREE.ConeGeometry(6.4, 4, 4), M('#a8402a'), 0, h + 6, 0, hg); roof.rotation.y = Math.PI / 4; roof.scale.z = .6;
    add(new THREE.BoxGeometry(6, .3, 1.2), M('#ffffff'), 0, h * .55 + 4, 2.4, hg); // balcón
    add(new THREE.BoxGeometry(6, .6, .6), M('#3fa04a'), 0, h * .55 + 4.5, 2.8, hg); // jardinera
  });

  // Edificio central tipo castillo/ayuntamiento
  const castle = new THREE.Group(); castle.position.set(0, 0, -20); G.add(castle);
  const brick = tex(256, 256, (c, w, h) => { for (let r = 0; r < 16; r++) for (let k = 0; k < 8; k++) { c.fillStyle = (r + k) % 3 ? '#3f6ad8' : '#5a86f0'; if ((r * 7 + k) % 11 === 0) c.fillStyle = '#f6c43a'; c.fillRect(k * 32 + (r % 2) * 16 - 16, r * 16, 30, 14); } });
  add(new THREE.BoxGeometry(22, 12, 6), M('#ffffff', { map: brick }), 0, 6, 0, castle);
  add(new THREE.BoxGeometry(24, 1, 8), M('#f4f0e8'), 0, 12.3, .5, castle);
  const balTex = tex(256, 64, (c, w, h) => { c.fillStyle = '#fff'; for (let i = 0; i < 16; i++) { c.beginPath(); c.ellipse(8 + i * 16, 34, 5, 22, 0, 0, 7); c.fill(); } c.fillRect(0, 0, w, 10); c.fillRect(0, 54, w, 10); });
  add(new THREE.PlaneGeometry(24, 3), new THREE.MeshBasicMaterial({ map: balTex, transparent: true, side: THREE.DoubleSide }), 0, 14.3, 4.5, castle);
  const doorTex = tex(128, 256, (c, w, h) => { c.fillStyle = '#f4f0e8'; c.fillRect(0, 0, w, h); c.fillStyle = '#ff6ac8'; c.beginPath(); c.arc(64, 90, 56, Math.PI, 0); c.fill(); c.fillRect(8, 90, 112, 166); c.fillStyle = '#ffd2f0'; for (let r = 0; r < 6; r++) for (let k = 0; k < 4; k++) c.fillRect(18 + k * 24, 100 + r * 24, 18, 18); c.fillStyle = '#7ac8ff'; c.beginPath(); c.arc(64, 60, 26, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 3; for (let a = 0; a < 8; a++) { c.beginPath(); c.moveTo(64, 60); c.lineTo(64 + Math.cos(a * .785) * 26, 60 + Math.sin(a * .785) * 26); c.stroke(); } });
  for (const x of [-7, 7]) add(new THREE.PlaneGeometry(5, 10), new THREE.MeshBasicMaterial({ map: doorTex }), x, 5, 3.02, castle);
  const rt = roundelTex();
  const medal = add(new THREE.CylinderGeometry(3.2, 3.2, .5, 32).rotateX(Math.PI / 2), [M('#ffd21a'), new THREE.MeshBasicMaterial({ map: rt }), M('#ffd21a')], 0, 6.5, 3.3, castle);
  add(new THREE.CylinderGeometry(1.6, 1.6, .3, 24).rotateX(Math.PI / 2), [M('#ffd21a'), new THREE.MeshBasicMaterial({ map: rt }), M('#ffd21a')], 0, 16.5, 4.5, castle);
  for (const x of [-5, 5]) { const fl = add(new THREE.PlaneGeometry(3.6, 2.2), M(x < 0 ? '#1f4fc8' : '#1f4fc8'), x, 16.5, 4.5, castle); add(new THREE.CircleGeometry(.8, 20), new THREE.MeshBasicMaterial({ map: rt }), x, 16.5, 4.52, castle); }
  // escalones turquesa delante del castillo
  for (let i = 0; i < 3; i++) add(new THREE.BoxGeometry(26 - i * 2, .5, 2), M('#4fe0e8', { emissive: '#1ab8d0', emissiveIntensity: .5 }), 0, .25 + i * .5, 4.5 - i * 1.4, castle);

  // Gradas: azul a la izquierda, amarillo a la derecha. Escalones con LED turquesa y balaustrada blanca
  const crowdMats = {}; const baluster = new THREE.CylinderGeometry(.14, .2, 1.4, 6);
  function grada(side, color) {
    const g = new THREE.Group(); g.position.set(side * 26, 0, -8); g.rotation.y = side * 0.32; G.add(g);
    const W = 26;
    for (let r = 0; r < 6; r++) { add(new THREE.BoxGeometry(W, 1.3, 3), M('#3fc6dc', { roughness: .4 }), 0, .65 + r * 1.3, 10 - r * 3, g);
      add(new THREE.BoxGeometry(W, .12, .12), B('#9ff8ff'), 0, 1.32 + r * 1.3, 11.5 - r * 3, g); }
    const n = 22; const bm = new THREE.InstancedMesh(baluster, M('#ffffff'), n * 2); const d = new THREE.Object3D();
    for (let i = 0; i < n; i++) for (let k = 0; k < 2; k++) { d.position.set(-W / 2 + .6 + i * (W - 1.2) / (n - 1), (k ? 7.8 : 2) + .7, k ? 0 - 0.5 : 9); d.updateMatrix(); bm.setMatrixAt(i * 2 + k, d.matrix); }
    g.add(bm); for (const [y, z] of [[3.4, 9], [9.2, -.5]]) add(new THREE.BoxGeometry(W, .3, .5), M('#ffffff'), 0, y, z, g);
    const cnt = low ? 80 : 180; const crowd = new THREE.InstancedMesh(new THREE.CapsuleGeometry(.32, .7, 2, 6), M('#ffffff'), cnt);
    for (let i = 0; i < cnt; i++) { const r = 1 + (i % 5); d.position.set(-W / 2 + 1 + Math.random() * (W - 2), 1.95 + r * 1.3, 10 - r * 3 + Math.random() * .6); d.updateMatrix(); crowd.setMatrixAt(i, d.matrix);
      crowd.setColorAt(i, new THREE.Color(COLORS[color]).offsetHSL(0, 0, (Math.random() - .5) * .15)); }
    g.add(crowd); g.userData.crowd = crowd; return g;
  }
  const gl = grada(-1, 'azul'), gr = grada(1, 'amarillo');

  // Piscina lateral con ventanales en arco y pantallón del marcador
  const pool = new THREE.Group(); pool.position.set(-40, 0, 16); pool.rotation.y = Math.PI / 2; G.add(pool);
  add(new THREE.BoxGeometry(20, 1.4, 10), M('#ffffff'), 0, .7, 0, pool);
  const water = add(new THREE.BoxGeometry(19, .2, 9), M('#1ab0e8', { roughness: .08, metalness: .2, transparent: true, opacity: .9 }), 0, 1.35, 0, pool);
  const archTex = tex(512, 256, (c, w, h) => { c.fillStyle = '#e8d8c8'; c.fillRect(0, 0, w, h); for (let i = 0; i < 4; i++) { const x = 64 + i * 128; c.fillStyle = '#ff8a3a'; c.beginPath(); c.arc(x, 110, 46, Math.PI, 0); c.fill(); c.fillRect(x - 46, 110, 92, 130); c.fillStyle = '#ffd2a0'; c.fillRect(x - 3, 70, 6, 170); } });
  add(new THREE.PlaneGeometry(22, 11), new THREE.MeshBasicMaterial({ map: archTex }), 0, 5.5, -5.5, pool);
  const screen = add(new THREE.PlaneGeometry(10, 5.6), B('#ffffff'), 0, 14, -5.4, pool);
  add(new THREE.BoxGeometry(10.6, 6.2, .4), M('#111'), 0, 14, -5.7, pool);

  // Mesa de jueces amarilla y azul con carteles de los pueblos + atril amarillo del presentador
  const desk = new THREE.Group(); desk.position.set(9, 0, -12); G.add(desk);
  add(new THREE.BoxGeometry(9, 2.2, 1.6), M('#1f4fc8'), 0, 1.1, 0, desk); add(new THREE.BoxGeometry(9.4, .3, 2), M('#ffd21a'), 0, 2.3, 0, desk);
  const signs = []; for (const x of [-2.4, 2.4]) { const s = add(new THREE.PlaneGeometry(4, 1.6), new THREE.MeshBasicMaterial({ color: '#fff' }), x, 1.2, .81, desk); signs.push(s); }
  const lectern = new THREE.Group(); lectern.position.set(-6, 0, -9); G.add(lectern);
  add(new THREE.BoxGeometry(1.6, 2.4, 1), M('#ffd21a'), 0, 1.2, 0, lectern); add(new THREE.BoxGeometry(2, .25, 1.3), M('#ffe86a'), 0, 2.5, .1, lectern);
  for (const x of [-.7, .7]) add(new THREE.CylinderGeometry(.08, .08, 3, 6), M('#ffd21a'), x, 1.5, -.6, lectern);
  function setTowns(a, b) { [a, b].forEach((n, i) => { const t = tex(256, 96, (c) => { c.fillStyle = i ? '#ffd21a' : '#ffd21a'; c.fillRect(0, 0, 256, 96); c.fillStyle = i ? '#1f4fc8' : '#1f4fc8'; c.fillRect(6, 6, 244, 84); c.fillStyle = '#fff'; c.font = '900 40px Arial'; c.textAlign = 'center'; c.fillText(String(n).toUpperCase().slice(0, 12), 128, 62); }); signs[i].material.map = t; signs[i].material.needsUpdate = true; }); }
  setTowns('AZUL', 'AMARILLO');

  // Iluminación: estructura de truss con muchos focos blancos y haces
  const truss = new THREE.Group(); G.add(truss); const tm = M('#2a2a30', { metalness: .6 });
  for (const z of [-14, 0, 14]) add(new THREE.BoxGeometry(90, .6, .6), tm, 0, 26, z, truss);
  for (const x of [-30, 0, 30]) add(new THREE.BoxGeometry(.6, .6, 40), tm, x, 26, 0, truss);
  add(new THREE.PlaneGeometry(120, 80).rotateX(Math.PI / 2), B('#0a0c14'), 0, 30, 0, truss);
  const spots = new THREE.InstancedMesh(new THREE.CylinderGeometry(.6, .8, 1.2, 8), B('#ffffff'), 36); const d = new THREE.Object3D();
  for (let i = 0; i < 36; i++) { d.position.set(-42 + (i % 12) * 7.6, 25.2, -14 + Math.floor(i / 12) * 14); d.updateMatrix(); spots.setMatrixAt(i, d.matrix); }
  truss.add(spots);
  const beamMat = new THREE.MeshBasicMaterial({ color: '#cfe8ff', transparent: true, opacity: low ? .05 : .08, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
  const beams = []; for (let i = 0; i < (low ? 4 : 8); i++) { const b = add(new THREE.ConeGeometry(2.6, 24, 12, 1, true), beamMat, -30 + i * (60 / (low ? 3 : 7)), 13.5, -6 + (i % 2) * 10); beams.push(b); }
  for (let i = 0; i < 10; i++) add(new THREE.SphereGeometry(.35, 8, 6), B('#3a7aff'), -40 + i * 9, 24, 15);

  // Atrezo: colchonetas azules/rojas, escalones rojos, bolos hinchables, balón de playa colgado de una cuerda, toldo de rayas y patos
  const props = new THREE.Group(); G.add(props);
  const bowl = new THREE.Group(); bowl.position.set(10, 0, 4); props.add(bowl);
  for (let i = 0; i < 5; i++) { const m = add(new THREE.BoxGeometry(5, .6, 3), M(i % 2 ? '#2a5ad8' : '#3a7aff'), -3 + (i % 3) * 4.2, .3, -1 + Math.floor(i / 3) * 3.2, bowl); m.rotation.y = (i - 2) * .12; }
  for (let i = 0; i < 3; i++) add(new THREE.BoxGeometry(8 - i * 1.6, .7, 2.4 - i * .4), M('#e2321e'), 4, .35 + i * .7, -4 + i * .3, bowl);
  const pinPts = []; [[0, 0], [.9, .1], [1.2, .6], [1.1, 1.4], [.7, 2.3], [.45, 2.9], [.6, 3.5], [.55, 4.1], [0, 4.4]].forEach(([r, y]) => pinPts.push(new THREE.Vector2(r, y)));
  const pinTex = tex(64, 256, (c) => { c.fillStyle = '#fff'; c.fillRect(0, 0, 64, 256); c.fillStyle = '#ffd21a'; c.fillRect(0, 0, 22, 256); c.fillRect(42, 0, 22, 256); c.fillStyle = '#fff'; c.fillRect(0, 40, 64, 14); });
  const pinGeo = new THREE.LatheGeometry(pinPts, 14); const pinMat = M('#ffffff', { map: pinTex, roughness: .35 });
  const pins = []; [[2, -4.4], [4, -4.1], [6, -3.8], [3, -2.4], [5, -2.2]].forEach(([x, z]) => { const p = add(pinGeo, pinMat, x, 2.1, z, bowl); p.scale.setScalar(.9); pins.push(p); });
  const ballTex = tex(256, 128, (c) => { ['#ffffff', '#ffd21a', '#ffffff', '#3a9aff', '#ffffff', '#ff5a3a'].forEach((col, i) => { c.fillStyle = col; c.fillRect(i * 43, 0, 43, 128); }); });
  const pivot = new THREE.Group(); pivot.position.set(-2, 25.5, 4); props.add(pivot);
  const rope = add(new THREE.CylinderGeometry(.04, .04, 21, 4), B('#ddd'), 0, -10.5, 0, pivot);
  const ball = add(new THREE.SphereGeometry(1.6, 20, 14), M('#fff', { map: ballTex, roughness: .3 }), 0, -21.5, 0, pivot);
  const awn = new THREE.Group(); awn.position.set(30, 0, 12); awn.rotation.y = -Math.PI / 3; props.add(awn);
  const stripe = tex(256, 64, (c) => { for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#fff' : '#e2321e'; c.fillRect(i * 32, 0, 32, 64); } });
  const aw = add(new THREE.PlaneGeometry(12, 4), M('#fff', { map: stripe, side: THREE.DoubleSide }), 0, 9, 0, awn); aw.rotation.x = -1.0;
  for (const x of [-5.6, 5.6]) add(new THREE.CylinderGeometry(.15, .15, 9, 6), M('#ddd'), x, 4.5, 1.6, awn);
  const ducks = []; for (let i = 0; i < 4; i++) { const dk = new THREE.Group(); dk.position.set(-6 + i * 4, 0, 4); awn.add(dk); const pen = i % 2;
    add(new THREE.SphereGeometry(1, 12, 10), M(pen ? '#222' : '#ffd21a'), 0, 1.6, 0, dk).scale.set(1, 1.4, 1); add(new THREE.SphereGeometry(.65, 10, 8), M(pen ? '#222' : '#ffd21a'), 0, 3.2, 0, dk);
    if (pen) add(new THREE.SphereGeometry(.7, 10, 8), M('#fff'), 0, 1.6, .4, dk).scale.set(.8, 1.2, .6);
    add(new THREE.ConeGeometry(.25, .7, 8).rotateX(Math.PI / 2), M('#ff8a1a'), 0, 3.1, .8, dk); ducks.push(dk); }

  // Bailarines de la cabecera: patos y pingüinos con disfraz, 2 bolas hinchables (zorb) — solo visibles en la cabecera
  const dancers = new THREE.Group(); dancers.visible = false; G.add(dancers); const dlist = [];
  const yel = M('#ffd21a'), blk = M('#1a2a6a'), wht = M('#ffffff'), org = M('#ff8a1a');
  const bodyG = new THREE.SphereGeometry(1, 10, 8), headG = new THREE.SphereGeometry(.62, 10, 8), beakG = new THREE.ConeGeometry(.22, .6, 6).rotateX(Math.PI / 2), footG = new THREE.BoxGeometry(.5, .15, .7);
  for (let i = 0; i < (low ? 16 : 26); i++) { const d = new THREE.Group(); const pen = i % 2; const bm = pen ? blk : yel;
    add(bodyG, bm, 0, 1.5, 0, d).scale.set(.9, 1.3, .9); add(headG, bm, 0, 3, 0, d); if (pen) add(bodyG, wht, 0, 1.4, .45, d).scale.set(.6, 1, .5);
    add(beakG, org, 0, 2.9, .7, d); add(footG, org, -.35, .08, .3, d); add(footG, org, .35, .08, .3, d);
    const a = i * 2.39, r = 3 + (i % 7) * 2.2; d.position.set(Math.cos(a) * r, 0, Math.sin(a) * r * .7 - 2); d.userData = { a, r, ph: Math.random() * 6 }; dancers.add(d); dlist.push(d); }
  const zorbs = []; for (let i = 0; i < 2; i++) { const z = add(new THREE.SphereGeometry(1.8, 16, 12), new THREE.MeshStandardMaterial({ color: '#dff6ff', transparent: true, opacity: .35, roughness: .05 }), -4 + i * 8, 1.8, 3, dancers); zorbs.push(z); }
  const inflat = []; for (let i = 0; i < 3; i++) { const f = new THREE.Group(); const st = tex(64, 64, (c) => { for (let k = 0; k < 8; k++) { c.fillStyle = k % 2 ? '#fff' : '#2a4ad8'; c.fillRect(0, k * 8, 64, 8); } });
    add(new THREE.SphereGeometry(1.5, 14, 10), M('#fff', { map: st }), 0, 2, 0, f).scale.set(1, 1.15, 1); add(new THREE.SphereGeometry(1.1, 12, 8, 0, 6.3, 0, 1.6), yel, 0, 1, 0, f).rotation.x = Math.PI; add(headG, M('#f1c6a0'), 0, 3.6, 0, f).scale.setScalar(.6);
    f.position.set(-3 + i * 3, 0, -1); dancers.add(f); inflat.push(f); }
  function dance(t) { dlist.forEach((d, i) => { const u = d.userData; d.position.y = Math.abs(Math.sin(t * 4.2 + u.ph)) * .6; d.rotation.y = Math.sin(t * 1.5 + u.ph) * .8; d.rotation.z = Math.sin(t * 4.2 + u.ph) * .15;
      const a = u.a + t * .15 * (i % 2 ? 1 : -1); d.position.x = Math.cos(a) * u.r; d.position.z = Math.sin(a) * u.r * .7 - 2; });
    zorbs.forEach((z, i) => { z.position.x = -6 + i * 10 + Math.sin(t * .8 + i) * 4; z.rotation.z = -t * (i ? 1 : -1); }); inflat.forEach((f, i) => { f.position.y = Math.abs(Math.sin(t * 3 + i)) * .5; f.rotation.y = Math.sin(t * 2 + i) * .5; }); }

  // Personajes virtuales (presentador en el atril, copresentadora) — muñecos originales
  return { dancers, dance,
    G, gl, gr, screen, setTowns, castle, pool, desk, lectern, bowl, ball, pivot, ducks, pins, medal,
    update(t) { pivot.rotation.z = Math.sin(t * 1.1) * .35; pivot.rotation.x = Math.sin(t * .7) * .1; beams.forEach((b, i) => { b.rotation.z = Math.sin(t * .5 + i) * .25; b.rotation.x = Math.cos(t * .4 + i) * .2; });
      ducks.forEach((d, i) => { d.position.x = -6 + ((i * 4 + t * 1.5) % 16); d.rotation.z = Math.sin(t * 6 + i) * .1; }); water.position.y = 1.35 + Math.sin(t * 2) * .03; },
    SHOTS: { overview: [[0, 14, 42], [0, 7, -12]], pool: [[-18, 9, 16], [-40, 8, 16]], host: [[-4, 4, 0], [-6, 3, -9]], board: [[-24, 13, 16], [-45, 13, 16]], logo: [[0, 9, -5], [0, 8, -17]],
      vaca: [[16, 5, 24], [14, 2, 12]], dino: [[-16, 5, 24], [-14, 2, 12]], ramp: [[0, 8, 22], [10, 2, 1]], arena: [[14, 7, 26], [26, 3, 14]], ring: [[0, 14, 42], [0, 7, -12]], bolera: [[-4, 7, 20], [8, 3, 0]], pato: [[18, 6, 28], [30, 4, 14]], gradas: [[0, 8, 14], [26, 6, -10]] },
  };
}
