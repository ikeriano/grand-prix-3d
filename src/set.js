// Plató 3D PROVISIONAL del Grand Prix (modular: cada zona es un grupo que se puede cambiar cuando lleguen las fotos).
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { COLORS } from './data.js';
import { buildPlato2023 } from './plato2023.js';

export const QLEVELS = ['auto', 'media', 'alta', 'ultra'];
export const QNAMES = { auto: 'Auto', media: 'Media', alta: 'Alta', ultra: 'Ultra (4K)' };
const PR = { media: 1, alta: 2, ultra: 3 };

export function createSet(container, quality) {
  const low = quality === 'media' || (quality === 'auto' && (navigator.hardwareConcurrency || 4) <= 4);
  const renderer = new THREE.WebGLRenderer({ antialias: !low, powerPreference: 'high-performance' });
  let pr = quality === 'auto' ? (low ? 1 : Math.min(devicePixelRatio, 2)) : Math.min(devicePixelRatio * 1.5, PR[quality]);
  renderer.setPixelRatio(pr); renderer.setSize(innerWidth, innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = !low; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#7fc6ff'); scene.fog = new THREE.Fog('#bfe4ff', 90, 220);
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 500); camera.position.set(0, 24, 58);
  const M = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: .7 }, o));
  const mesh = (geo, mat, x = 0, y = 0, z = 0, p = scene) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = !low; p.add(m); return m; };

  // Luz de verano
  scene.add(new THREE.HemisphereLight('#ffffff', '#c8a070', 1.1));
  const sun = new THREE.DirectionalLight('#fff4d8', 2.2); sun.position.set(30, 60, 25); sun.castShadow = !low;
  sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -60, right: 60, top: 60, bottom: -60 }); scene.add(sun);

  const Z = {}; // zonas
  const group = (n) => { const g = new THREE.Group(); g.name = n; scene.add(g); Z[n] = g; return g; };

  // --- Suelo y explanada ---
  const base = group('base');
  mesh(new THREE.PlaneGeometry(400, 400).rotateX(-Math.PI / 2), M('#e9cf93'), 0, 0, 0, base);
  mesh(new THREE.CircleGeometry(48, 48).rotateX(-Math.PI / 2), M('#f3e2b0'), 0, 0.02, 0, base);

  // --- Piscina central con plataformas móviles ---
  const pool = group('pool');
  mesh(new THREE.BoxGeometry(34, 1.2, 18), M('#ffffff'), 0, .6, 0, pool);
  const water = mesh(new THREE.BoxGeometry(32, .2, 16), M('#28b8e8', { roughness: .15, metalness: .1, transparent: true, opacity: .9 }), 0, 1.1, 0, pool);
  const plats = [];
  for (let i = 0; i < 3; i++) { const p = mesh(new THREE.CylinderGeometry(2.2, 2.2, .5, 20), M(['#ff5a3a', '#ffd21a', '#3a8aff'][i]), -9 + i * 9, 1.6, 0, pool); plats.push(p); }
  const log = mesh(new THREE.CylinderGeometry(.9, .9, 30, 16).rotateZ(Math.PI / 2), M('#8a5a2a'), 0, 3, -5.5, pool);
  const bar = new THREE.Group(); bar.position.set(9, 1.4, 4); pool.add(bar);
  mesh(new THREE.CylinderGeometry(.6, .6, 2, 12), M('#e23a2a'), 0, .8, 0, bar); mesh(new THREE.BoxGeometry(12, .5, .5), M('#ff9b1a'), 6, 1.6, 0, bar);

  // --- Rampa enjabonada ---
  const ramp = group('ramp'); ramp.position.set(-30, 0, -6);
  const rg = new THREE.BoxGeometry(6, .6, 18); const rm = mesh(rg, M('#ffffff', { roughness: .2 }), 0, 4, 0, ramp); rm.rotation.x = -0.45;
  mesh(new THREE.BoxGeometry(6.6, 9, 1), M('#2a6ad8'), 0, 4.5, -8.6, ramp); mesh(new THREE.SphereGeometry(.8, 12, 10), M('#ffd21a', { metalness: .8, roughness: .3 }), 0, 10, -8.6, ramp);

  // --- Plaza de toros (etapas clásicas) ---
  const ring = group('ring'); ring.position.set(0, 0, -48);
  mesh(new THREE.CylinderGeometry(22, 22, .1, 48), M('#e3b36a'), 0, .06, 0, ring);
  const wall = mesh(new THREE.CylinderGeometry(22.5, 22.5, 2, 48, 1, true), M('#b8322a', { side: THREE.DoubleSide }), 0, 1, 0, ring);
  for (let k = 0; k < 4; k++) mesh(new THREE.CylinderGeometry(30 - k * .1 + k * 2.5, 23 + k * 2.5, 1.6, 48, 1, true), M(k % 2 ? '#f4ede2' : '#d9cbb3', { side: THREE.DoubleSide }), 0, 2.6 + k * 1.6, 0, ring);
  // --- Explanada moderna (etapa actual, sustituye a la plaza) ---
  const arena = group('arena'); arena.position.set(0, 0, -44);
  mesh(new THREE.BoxGeometry(44, .3, 22), M('#5fbf5a'), 0, .15, 0, arena);
  for (let i = 0; i < 6; i++) mesh(new THREE.BoxGeometry(3, 3, 3), M(['#ff5a3a', '#ffd21a', '#3a8aff'][i % 3]), -15 + i * 6, 1.8, 6 * ((i % 2) ? 1 : -1) * .5, arena);
  for (let i = 0; i < 2; i++) mesh(new THREE.TorusGeometry(4, .5, 10, 30), M('#ffffff'), -10 + i * 20, 4.5, -8, arena);

  // --- Gradas con público de color ---
  const gradas = group('gradas');
  for (const side of [-1, 1]) { const gg = new THREE.Group(); gg.position.set(side * 42, 0, 4); gg.rotation.y = -side * Math.PI / 2; gradas.add(gg);
    for (let r = 0; r < 5; r++) mesh(new THREE.BoxGeometry(40, 1.2, 2), M(side < 0 ? '#2a6ad8' : '#f3c21a'), 0, .6 + r * 1.2, -r * 2, gg);
    const dummy = new THREE.Object3D(); const n = low ? 60 : 160;
    const crowd = new THREE.InstancedMesh(new THREE.CapsuleGeometry(.35, .6, 2, 6), M('#ffffff'), n);
    for (let i = 0; i < n; i++) { dummy.position.set(-19 + Math.random() * 38, 1.9 + (i % 5) * 1.2, -(i % 5) * 2); dummy.updateMatrix(); crowd.setMatrixAt(i, dummy.matrix); crowd.setColorAt(i, new THREE.Color().setHSL(side < 0 ? .6 : .14, .8, .4 + Math.random() * .3)); }
    gg.add(crowd); }

  // --- Marcador (textura de canvas) ---
  const board = group('board'); board.position.set(0, 0, 26);
  const bc = document.createElement('canvas'); bc.width = 1024; bc.height = 512; const btex = new THREE.CanvasTexture(bc); btex.colorSpace = THREE.SRGBColorSpace;
  mesh(new THREE.BoxGeometry(22, 12, 1), M('#111'), 0, 10, 0, board);
  const screen = mesh(new THREE.PlaneGeometry(21, 10.5), new THREE.MeshBasicMaterial({ map: btex }), 0, 10, -.55, board); screen.rotation.y = Math.PI;
  mesh(new THREE.BoxGeometry(1, 5, 1), M('#666'), -8, 2.5, 0, board); mesh(new THREE.BoxGeometry(1, 5, 1), M('#666'), 8, 2.5, 0, board);
  function drawBoard(towns, title = 'CLASIFICACIÓN') {
    const c = bc.getContext('2d'); const g = c.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#0a2a7a'); g.addColorStop(1, '#03103a'); c.fillStyle = g; c.fillRect(0, 0, 1024, 512);
    c.fillStyle = '#ffd21a'; c.font = '900 56px Arial'; c.textAlign = 'center'; c.fillText(title, 512, 70);
    const h = Math.min(100, 400 / Math.max(1, towns.length));
    towns.forEach((t, i) => { const y = 100 + i * h; c.fillStyle = COLORS[t.color] || t.color; c.fillRect(40, y, 944, h - 12); c.fillStyle = t.color === 'amarillo' ? '#3a1a00' : '#fff';
      c.font = `900 ${Math.round(h * .5)}px Arial`; c.textAlign = 'left'; c.fillText(t.name.toUpperCase().slice(0, 22), 70, y + h * .6); c.textAlign = 'right'; c.fillText(String(t.pts), 950, y + h * .6); });
    btex.needsUpdate = true;
  }
  drawBoard([{ name: 'Azul', color: 'azul', pts: 0 }, { name: 'Amarillo', color: 'amarillo', pts: 0 }]);

  // --- Logo 3D (recreación provisional) ---
  const logo = group('logo'); logo.position.set(0, 0, -20);
  const lc = document.createElement('canvas'); lc.width = 1024; lc.height = 384; const ltex = new THREE.CanvasTexture(lc); ltex.colorSpace = THREE.SRGBColorSpace;
  const shape = new THREE.Shape(); const w = 9, h = 3.2, r = 1.4; shape.moveTo(-w + r, -h); shape.lineTo(w - r, -h); shape.quadraticCurveTo(w, -h, w, -h + r); shape.lineTo(w, h - r); shape.quadraticCurveTo(w, h, w - r, h); shape.lineTo(-w + r, h); shape.quadraticCurveTo(-w, h, -w, h - r); shape.lineTo(-w, -h + r); shape.quadraticCurveTo(-w, -h, -w + r, -h);
  const lplate = mesh(new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: true, bevelSize: .3, bevelThickness: .3, bevelSegments: 2 }), M('#e2321e', { metalness: .3, roughness: .4 }), 0, 12, 0, logo);
  const lface = mesh(new THREE.PlaneGeometry(17.4, 6.4), new THREE.MeshBasicMaterial({ map: ltex, transparent: true }), 0, 12, 1.35, logo);
  const sunDisc = mesh(new THREE.CylinderGeometry(4, 4, .8, 32).rotateX(Math.PI / 2), M('#ffc81a', { emissive: '#ff9a00', emissiveIntensity: .4 }), 7.5, 15, -.4, logo);
  const rays = new THREE.Group(); rays.position.set(7.5, 15, -.6); logo.add(rays);
  for (let i = 0; i < 12; i++) { const m = mesh(new THREE.ConeGeometry(.6, 2.2, 6), M('#ffb000'), 0, 0, 0, rays); const a = i / 12 * Math.PI * 2; m.position.set(Math.cos(a) * 5.4, Math.sin(a) * 5.4, 0); m.rotation.z = a - Math.PI / 2; }
  mesh(new THREE.CylinderGeometry(.4, .4, 9, 8), M('#999'), 0, 4.5, 0, logo);
  function drawLogo(text = 'GRAND PRIX', sub = 'DEL VERANO') {
    const c = lc.getContext('2d'); c.clearRect(0, 0, 1024, 384); c.textAlign = 'center';
    c.font = `900 ${text.length > 14 ? 92 : 150}px Arial Black, Arial`; c.lineWidth = 18; c.strokeStyle = '#7a1000'; c.strokeText(text, 512, 220); c.fillStyle = '#fff'; c.fillText(text, 512, 220);
    c.font = '900 64px Arial'; c.fillStyle = '#ffd21a'; c.lineWidth = 10; c.strokeStyle = '#7a1000'; c.strokeText(sub, 512, 320); c.fillText(sub, 512, 320); ltex.needsUpdate = true;
  }
  drawLogo();

  // --- Decoración de verano: palmeras y banderines ---
  const deco = group('deco');
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + .2, x = Math.cos(a) * 52, z = Math.sin(a) * 52; mesh(new THREE.CylinderGeometry(.4, .6, 9, 6), M('#8a6a3a'), x, 4.5, z, deco);
    for (let k = 0; k < 5; k++) { const lf = mesh(new THREE.ConeGeometry(.8, 5, 4), M('#2f9a3a'), x, 9, z, deco); lf.rotation.set(1.2, k * 1.25, 0); } }
  const flags = new THREE.InstancedMesh(new THREE.ConeGeometry(.5, 1, 3), new THREE.MeshBasicMaterial({ color: '#fff' }), 60); const d = new THREE.Object3D();
  for (let i = 0; i < 60; i++) { const t = i / 60; d.position.set(-36 + t * 72, 14 - Math.sin(t * Math.PI) * 3, 10); d.rotation.set(Math.PI, 0, 0); d.updateMatrix(); flags.setMatrixAt(i, d.matrix); flags.setColorAt(i, new THREE.Color(['#e23a2a', '#ffd21a', '#2a6ad8', '#2fb84a'][i % 4])); }
  deco.add(flags);

  // --- Personajes 3D sencillos (virtuales) ---
  const chars = group('chars');
  function figure(col, x, z, s = 1, head = '#f1c6a0') { const f = new THREE.Group(); f.position.set(x, 0, z); f.scale.setScalar(s);
    mesh(new THREE.CylinderGeometry(.35, .45, 1.6, 8), M(col), 0, 1.6, 0, f); mesh(new THREE.SphereGeometry(.38, 10, 8), M(head), 0, 2.75, 0, f);
    mesh(new THREE.BoxGeometry(.5, .9, .5), M('#333'), 0, .45, 0, f); chars.add(f); return f; }
  const host = figure('#ffffff', -4, 14); const co = figure('#ff5aa0', 4, 14);
  const vaca = new THREE.Group(); vaca.position.set(14, 0, 12); chars.add(vaca);
  mesh(new THREE.BoxGeometry(2.4, 1.2, 1.1), M('#7a4a22'), 0, 1.6, 0, vaca); mesh(new THREE.BoxGeometry(.9, .8, .8), M('#7a4a22'), 1.5, 2.2, 0, vaca);
  for (const [x, z] of [[-.9, -.4], [-.9, .4], [.9, -.4], [.9, .4]]) mesh(new THREE.CylinderGeometry(.15, .15, 1, 6), M('#3b2412'), x, .5, z, vaca);
  for (const z of [-.3, .3]) { const h = mesh(new THREE.ConeGeometry(.12, .5, 6), M('#f4ede2'), 1.6, 2.8, z, vaca); }
  const dino = new THREE.Group(); dino.position.set(-14, 0, 12); chars.add(dino);
  mesh(new THREE.SphereGeometry(1.1, 12, 10), M('#4fbf3a'), 0, 2, 0, dino).scale.set(1.3, 1, 1); mesh(new THREE.SphereGeometry(.7, 10, 8), M('#4fbf3a'), .9, 3.3, 0, dino); mesh(new THREE.ConeGeometry(.5, 2, 8).rotateZ(Math.PI / 2), M('#4fbf3a'), -1.8, 1.8, 0, dino);
  for (const z of [-.5, .5]) mesh(new THREE.CylinderGeometry(.25, .3, 1.2, 6), M('#3a9a2a'), 0, .6, z, dino);
  const clown = figure('#9a3aff', 0, 18, 1, '#ffffff'); mesh(new THREE.SphereGeometry(.12, 8, 6), M('#ff0000'), 0, 2.75, .38, clown);

  const P23 = buildPlato2023(scene, low); P23.screen.material.map = btex; P23.screen.material.needsUpdate = true;
  P23.G.add(chars); // los personajes también salen en el plató moderno
  const PROV = [base, pool, ramp, arena, gradas, board, logo, deco];
  let modern = false;
  const ETAPA_GRP = { classic: [ring], modern: [arena, dino, clown] };
  function setEtapa(et) { modern = !et.bullring; P23.G.visible = modern; PROV.forEach((g) => { g.visible = !modern; }); chars.visible = true; scene.add(chars);
    host.position.set(modern ? -6 : -4, 0, modern ? -7.5 : 14); co.position.set(modern ? -3 : 4, 0, modern ? -7 : 14);
    sun.intensity = modern ? 1.2 : 2.2; scene.fog.near = modern ? 120 : 90;
    ring.visible = !!et.bullring; arena.visible = !et.bullring && !modern; dino.visible = !!et.dino; clown.visible = !!et.clown;
    vaca.children.forEach((m) => { if (m.material && m.material.color && m.geometry.type === 'BoxGeometry') m.material.color.set(et.vaquilla === 'botarga' ? '#c98a4a' : '#7a4a22'); });
    scene.background.set(modern ? '#06070c' : et.navidad ? '#1a2a4a' : '#7fc6ff'); scene.fog.color.set(modern ? '#10121c' : et.navidad ? '#2a3a5a' : '#bfe4ff');
    drawLogo(et.title, et.id === 'e1995' ? '1995' : et.navidad ? 'DE LA NAVIDAD' : 'DEL VERANO'); }

  // --- Cámaras ---
  const SHOTS = { overview: [[0, 30, 62], [0, 2, 0]], pool: [[0, 12, 24], [0, 1, 0]], ramp: [[-16, 10, 12], [-30, 4, -6]], ring: [[0, 18, -14], [0, 0, -48]], arena: [[0, 14, -18], [0, 0, -44]],
    board: [[0, 10, 10], [0, 10, 26]], logo: [[0, 13, 2], [0, 12, -20]], host: [[0, 4, 24], [0, 2.4, 14]], vaca: [[20, 5, 22], [14, 2, 12]], dino: [[-20, 5, 22], [-14, 2, 12]] };
  let camFrom = null, camTo = null, camT = 1, camDur = 1, orbit = null, auto = 0;
  function shot(name, dur = 1.6) { const T = modern ? P23.SHOTS : SHOTS; const s = T[name] || T.overview; camFrom = [camera.position.clone(), (camera.userData.look || new THREE.Vector3()).clone()]; camTo = [new THREE.Vector3(...s[0]), new THREE.Vector3(...s[1])]; camT = 0; camDur = dur; auto = 0; }
  function orbitMode(on) { if (on && !orbit) { orbit = new OrbitControls(camera, renderer.domElement); orbit.target.copy(camera.userData.look || new THREE.Vector3()); orbit.maxPolarAngle = 1.45; orbit.enableDamping = true; } else if (!on && orbit) { orbit.dispose(); orbit = null; } }
  // Paseo (joystick)
  const walk = { on: false, f: 0, s: 0, yaw: 0, pitch: -.05 };
  function walkMode(on) { walk.on = on; if (on) { camera.position.set(0, 2.2, modern ? 24 : 34); walk.yaw = 0; } }
  let autoOrbit = false; function setAutoOrbit(v) { autoOrbit = v; }

  // --- Bucle y calidad automática ---
  const clock = new THREE.Clock(); let fps = 60, frames = 0, acc = 0, paused = false; const ticks = [];
  function loop() {
    requestAnimationFrame(loop); if (paused) return; const dt = Math.min(.05, clock.getDelta()); const t = clock.elapsedTime;
    frames++; acc += dt; if (acc > 1) { fps = frames / acc; frames = 0; acc = 0; if (quality === 'auto' && fps < 28 && pr > .75) { pr = Math.max(.75, pr - .25); renderer.setPixelRatio(pr); if (renderer.shadowMap.enabled && pr <= 1) { renderer.shadowMap.enabled = false; } } }
    plats.forEach((p, i) => { p.position.z = Math.sin(t * .8 + i * 2) * 5; }); log.rotation.x = t * 2; bar.rotation.y = t * 1.2; rays.rotation.z = t * .3; logo.rotation.y = Math.sin(t * .4) * .15;
    vaca.position.x = 14 + Math.sin(t * .5) * 3; vaca.rotation.y = Math.cos(t * .5) > 0 ? 0 : Math.PI; dino.rotation.y = Math.sin(t) * .4; clown.rotation.y = t * 2; host.rotation.y = Math.sin(t * .7) * .3;
    if (camT < 1 && camTo) { camT = Math.min(1, camT + dt / camDur); const k = camT * camT * (3 - 2 * camT); camera.position.lerpVectors(camFrom[0], camTo[0], k); const L = new THREE.Vector3().lerpVectors(camFrom[1], camTo[1], k); camera.lookAt(L); camera.userData.look = L; }
    else if (autoOrbit && !orbit && !walk.on) { auto += dt * .08; const R0 = modern ? 34 : 60; camera.position.set(Math.sin(auto) * R0 * .8, modern ? 12 : 26, (modern ? 8 : 0) + Math.cos(auto) * R0 * .6); camera.lookAt(0, modern ? 6 : 2, modern ? -6 : 0); camera.userData.look = new THREE.Vector3(0, 2, 0); }
    if (orbit) orbit.update();
    if (walk.on) { walk.yaw -= walk.s * dt * 1.6; const dir = new THREE.Vector3(Math.sin(walk.yaw), 0, Math.cos(walk.yaw)).multiplyScalar(-walk.f * dt * 9); camera.position.add(dir); camera.position.y = 2.2;
      camera.lookAt(camera.position.x - Math.sin(walk.yaw), 2.2 + walk.pitch, camera.position.z - Math.cos(walk.yaw)); }
    if (modern) P23.update(t);
    ticks.forEach((f) => f(dt, t));
    renderer.render(scene, camera);
  }
  loop();
  addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
  return { scene, camera, renderer, Z, shot, drawBoard, drawLogo, setEtapa, orbitMode, walkMode, walk, setAutoOrbit, ticks, get fps() { return fps; }, pause(v) { paused = v; }, chars: { host, co, vaca, dino, clown }, P23, setTowns: (a, b) => P23.setTowns(a, b) };
}
