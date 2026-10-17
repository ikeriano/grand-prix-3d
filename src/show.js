// Flujo de los modos: Programa completo, Temporada, Entrenamiento, créditos.
import { REG, runPrueba, LV, CATS } from './games/engine.js';
import { say, sfx, playMusic, stopMusic, music, sting, chant } from './audio.js';
import { playCabecera } from './cabecera.js';
import { ETAPAS, CAST, COLORS, RIVALES, ALCALDES, PADRINOS, GANADORES } from './data.js';
import { LINES } from './lines.js';
const sleep = (ms) => new Promise((r) => setTimeout(r, window.__fast ? ms / 10 : ms));
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const L = (k, who) => say(k, LINES[k][1], who);
const $ = (id) => document.getElementById(id);

export function createShow(S, getOpt) {
  const cardEl = $('card');
  function card(html, ms = 2600) { cardEl.innerHTML = html; cardEl.classList.remove('hidden'); return sleep(ms).then(() => cardEl.classList.add('hidden')); }
  const hostName = (et) => CAST[et.host].name;
  async function credits(et, end) {
    const lines = end ? [`<b>Grand Prix 3D</b><br>remake de fans`, `Presentador<br><b>${hostName(et)}</b> (personaje virtual)`, `Copresentación<br><b>${et.cos.map((c) => CAST[c].name).join(' · ')}</b>`,
      `Árbitros<br><b>${CAST.ref1.name} · ${CAST.ref2.name}</b>`, et.dino ? `La vaquilla <b>${CAST.vaca.name}</b> · el dino <b>${CAST.dino.name}</b> · <b>${CAST.clown.name}</b>` : `La vaquilla <b>${CAST.vaca.name}</b>`,
      `Creado por<br><b>Iker Rodriguez Tejedor</b>`, `Voces Piper TTS · Three.js<br>Música: cabecera del programa`, `<small>Remake no oficial sin ánimo de lucro. Sin relación con RTVE, FORTA ni Europroducciones.</small>`]
      : [`<b>Iker Rodriguez Tejedor</b><br>presenta`, `<b>GRAND PRIX 3D</b><br>${et.name} · ${et.years}`, `con <b>${hostName(et)}</b>`, `<small>Remake de fans · no oficial</small>`];
    S.setAutoOrbit(true); if (end) music('creditos');
    for (const l of lines) { if (abort) return; await card(`<div class="cred">${l}</div>`, 1900); }
    S.setAutoOrbit(false);
  }
  let abort = false;
  const playerColor = (et) => et.colors[+getOpt('color') % et.colors.length] || et.colors[0];
  const myTown = () => getOpt('pueblo') || 'Mi pueblo';
  function makeTeams(et, rivals) {
    const mine = playerColor(et); const cols = [mine, ...et.colors.filter((c) => c !== mine)].slice(0, et.towns);
    return cols.map((c, i) => ({ name: i ? (rivals && rivals[i - 1]) || pick(RIVALES.filter((r) => r !== myTown())) : myTown(), color: c, pts: 0, me: !i, alc: pick(ALCALDES), pad: pick(PADRINOS), dorada: et.comodin === 'dorada2' ? 1 : 0, comodin: 0 }));
  }
  function board(teams, title) { S.drawBoard(teams.slice().sort((a, b) => b.pts - a.pts), title); }
  function choosePruebas(n) {
    const by = (c) => REG.filter((p) => p.cat === c);
    const set = [pick(by('vaquilla')), pick(by('fisica')), pick(by('piscina')), pick(by('saber')), pick(by('yincana')), pick(by('vaquilla').concat(by('fisica')).concat(by('piscina')))];
    const seen = new Set(); const out = set.filter((p) => p && !seen.has(p.id) && seen.add(p.id));
    return out.slice(0, n);
  }
  const SHOT = { vaquilla: 'vaca', fisica: 'bolera', piscina: 'pool', saber: 'host', yincana: 'arena', especial: 'board' };
  const INTRO = { vaquilla: 'h_vaca', fisica: 'h_rampa', piscina: 'h_piscina', saber: 'h_saber', yincana: 'h_yincana' };
  async function playOne(p, et, teams, value, isFinal) {
    S.shot(p.shot || (p.id === 'pinguipato' ? 'pato' : SHOT[p.cat]) || 'overview'); await L(isFinal ? 'h_final' : (INTRO[p.cat] || 'h_prueba'), hostName(et));
    const me = teams[0]; let vacaOn = false, dorada = false, meUsesVaca = false;
    const rival = teams[1];
    if (!isFinal && p.cat !== 'saber' && et.comodin && teams.length === 2) {
      // Pantalla partida con cuenta atrás de 5 s para decidir el comodín
      const can = et.comodin === 'supervaquilla' ? me.comodin > 0 : (et.comodin === 'dorada2' || et.comodin === 'dorada1') ? me.dorada > 0 : et.comodin === 'cajas' ? me.comodin > 0 : false;
      const rivalUses = et.comodin === 'supervaquilla' ? rival.comodin > 0 && Math.random() < .45 : (et.comodin === 'dorada2' || et.comodin === 'dorada1') ? rival.dorada > 0 && Math.random() < .3 : false;
      if (et.comodin === 'campana') { if (Math.random() < .4) { sfx('bell'); vacaOn = true; await L('h_campana', hostName(et)); } }
      else if (can || rivalUses) { await L('h_comodin', hostName(et)); const use = can ? await split(et, me, rival, p) : false;
        if (et.comodin === 'supervaquilla' || et.comodin === 'cajas') { if (use) { me.comodin--; meUsesVaca = true; await L('h_super', hostName(et)); } if (rivalUses) { rival.comodin--; vacaOn = true; } }
        else { if (use) { me.dorada = 0; dorada = true; await L('h_dorada', hostName(et)); } if (rivalUses) { rival.dorada = 0; rival.usingDorada = true; } } }
      if (et.comodin === 'dorada2' || et.comodin === 'dorada1') vacaOn = vacaOn || et.comodin === 'dorada2';
    }
    const lvl = getOpt('ai') || 'normal';
    const rivalScores = teams.slice(1).map(() => Math.max(0, p.ai(lvl)));
    S.pause(true);
    await L(p.intro || 'h_preparados', hostName(et)); if (Math.random() < .5 || p.id === 'superbolos') chant(); sfx('whistle');
    if (meUsesVaca) rivalScores.forEach((v, i) => { rivalScores[i] = Math.floor(v * .7); });
    const r = await runPrueba(p, { color: COLORS[me.color], rivalColor: COLORS[rival.color], names: [me.name, rival.name], myColorName: me.color, onFlip: () => sfx('flip'), level: lvl, vaca: vacaOn && p.cat !== 'vaquilla', rivalScore: Math.max(...rivalScores), fast: window.__fast, bot: window.__bot, etapa: et, lowres: getOpt('quality') === 'media' });
    S.pause(false); S.shot('board');
    const scores = [r.you, ...(p.id === 'capitanes' || p.live ? [r.rival] : rivalScores)];
    // reparto: 4 pueblos → 4/3/2/1 × valor; 2 pueblos → valor al ganador (empate: ambos)
    const order = scores.map((s, i) => [s, i]).sort((a, b) => b[0] - a[0]);
    if (teams.length > 2) order.forEach(([s, i], k) => { teams[i].pts += (teams.length - k) * value; });
    else { const best = order[0][0]; const tieAll = scores[0] === scores[1]; const P = (!isFinal && p.pts) || {};
      if (tieAll && P.tie) { teams[0].pts += P.tie; teams[1].pts += P.tie; }
      else scores.forEach((s, i) => { const win = s === best; teams[i].pts += win ? (P.win || value) : (P.lose || 0); if (P.comWin) teams[i].comodin = (teams[i].comodin || 0) + (win ? P.comWin : P.comLose); });
      const cancel = tieAll && P.tieCancelsDorada;
      if (dorada && !cancel && scores[0] > scores[1]) me.pts += 2;
      if (rival.usingDorada && !cancel && scores[1] > scores[0]) rival.pts += 2; rival.usingDorada = false;
      if (cancel && (dorada)) await card('<h3>Empate: la Vaquilla dorada se anula</h3>', 1800); }
    const winI = order[0][1]; const tie = teams.length === 2 && scores[0] === scores[1];
    sfx(tie ? 'whistle' : winI === 0 ? 'win' : 'lose');
    if (teams.length === 2) await L(tie ? 'h_empate' : teams[winI].color === 'azul' ? 'h_gana_azul' : 'h_gana_amar', hostName(et));
    board(teams); sting('trans'); await card(scoreHtml(teams, p.name), 2600);
    return r;
  }
  function scoreHtml(teams, title) { return `<h3>${title}</h3>` + teams.slice().sort((a, b) => b.pts - a.pts).map((t) => `<div class="srow" style="background:${COLORS[t.color]};color:${t.color === 'amarillo' ? '#3a1a00' : '#fff'}"><span>${t.name}${t.me ? ' (tú)' : ''}</span><b>${t.pts}</b></div>`).join(''); }
  function split(et, me, rival, p) { // pantalla partida: izquierda azul, derecha amarilla, cuenta atrás 5 s
    return new Promise((res) => { const blueMe = me.color !== 'amarillo';
      const side = (t, mine) => `<div class="sp ${t.color}"><b>${t.name}</b><small>Alcalde: ${t.alc}</small>${mine ? '<button class="mbtn gold" id="spY">¡Usar comodín!</button>' : '<i>Pensando…</i>'}</div>`;
      const el = document.getElementById('split'); el.innerHTML = (blueMe ? side(me, 1) + side(rival, 0) : side(rival, 0) + side(me, 1)) + `<div class="spc"><div id="spN">5</div><small>${p.name}</small></div>`; el.classList.remove('hidden');
      let n = 5, used = false; const fin = () => { clearInterval(id); el.classList.add('hidden'); res(used); };
      const id = setInterval(() => { n--; sfx('tick'); const e = document.getElementById('spN'); if (e) e.textContent = n; if (n <= 0) fin(); }, window.__fast ? 100 : 1000);
      document.getElementById('spY').onclick = () => { used = true; sfx('brass'); fin(); };
      if (window.__bot && Math.random() < .5) setTimeout(() => { used = true; fin(); }, 300); });
  }
  function ask(html) { if (window.__bot) return Promise.resolve(Math.random() < .5); return new Promise((res) => { cardEl.innerHTML = `<div class="ask">${html}<div><button class="mbtn gold" id="aY">Sí</button><button class="mbtn" id="aN">No</button></div></div>`; cardEl.classList.remove('hidden');
    $('aY').onclick = () => { cardEl.classList.add('hidden'); res(true); }; $('aN').onclick = () => { cardEl.classList.add('hidden'); res(false); }; }); }

  async function programa(et, opts = {}) {
    abort = false; S.setEtapa(et); const tv = opts.tv !== false;
    if (tv && !opts.noCredits) { stopMusic(); if (!S.modern) S.setEtapa({ ...et, bullring: false, dino: true, clown: true, vaquilla: 'botarga' });
      if (!window.__fast) await playCabecera(S, et, { mode: getOpt('cabecera') || 'recreada' }); S.setEtapa(et); await credits(et, false); }
    S.shot('logo'); await sleep(1500); S.shot('host');
    await L(et.id === 'e1995' ? 'h_hola95' : et.navidad ? 'h_holanav' : 'h_hola', hostName(et));
    stopMusic();
    const teams = opts.teams || makeTeams(et, opts.rivals); board(teams, 'GRAND PRIX'); S.setTowns && S.setTowns(teams[0].name, teams[1].name);
    S.shot('overview'); await L(teams.length > 2 ? 'h_pueblos4' : 'h_pueblos', hostName(et));
    await card(`<h3>Esta noche</h3>` + teams.map((t) => `<div class="srow" style="background:${COLORS[t.color]};color:${t.color === 'amarillo' ? '#3a1a00' : '#fff'}"><span>${t.name}</span><small>Alcalde: ${t.alc} · Padrino: ${t.pad}</small></div>`).join(''), 3200);
    await L('h_alcaldes', hostName(et));
    if (et.comodin === 'supervaquilla') { teams[0].comodin = 1; teams[1].comodin = 1 + (Math.random() < .5 ? 1 : 0); }
    if (et.comodin === 'cajas') await L('h_cajas', hostName(et));
    if (et.comodin === 'dorada1') { await L('h_capitanes', hostName(et)); const cap = REG.find((p) => p.id === 'capitanes'); S.pause(true);
      const r = await runPrueba(cap, { color: COLORS[teams[0].color], rivalColor: COLORS[teams[1].color], rivalScore: 2, fast: window.__fast, bot: window.__bot, etapa: et }); S.pause(false);
      if (r.you >= 3) { teams[0].dorada = 1; await card('<h3>🥇 ¡La Vaquilla dorada es tuya!</h3>', 2200); } else { teams[1].dorada = 1; await card('<h3>La Vaquilla dorada se la lleva el rival</h3>', 2200); } }
    const list = choosePruebas(+getOpt('npruebas') || 6);
    for (let i = 0; i < list.length; i++) { if (abort) return; await playOne(list[i], et, teams, i < 2 ? 1 : i < 4 ? 2 : 3, false); }
    const fin = REG.find((p) => p.id === 'troncos'); await playOne(fin, et, teams, 6, true);
    const w = teams.slice().sort((a, b) => b.pts - a.pts)[0];
    S.shot('logo'); sting('final');
    await card(`<h3>🏆 ¡Gana ${w.name}!</h3>` + scoreHtml(teams, 'Clasificación final'), 3500); await L('h_ganador', hostName(et));
    if (tv && !opts.noCredits) { await L('h_adios', hostName(et)); await credits(et, true); }
    stopMusic(); return teams;
  }
  async function temporada(et) {
    abort = false; S.setEtapa(et);
    const towns = [myTown(), ...RIVALES.filter((r) => r !== myTown()).sort(() => Math.random() - .5).slice(0, 7)].map((n, i) => ({ name: n, pts: 0, me: !i }));
    const table = () => `<h3>Tabla general</h3>` + towns.slice().sort((a, b) => b.pts - a.pts).map((t, i) => `<div class="srow" style="background:${i < 4 ? '#1f6fe0' : '#334'}"><span>${i + 1}. ${t.name}${t.me ? ' (tú)' : ''}</span><b>${t.pts}</b></div>`).join('');
    // Fase de grupos: tu pueblo juega 2 programas; el resto se simula
    for (let k = 0; k < 2; k++) { const riv = towns[1 + k * 2]; const t = await programa(et, { rivals: [riv.name], noCredits: true });
      towns[0].pts += t[0].pts; riv.pts += t[1].pts; towns.slice(1).forEach((x) => { if (x !== riv) x.pts += Math.round(8 + Math.random() * 14); });
      await card(table(), 4000); }
    const top = towns.slice().sort((a, b) => b.pts - a.pts).slice(0, 4);
    if (!top.find((t) => t.me)) { await card('<h3>Tu pueblo se queda fuera de las semifinales</h3>¡El próximo verano será!', 3500); return; }
    await L('h_semis', hostName(et));
    const opp = top.find((t) => !t.me && top.indexOf(t) !== top.findIndex((x) => x.me) && true);
    const s = await programa(et, { rivals: [top.filter((t) => !t.me)[0].name], noCredits: true });
    if (s[0].pts < s[1].pts) { await card('<h3>Eliminados en semifinales</h3>¡Qué verano tan bonito!', 3500); return; }
    await L('h_granfinal', hostName(et));
    const f = await programa(et, { rivals: [top.filter((t) => !t.me)[1].name], noCredits: true });
    if (f[0].pts >= f[1].pts) { sfx('fanfare'); await card(`<h3>🏆 ¡${myTown()} gana el Grand Prix!</h3><div class="trophy">🏆</div>`, 4500); await L('h_trofeo', hostName(et)); }
    else await card('<h3>¡Subcampeones!</h3>Un final precioso.', 3500);
  }
  async function entrenamiento(id, et) { S.setEtapa(et); const p = REG.find((x) => x.id === id); S.shot(SHOT[p.cat]); S.pause(true);
    const r = await runPrueba(p, { color: COLORS[playerColor(et)], level: getOpt('ai') || 'normal', rivalScore: p.ai(getOpt('ai') || 'normal'), fast: window.__fast, bot: window.__bot, etapa: et, vaca: !!window.__vaca }); S.pause(false); return r; }
  return { programa, temporada, entrenamiento, credits, card, L, split, stop() { abort = true; }, board };
}
