set -e
cd /workspace/grandprix
# WEB=1 → versión pública (sin audio/vídeo del programa). Sin WEB → versión completa (APK).
mkdir -p dist && find dist -mindepth 1 -delete
npx esbuild src/main.js --bundle --minify --format=iife --target=es2019 --outfile=dist/game.js --log-level=warning
cp src/index.html src/style.css dist/ && cat src/menu.css src/menu_gp.css > dist/menu.css
mkdir -p dist/assets/snd && cp -r assets/voz dist/assets/ && cp assets/snd/chant.mp3 dist/assets/snd/
if [ -z "$WEB" ]; then cp assets/snd/cabecera.m4a assets/snd/*.ogg dist/assets/snd/; [ -n "$NOVIDEO" ] || cp -r assets/vid dist/assets/; fi
touch dist/.nojekyll; du -sh dist
