set -e
cd /workspace/grandprix
mkdir -p dist && find dist -mindepth 1 -delete
npx esbuild src/main.js --bundle --minify --format=iife --target=es2019 --outfile=dist/game.js --log-level=warning
cp src/index.html src/style.css dist/ && cat src/menu.css src/menu_gp.css > dist/menu.css
mkdir -p dist/assets && cp -r assets/voz dist/assets/
touch dist/.nojekyll; du -sh dist
