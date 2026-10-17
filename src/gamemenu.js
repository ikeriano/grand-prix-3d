/* =====================================================================
   GameMenu — menú común de los juegos de Iker (réplica de ¡Ahora Caigo! 3D v1.35)
   Equivalencias con la 1.35: Rt()=btn(), So()=back(), ka()=h2(), rt()=go().
   Uso:   const menu = GameMenu.create(CONFIG); menu.go('title');
   Ver README.md y los ejemplos de configuración en configs/.
   ===================================================================== */
(function (G) {
  'use strict';
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  function create(cfg) {
    const root = typeof cfg.root === 'string' ? document.querySelector(cfg.root) : (cfg.root || document.getElementById('menu'));
    if (!root) throw new Error('GameMenu: falta #menu');
    const KEY = cfg.storeKey || ((cfg.id || 'juego') + '_menu_opts');
    const inApp = cfg.inApp != null ? !!cfg.inApp : (!!window.AndroidKb || /; wv\)/.test(navigator.userAgent) || !!window.Android);
    let installEvt = null;
    addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; });

    // ---------- opciones persistidas ----------
    const defaults = {};
    const walkDefs = (list) => (list || []).forEach((d) => {
      if (!d) return;
      if (d.sino) { defaults[d.sino] = d.def != null ? d.def : false; if (d.vol) defaults[d.vol] = d.volDef != null ? d.volDef : 1; }
      if (d.choice) defaults[d.choice] = d.def != null ? d.def : d.opts[0][0];
      if (d.items) walkDefs(d.items);
    });
    walkDefs(Array.isArray(cfg.options) ? cfg.options : []);
    for (const k in (cfg.screens || {})) { const S = cfg.screens[k]; if (S && Array.isArray(S.options)) walkDefs(S.options); if (Array.isArray(S)) S.forEach((x) => x && Array.isArray(x.options) && walkDefs(x.options)); }
    Object.assign(defaults, cfg.defaults || {});
    let saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
    const opts = Object.assign({}, defaults, saved);
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(opts)); } catch (e) {} };
    // cfg.store = { get(k), set(k, v) } permite usar los ajustes que ya tiene el juego (sin duplicarlos)
    const getv = (k) => { if (cfg.store) { const v = cfg.store.get(k); if (v !== undefined) return v; } return opts[k]; };
    const set = (k, v, silent) => { opts[k] = v; if (cfg.store && cfg.store.set(k, v) !== false) {} else save(); if (!silent && cfg.onOption) cfg.onOption(k, v, opts); };

    // ---------- tema y ficha ----------
    if (cfg.theme) for (const k in cfg.theme) root.style.setProperty(k.startsWith('--') ? k : '--m-' + k, cfg.theme[k]);
    if (cfg.fp) {
      if (cfg.fp.bg) root.style.setProperty('--fp-bg', cfg.fp.bg);
      if (cfg.fp.mark) root.style.setProperty('--fp-mark', cfg.fp.mark);
      if (cfg.fp.img) { root.style.setProperty('--fp-img', `url("${cfg.fp.img}")`); root.classList.add('fpimg'); }
    }
    if (cfg.autoVertical !== false) {
      const v = () => document.documentElement.classList.toggle('vertical', innerWidth < innerHeight);
      addEventListener('resize', v); v();
    }

    const tap = () => { try { cfg.sound && cfg.sound((cfg.sounds && cfg.sounds.tap) || 'tap'); } catch (e) {} };
    const val = (x, ...a) => (typeof x === 'function' ? x(...a) : x);

    // ---------- componentes (iguales que la 1.35) ----------
    function btn(title, sub, cls, fn, mini) {            // Rt()
      const b = el('button', 'mbtn ' + (cls || ''));
      b.innerHTML = `<span class="fp"></span><span>${title}${sub ? `<small>${sub}</small>` : ''}</span>`;
      if (mini) { const im = el('img', 'mmini'); im.src = mini; im.alt = ''; b.prepend(im); }
      b.onclick = (e) => { e.stopPropagation(); tap(); fn && fn(); };
      return b;
    }
    function back(to, label) {                            // So()
      const b = el('button', 'tbtn back', label || (cfg.text && cfg.text.back) || '⟵ Volver');
      b.onclick = (e) => { e.stopPropagation(); tap(); go(to); };
      return b;
    }
    const h2 = (t) => { const h = el('h2'); h.textContent = t; return h; };   // ka()
    function tbtn(html, sel, fn) {
      const b = el('button', 'tbtn' + (sel ? ' sel' : ''), html);
      b.onclick = (e) => { e.stopPropagation(); tap(); fn && fn(b); };
      return b;
    }

    // Fila Sí/No (+ deslizador opcional) — d()/p() de la 1.35
    function rowSino(d) {
      const r = el('div', 'orow'); if (d.id) r.id = d.id;
      const lab = el('label'); lab.textContent = val(d.label);
      const b = el('button');
      const yes = (cfg.text && cfg.text.yes) || 'Sí', no = (cfg.text && cfg.text.no) || 'No';
      const paint = () => { b.className = 'tbtn' + (getv(d.sino) ? ' sel' : ''); b.textContent = getv(d.sino) ? yes : no; };
      b.onclick = (e) => { e.stopPropagation(); set(d.sino, !getv(d.sino)); paint(); tap(); d.onChange && d.onChange(getv(d.sino), api); };
      paint(); r.append(lab, b);
      if (d.vol) {
        const s = el('input'); s.type = 'range'; s.min = '0'; s.max = '100';
        s.value = String(Math.round((getv(d.vol) != null ? getv(d.vol) : 1) * 100));
        s.oninput = () => set(d.vol, +s.value / 100);
        s.onchange = () => { tap(); d.onVol && d.onVol(getv(d.vol), api); };
        r.append(s);
      }
      return r;
    }
    // Fila de elección (Normal / Rápida, Baja / Media / Alta…)
    function rowChoice(d) {
      const r = el('div', 'orow' + (d.wrap ? ' orow-wrap' : '')); if (d.id) r.id = d.id;
      const lab = el('label'); lab.textContent = val(d.label); r.append(lab);
      for (const [v, t] of val(d.opts)) {
        const b = el('button', 'tbtn' + (String(getv(d.choice)) === String(v) ? ' sel' : ''), t); b.dataset.v = v;
        b.onclick = (e) => { e.stopPropagation(); tap(); set(d.choice, v); r.querySelectorAll('button').forEach((x) => x.classList.toggle('sel', x.dataset.v === String(v))); d.onChange && d.onChange(v, api); };
        r.append(b);
      }
      return r;
    }
    function rowFullscreen(d) {
      const r = el('div', 'orow'); const lab = el('label'); lab.textContent = d.label || '⛶ Pantalla completa'; r.append(lab);
      const b = el('button', 'tbtn' + (document.fullscreenElement ? ' sel' : ''), document.fullscreenElement ? 'Salir' : 'Activar');
      b.onclick = async (e) => {
        e.stopPropagation(); tap();
        try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen({ navigationUI: 'hide' }); } catch (x) {}
        setTimeout(() => go(current), 300);
      };
      if (inApp) { b.disabled = true; b.textContent = 'Siempre (app)'; }
      r.append(b); return r;
    }
    function optionItems(list, parent) {
      for (const d of list || []) {
        if (!d) continue;
        if (d.sino) parent.append(rowSino(d));
        else if (d.choice) parent.append(rowChoice(d));
        else if (d.fullscreen) parent.append(rowFullscreen(d));
        else if (d.field) {
          const r = el('div', 'orow ofield'); const lab = el('label'); lab.textContent = val(d.label);
          const i = el('input', 'otext'); i.type = 'text'; i.maxLength = d.max || 24; i.placeholder = val(d.placeholder) || ''; i.value = getv(d.field) || '';
          i.onchange = () => { set(d.field, i.value.trim()); d.onChange && d.onChange(i.value.trim(), api); };
          i.onpointerup = (e) => e.stopPropagation(); i.onkeydown = (e) => e.stopPropagation();
          r.append(lab, i); parent.append(r);
        }
        else if ('block' in d || d.fold) {
          const b = el('div', 'ocustom' + (d.fold ? ' ofold' : '') + (d.cls ? ' ' + d.cls : '')); if (d.id) b.id = d.id;
          const l = el('div', 'olabel'); l.textContent = d.block || d.fold; if (l.textContent) b.append(l);
          if (d.fold) {
            const k = '__fold_' + (d.id || d.fold);
            if (openFolds[k]) b.classList.add('open');
            l.onclick = (e) => { e.stopPropagation(); tap(); openFolds[k] = b.classList.toggle('open'); };
          }
          if (d.name) { const n = el('div', 'oname', val(d.name)); b.append(n); }
          optionItems(d.items, b);
          if (d.btns) { const r = el('div', 'orow obtns'); for (const x of d.btns) r.append(tbtn(x.label, val(x.sel), () => x.run(api))); b.append(r); }
          if (d.note) b.append(el('p', 'onote', d.note));
          if (d.small) b.append(el('p', 'onote small', d.small));
          parent.append(b);
        } else if (d.note) parent.append(el('p', 'mtext', val(d.note)));
        else if (d.fps) { const p = el('p', 'mtext'); p.textContent = `Rendimiento actual: ${Math.round(val(d.fps) || 0)} fps. ${d.hint || 'Si el juego va lento en tu móvil, elige calidad «Baja».'}`; parent.append(p); }
        else if (d.el) parent.append(d.el(api));
        else items([d], parent);
      }
    }
    const openFolds = {};

    // Ítems de pantalla
    function items(list, col) {
      for (const it of list || []) {
        if (!it) continue;
        if (it.btn != null) {
          if (it.install) { if (inApp) continue; col.append(btn(it.btn, it.sub, 'inst', () => installModal())); continue; }
          const fn = it.go ? () => go(it.go) : it.launch ? () => launch(it.launch, it.arg) : () => it.run && it.run(api);
          const b = btn(val(it.btn), val(it.sub), it.cls, fn, it.mini); if (it.id) b.id = it.id; col.append(b);
        } else if (it.h2) col.append(h2(val(it.h2)));
        else if (it.back) col.append(back(it.back, it.label));
        else if (it.themes) {
          const g = el('div', 'themes'); const k = it.key || 'tema'; const cur = getv(k) != null ? getv(k) : (it.def || val(it.themes)[0].id);
          for (const t of val(it.themes)) g.append(tbtn(`<span>${t.emoji}</span>${t.name}`, t.id === cur, () => { set(k, t.id); it.onPick && it.onPick(t, api); go(current); }));
          col.append(g);
        } else if (it.row) { const r = el('div', 'mrow'); for (const x of it.row) r.append(x.back ? back(x.back) : tbtn(val(x.tbtn), val(x.sel), () => { x.run && x.run(api); })); col.append(r); }
        else if (it.monolist) {
          const g = el('div', 'monolist');
          for (const m of val(it.monolist)) { const b = tbtn(`<span>${m.emoji || ''}</span><b></b><small>${m.sub || ''}</small>`, false, () => launch(m.launch || it.launch, m.arg)); b.querySelector('b').textContent = m.title; g.append(b); }
          col.append(g);
        } else if (it.text) { const d = el('div', 'mtext', val(it.text)); col.append(d); }
        else if (it.options) optionItems(val(it.options, api), col);
        else if (it.el) col.append(it.el(api));
      }
    }

    // ---------- logo ----------
    function logoNode(cls) {
      const L = val(cfg.logo, api);
      let n;
      if (L instanceof HTMLElement) n = L.tagName === 'IMG' ? L.cloneNode() : L;
      else { n = el('img'); n.src = L; n.alt = cfg.name || ''; n.draggable = false; }
      n.className = cls; return n;
    }

    // ---------- router (rt de la 1.35) ----------
    let current = 'title';
    function go(screen = 'main') {
      current = screen;
      root.classList.remove('hidden'); root.innerHTML = '';
      cfg.onEnter && cfg.onEnter(screen, api);
      if (screen === 'title') {
        const d = el('div', 'title');
        const t = cfg.title || {};
        const sub = el('div', 'tsub'); sub.textContent = t.sub != null ? t.sub : 'El juego';
        const tp = el('div', 'ttap'); tp.textContent = t.tap || 'Toca para empezar';
        const tw = el('div', 'twrap'); tw.append(logoNode('tlogo')); d.append(tw, sub, tp); root.append(d);
        const f = (e) => { e.stopPropagation && e.stopPropagation(); root.removeEventListener('pointerup', f); removeEventListener('keydown', f);
          try { cfg.sound && cfg.sound((cfg.sounds && cfg.sounds.start) || 'start'); } catch (x) {}
          cfg.onTitleTap && cfg.onTitleTap(api); go('main'); };
        root.addEventListener('pointerup', f); addEventListener('keydown', f);
        return;
      }
      const box = el('div', 'mbox');
      const lg = el('div', 'logo'); lg.append(logoNode('mlogo'));
      const tag = el('div', 'mtag'); tag.textContent = val(cfg.tag, api) || 'EL JUEGO · 3D'; lg.append(tag);
      const col = el('div', 'col ui');
      const S = (cfg.screens || {})[screen];
      if (!S) { col.append(h2(screen), back('main')); }
      else if (typeof S === 'function') S(col, api);
      else if (Array.isArray(S)) items(S, col);
      else if (S.text != null) {             // pantallas de texto: Cómo se juega, Créditos…
        col.classList.add('text'); col.append(back(S.back || 'main'), h2(val(S.title)), el('div', 'mtext', val(S.text, api)));
      } else { if (S.options) col.classList.add('opts'); if (S.title) col.append(h2(val(S.title))); items(S.items, col); if (S.options) optionItems(val(S.options, api), col); if (S.back !== false) col.append(back(S.back || 'main')); }
      box.append(lg, col); root.append(box);
      if (cfg.version) { const v = el('div', 'mver'); v.textContent = cfg.version; root.append(v); }
    }
    function launch(mode, arg) { hide(); cfg.launch && cfg.launch(mode, arg, api); }
    function hide() { root.classList.add('hidden'); root.innerHTML = ''; }

    function installModal() {
      const m = el('div', 'modal ui');
      const standalone = matchMedia('(display-mode: standalone), (display-mode: fullscreen)').matches;
      const I = cfg.install || {};
      m.innerHTML = `<div class="mcard"><h2>Instalar ${cfg.name || ''}</h2>
        ${standalone ? '<p>✅ Ya estás usando la app instalada.</p>' : (installEvt ? '<p><button class="mbtn gold" id="instNow">📲 Instalar ahora</button></p>' : '') +
          '<p><b>Android (Chrome):</b> menú ⋮ → «Instalar aplicación» o «Añadir a pantalla de inicio».</p><p><b>iPhone/iPad (Safari):</b> botón Compartir → «Añadir a pantalla de inicio».</p><p><b>PC (Chrome/Edge):</b> icono de instalar ⊕ en la barra de direcciones.</p>'}
        ${I.apk ? `<p><a class="mbtn gold" href="${I.apk}" download>⬇️ Descargar APK para Android</a></p><p style="font-size:13px;opacity:.85">El APK se instala en Android permitiendo «instalar apps de origen desconocido».</p>` : ''}
        <button class="tbtn back" id="instClose">Cerrar</button></div>`;
      root.append(m);
      m.querySelector('#instClose').onclick = (e) => { e.stopPropagation(); m.remove(); };
      const n = m.querySelector('#instNow');
      if (n) n.onclick = async (e) => { e.stopPropagation(); installEvt.prompt(); await installEvt.userChoice; installEvt = null; m.remove(); };
      m.onclick = (e) => e.stopPropagation();
    }

    const api = { go, hide, launch, opts, get: getv, set, save, btn, back, h2, tbtn, rowSino, rowChoice, items, optionItems, get current() { return current; }, inApp, root, cfg };
    return api;
  }
  G.GameMenu = { create, version: '1.0' };
})(typeof window !== 'undefined' ? window : globalThis);
