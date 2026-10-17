import './gamemenu.js';
import './games/pruebas.js';
import './games/pruebas2.js';
import { REG, CATS } from './games/engine.js';
import { createSet, QLEVELS, QNAMES } from './set.js';
import { createShow } from './show.js';
import { hasVideo, playCabecera } from './cabecera.js';
let VIDEO_OK = false; hasVideo().then((v) => { VIDEO_OK = v; });
import { A, playMusic, stopMusic, setMusicVol, sfx, say, stopVoice, unlockAudio } from './audio.js';
import { ETAPAS, ETAPA_DEF, VERSION, GANADORES, SPECIALS, CAST } from './data.js';
import { LINES } from './lines.js';

const Q = new URLSearchParams(location.search);
window.__fast = Q.has('fast'); window.__bot = Q.has('bot'); window.__vaca = Q.has('vaca'); window.__replay = Q.has('replay');
const $ = (id) => document.getElementById(id);
const quality = Q.get('q') || localStorage.getItem('gp_quality') || 'auto';
const S = createSet($('app'), quality);
let menu;
const getOpt = (k) => menu ? menu.get(k) : undefined;
const show = createShow(S, getOpt);
const et = () => ETAPAS[getOpt('etapa') || ETAPA_DEF] || ETAPAS[ETAPA_DEF];
S.setEtapa(et()); S.setAutoOrbit(true);
$('loading').remove();

// Logo del menú (dibujado, original)
function logoURL() { const c = document.createElement('canvas'); c.width = 640; c.height = 300; const x = c.getContext('2d');
  x.fillStyle = '#ffc81a'; x.beginPath(); x.arc(520, 90, 70, 0, 7); x.fill(); x.fillStyle = '#e2321e'; x.beginPath(); x.roundRect(20, 70, 600, 170, 60); x.fill(); x.lineWidth = 10; x.strokeStyle = '#fff'; x.stroke();
  x.textAlign = 'center'; x.font = '900 104px Arial Black, Arial'; x.lineWidth = 14; x.strokeStyle = '#7a1000'; x.strokeText('GRAND PRIX', 320, 180); x.fillStyle = '#fff'; x.fillText('GRAND PRIX', 320, 180);
  x.font = '900 40px Arial'; x.fillStyle = '#ffd21a'; x.fillText(et().navidad ? 'DE LA NAVIDAD' : 'DEL VERANO', 320, 228); return c.toDataURL(); }

function hud(on) { $('topBtns').classList.toggle('hidden', !on); }
async function run(fn) { hud(true); S.setAutoOrbit(false); try { await fn(); } catch (e) { console.error(e); } finally { stopVoice(); S.orbitMode(false); S.walkMode(false); $('joy').classList.add('hidden'); hud(false); S.setAutoOrbit(true); menu.go('main'); } }
let exitFree = null;
function freeMode(walk) { return new Promise((res) => { if (walk) { S.walkMode(true); $('joy').classList.remove('hidden'); } else S.orbitMode(true); exitFree = res; }); }
$('tbHome').onclick = () => { show.stop(); stopVoice(); stopMusic(); if (exitFree) { exitFree(); exitFree = null; } else location.reload(); };
const cams = ['overview', 'pool', 'host', 'board', 'logo', 'vaca']; let ci = 0; $('tbCam').onclick = () => S.shot(cams[++ci % cams.length]);
$('tbMute').onclick = () => { A.master && (A.master.gain.value = A.master.gain.value ? 0 : 1); };
// joystick
(() => { const j = $('joy'), k = $('knob'); let on = false; const mv = (e) => { const r = j.getBoundingClientRect(); const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2), dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
  const cl = (v) => Math.max(-1, Math.min(1, v)); S.walk.f = -cl(dy); S.walk.s = cl(dx); k.style.transform = `translate(${cl(dx) * 30}px,${cl(dy) * 30}px)`; };
  j.onpointerdown = (e) => { on = true; j.setPointerCapture(e.pointerId); mv(e); }; j.onpointermove = (e) => on && mv(e); j.onpointerup = () => { on = false; S.walk.f = S.walk.s = 0; k.style.transform = ''; }; })();

// ---- Extras (guiones cortos con el plató y voces) ----
const H = () => CAST[et().host].name;
const seq = async (steps) => { for (const [shot, key, who] of steps) { S.shot(shot); await say(key, LINES[key][1], who || (LINES[key][0] === 'co' ? CAST[et().cos[0]].name : H())); } };
const EXTRAS = {
  promos: () => seq([['logo', 'h_promo1'], ['pool', 'h_promo2'], ['overview', 'h_promo3']]),
  promohost: () => seq([['host', 'h_promo3'], ['host', 'h_promo1']]),
  publi: async () => { for (const k of ['h_pub1', 'h_pub2', 'h_pub3']) { await show.card(`<div class="cred"><small>PUBLICIDAD (ficticia)</small><br><b>${LINES[k][1].split('.')[0]}</b></div>`, 400); await seq([['overview', k]]); } },
  oculta: () => seq([['pool', 'h_oculta1'], ['vaca', 'h_oculta2']]),
  falsas: () => seq([['host', 'h_falsa1'], ['board', 'h_falsa2'], ['vaca', 'h_falsa3']]),
  fuera: () => seq([['pool', 'h_fuera1'], ['overview', 'h_fuera2']]),
  historia: () => seq([['logo', 'h_historia1'], ['overview', 'h_historia2'], ['vaca', 'h_historia3'], ['dino', 'h_historia4'], ['logo', 'h_historia5']]),
  casting: async () => { await seq([['host', 'h_casting']]); const n = prompt('¿Cómo se llama tu pueblo?', getOpt('pueblo') || ''); if (n) menu.set('pueblo', n.trim().slice(0, 24)); await seq([['overview', 'h_casting2']]); },
  paseo: async () => { await seq([['overview', 'h_paseo']]); await freeMode(true); },
  camlibre: () => freeMode(false),
};
function launch(mode, arg) {
  unlockAudio();
  if (mode === 'tv') return run(() => show.programa(et(), { tv: true }));
  if (mode === 'quick') return run(() => show.programa(et(), { tv: false }));
  if (mode === 'cabecera') return run(async () => { const e = et(); S.setEtapa({ ...e, bullring: false, dino: true, clown: true, vaquilla: 'botarga' }); await playCabecera(S, e, { mode: getOpt('cabecera') || 'recreada' }); S.setEtapa(e); });
  if (mode === 'temporada') return run(() => show.temporada(et()));
  if (mode === 'train') return run(() => show.entrenamiento(arg, et()));
  if (EXTRAS[mode]) return run(EXTRAS[mode]);
}

const FP = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><circle cx="34" cy="34" r="33" fill="#ffd21a"/><circle cx="34" cy="34" r="28" fill="#e2321e"/><circle cx="34" cy="34" r="20" fill="#1f6fe0"/><text x="34" y="43" font-size="24" text-anchor="middle">🐮</text></svg>');
const trainList = () => Object.keys(CATS).flatMap((c) => REG.filter((p) => p.cat === c).map((p) => ({ emoji: CATS[c].split(' ')[0], title: p.name, sub: CATS[c].slice(3), launch: 'train', arg: p.id })));
menu = GameMenu.create({
  id: 'grandprix', storeKey: 'gp_menu', name: 'Grand Prix', version: 'v' + VERSION, logo: logoURL, fp: { img: FP },
  theme: { '--m-btn-a': '#ff6a2a', '--m-btn-b': '#d8321a', '--m-border': '#ffe08a', '--m-tbtn': '#c8321ad9', '--m-tbtn-border': '#ffb86a', '--m-sub': '#fff0d0' },
  tag: () => `${et().emoji} ${et().name.toUpperCase()}`, title: { sub: 'El juego del verano', tap: 'Toca para empezar' },
  sound: (n) => sfx(n === 'start' ? 'fanfare' : 'tap'), onTitleTap: () => { unlockAudio(); if (getOpt('music') !== false) playMusic(true); },
  onEnter: (sc) => { if ((sc === 'main') && getOpt('music') !== false && !A.musicEl && !A.music && A.ctx) playMusic(true); },
  install: { apk: 'GrandPrix3D.apk' }, launch,
  defaults: { etapa: ETAPA_DEF, music: true, voz: true, ai: 'normal', npruebas: 6, color: 0, pueblo: '', quality },
  screens: {
    main: [
      { btn: 'Jugar', sub: 'Programa completo, temporada, entrenamiento, especiales…', cls: 'gold', go: 'play' },
      { btn: 'Promos', sub: 'Los anuncios del programa', launch: 'promos' },
      { btn: 'Promos del presentador', sub: `${CAST.host.name} te invita al Grand Prix`, launch: 'promohost' },
      { btn: 'Publicidad', sub: 'Anuncios ficticios del verano', launch: 'publi' },
      { btn: 'Cámara oculta', sub: 'Bromas a árbitros y alcaldes', launch: 'oculta' },
      { btn: 'Tomas falsas', sub: 'Resbalones y despistes', launch: 'falsas' },
      { btn: 'Fuera de cámaras', sub: 'Lo que no se ve del programa', launch: 'fuera' },
      { btn: 'Paseo', sub: 'Pasea por el plató', launch: 'paseo' },
      { btn: 'Casting', sub: 'Apunta a tu pueblo', launch: 'casting' },
      { btn: 'Elige el valor…', sub: 'Etapa, número de pruebas y tu color', go: 'valor' },
      { btn: 'Cámara libre', sub: 'Mueve la cámara a tu aire', launch: 'camlibre' },
      { btn: 'Opciones', sub: 'Sonido, pueblo, rival, calidad gráfica', go: 'options' },
      { btn: 'La historia del Grand Prix', sub: 'El presentador te la cuenta', cls: 'hist', launch: 'historia' },
      { btn: 'Cómo se juega', go: 'help' },
      { btn: 'Créditos', go: 'credits' },
      { btn: 'Instalar app', install: true },
    ],
    play: [
      { btn: 'Programa completo', sub: () => `${et().name}: cabecera, pueblos, ${getOpt('npruebas')} pruebas, prueba final y créditos`, cls: 'gold', launch: 'tv' },
      { btn: 'Temporada', sub: 'Fase de programas, tabla general, semifinal, final y trofeo', launch: 'temporada' },
      { btn: 'Entrenamiento', sub: 'Elige cualquier prueba', go: 'train' },
      { btn: 'Partida rápida', sub: 'Sin cabecera ni créditos', launch: 'quick' },
      { btn: 'Ver la cabecera', sub: 'La cabecera del programa recreada en 3D', launch: 'cabecera' },
      { h2: 'Etapa' },
      { themes: () => Object.values(ETAPAS).map((e) => ({ id: e.id, emoji: e.emoji, name: e.years })), key: 'etapa', def: ETAPA_DEF, onPick: () => S.setEtapa(et()) },
      { text: () => `<p>${et().desc}</p>` },
      { h2: 'Programa especial' },
      { themes: SPECIALS, key: 'tema', def: 'normal' },
      { back: 'main' },
    ],
    train: [{ h2: 'Entrenamiento' }, { monolist: trainList }, { back: 'play' }],
    valor: { title: 'Elige el valor…', options: () => [
      { choice: 'npruebas', label: '🎯 Pruebas por programa', opts: [[4, '4'], [6, '6'], [8, '8']] },
      { choice: 'color', label: '🎽 Tu color', opts: et().colors.map((c, i) => [i, c[0].toUpperCase() + c.slice(1)]), wrap: true },
      { choice: 'etapa', label: '📺 Etapa', opts: Object.values(ETAPAS).map((e) => [e.id, e.years]), wrap: true, onChange: () => S.setEtapa(et()) },
    ] },
    options: { title: 'Opciones', options: () => [
      { sino: 'music', def: true, label: '🎵 Música', onChange: (on) => on ? playMusic(true) : stopMusic() },
      { sino: 'voz', def: true, label: '🎤 Voces', onChange: (v) => { A.voiceOn = v; } },
      { field: 'pueblo', label: '🏘️ Tu pueblo', placeholder: 'Mi pueblo', max: 24 },
      { choice: 'ai', label: '🤖 Nivel del rival', opts: [['facil', 'Fácil'], ['normal', 'Normal'], ['dificil', 'Difícil']] },
      { fold: '🎬 Más opciones', items: [
        { block: '🏆 Pueblos ganadores', name: 'Toca uno para jugar con él', btns: GANADORES.map(([n, y]) => ({ label: `${n} (${y})`, run: (api) => { api.set('pueblo', n); api.go('options'); } })) },
        { choice: 'cabecera', label: '🎬 Cabecera', opts: () => VIDEO_OK ? [['recreada', 'Recreada'], ['video', 'Vídeo original']] : [['recreada', 'Recreada']], def: 'recreada' },
        { sino: 'subs', def: false, label: '💬 Subtítulos grandes', onChange: (v) => document.body.classList.toggle('bigsub', v) },
      ] },
      { choice: 'quality', label: '✨ Calidad gráfica', opts: QLEVELS.map((l) => [l, QNAMES[l]]), wrap: true, onChange: (v) => { localStorage.setItem('gp_quality', v); setTimeout(() => location.reload(), 300); } },
      { fullscreen: true },
      { fps: () => S.fps, hint: 'Si va lento en tu móvil, elige calidad «Media».' },
    ] },
    help: { title: 'Cómo se juega', text: `<p>Dos pueblos (azul y amarillo; cuatro en 1995) compiten en pruebas locas: con vaquilla, físicas, de piscina, yincanas y de conocimiento para alcaldes y padrinos.</p>
<p>En cada prueba el rival ya tiene su marca: <b>¡supérala!</b> Las primeras pruebas valen 1 punto, las del medio 2, las últimas 3 y la <b>prueba final</b> 6.</p>
<p><b>Comodines según la etapa:</b> 2023 Supervaquilla (el alcalde la suelta al rival) · 2024 campana de 30 s · 2025 una Vaquilla dorada por pueblo (+2) · 2026 una sola Vaquilla dorada, que se gana en Pasión de capitanes.</p>
<p><b>Temporada:</b> juega programas, sube en la tabla, pasa a semifinales y gana la final.</p>` },
    credits: { title: 'Créditos', text: () => `<p><b>Creado por</b><br>Iker Rodriguez Tejedor</p>
<p><b>Personajes virtuales</b><br>${Object.values(CAST).map((c) => `${c.name} (${c.role})`).join(' · ')}</p>
<p><b>Voces</b><br>Piper TTS (es_ES)</p><p><b>Motor 3D</b><br>Three.js · plató modelado por código</p>
<p><b>Música</b><br>Cabecera del programa (audio del vídeo original)</p>
<p class="small">Remake no oficial hecho por un fan, sin ánimo de lucro. Grand Prix es un formato de Europroducciones emitido por RTVE y cadenas de FORTA. Sin relación oficial con el programa ni con sus cadenas.</p>` },
  },
});
A.voiceOn = getOpt('voz') !== false;
if (Q.get('screen')) menu.go(Q.get('screen')); else if (Q.get('mode')) launch(Q.get('mode'), Q.get('arg')); else menu.go('title');
window.__gp = { S, show, menu, launch };
