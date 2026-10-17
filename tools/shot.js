// node tools/shot.js out.png "query" waitMs [evalJS]
const pp = require('/workspace/menu_template/tools/node_modules/puppeteer-core');
(async () => { const [out, q, wait, ev] = process.argv.slice(2);
  const b = await pp.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 }); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto('http://127.0.0.1:8931/?' + q); await new Promise((r) => setTimeout(r, +wait || 3000));
  if (ev) { await p.evaluate(ev); await new Promise((r) => setTimeout(r, 2500)); }
  await p.screenshot({ path: out }); if (errs.length) console.log('ERR', errs.join(' | ')); await b.close(); })();
