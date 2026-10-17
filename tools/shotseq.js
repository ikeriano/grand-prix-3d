// node tools/shotseq.js "query" outprefix t1,t2,...  (segundos desde la carga)
const pp = require('/workspace/menu_template/tools/node_modules/puppeteer-core');
(async () => { const [q, pre, ts] = process.argv.slice(2);
  const b = await pp.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 }); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  const t0 = Date.now(); await p.goto('http://127.0.0.1:8931/?' + q);
  for (const t of ts.split(',').map(Number)) { const w = t * 1000 - (Date.now() - t0); if (w > 0) await new Promise((r) => setTimeout(r, w)); await p.screenshot({ path: `${pre}_${String(t).padStart(2, '0')}s.png` }); }
  if (errs.length) console.log('ERR', errs.join(' | ')); await b.close(); })();
