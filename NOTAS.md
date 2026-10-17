# Grand Prix 3D — remake de fans (no oficial) · Fase 1
Creado por Iker Rodriguez Tejedor. Three.js + Piper TTS. Personajes virtuales originales; sin relación con RTVE, FORTA ni Europroducciones.

## Personajes (nombres inventados)
- Presentador: **Tomás Rivero** (etapas TVE y La 1). Etapa autonómica 2007-09: **Gonzalo Sierra**.
- Copresentadoras: **Lucía Brisa**, **Nerea Pixel** (streamer), **Marisa Copla** (humor).
- Árbitros: **Julián Ferrer** y **Rocío Paredes**.
- Vaquilla (botarga / vaquilla clásica): **Canela**. Dinosaurio: **Trufo**. Acróbata-payaso: **Pipo Volteretas**.
- Alcaldes y padrinos: nombres genéricos al azar (src/data.js).

## Etapas (src/data.js)
1995 Cuando calienta el sol (4 pueblos, 4 colores, plaza de toros) · 1996-2005 La 1 · 2007-2009 autonómicas · 2023 Supervaquilla comodín · 2024 campana 30 s · 2025 Vaquilla dorada por pueblo (+2) · 2026 (por defecto) una sola Vaquilla dorada ganada en «Pasión de capitanes» · Navidad (cajas).
Interpretaciones: puntos por prueba 1-1-2-2-3-3 y final 6 (4 pueblos: 4/3/2/1 × valor). El rival marca primero y tú intentas superarlo.

## Plató
- Etapa actual (2023-2026, también Navidad): `src/plato2023.js`, recreado desde las fotos de Iker (`ref/plato/`): fachada de casas de dibujo, castillo central con balaustrada, puertas en arco con rosetón y medallón, gradas azul/amarilla con escalones LED turquesa y balaustradas, suelo azul brillante, piscina con ventanales en arco y pantallón del marcador, mesa de jueces con carteles de pueblos, atril amarillo, truss con focos y haces, bolos hinchables, balón de playa colgado, colchonetas, toldo de rayas y patos/pingüinos.
- El medallón es ORIGINAL (vaquilla en aro rojo/azul), no el logo real. Si Iker manda el logo como archivo se cambia en `roundelTex()`.
- Etapas clásicas: plató provisional (`src/set.js`: piscina, plataformas, rampa, plaza de toros, marcador, logo 3D). Copia del primero en `set_v0_provisional.js`.
- Calidad: Auto/Media/Alta/Ultra (4K) con bajada automática si baja de 28 fps.

## Música y cabecera (v0.2)
- `assets/snd/cabecera.m4a`: audio ORIGINAL del vídeo de Iker copiado sin recodificar (AAC 48 kbps, idéntico). Cortes en Opus 64 kbps: `sting_logo` (2-7 s), `sting_trans` (7-9,5 s, marcador), `loop_creditos` (45-60 s), `sting_final` (72-78 s). Coro «A por ellos, oé» (Piper) en `chant.mp3`.
- `assets/vid/cabecera.mp4`: vídeo original recodificado (9,5 MB) para la opción «Cabecera: Vídeo original».
- ⚠️ Material con derechos: assets/snd/cabecera.m4a, *.ogg y assets/vid/ NO van al repo público ni a /preview/ (están en .gitignore; `WEB=1 ./build.sh` los excluye). Solo van en el APK local. Sin ellos suena el tema sintetizado de reserva.
- Cabecera recreada: `src/cabecera.js` (78 s sincronizados con el audio): playa pixel art, medallón con laurel y «EL JUEGO», bailarines patos/pingüinos, bolas, gradas, copresentadoras, dino, vaquilla, presentador con rótulo naranja y foto de grupo. Créditos propios en blanco abajo a la izquierda.

## Pruebas (src/games/pruebas.js) — añadir más con `prueba({...})`
Con vaquilla: La vaca pichichi, Los regadores, Huevos fritos · Físicas: La rampa, Rompepuertas, Los superbolos (balón de playa en cuerda contra bolos hinchables, como en las fotos), Tiro al pingüi-pato · Piscina: Los troncos locos (también prueba final), ¡Salta!, Los recoge-cocos, Tomatazos · Yincana: La sandía · Conocimiento: La patata caliente, El diccionario · Especial: Pasión de capitanes.

## Reglas de los vídeos (ref/reglas_videos.md, v0.2)
Superbolos (vendado, padrino guía, 6 bolos con el dorado = 2, 2:30, gana +2) · Troncos locos (6 troncos, relevos de salmón, 2:30, gana 4 + 2 comodines / pierde 2 + 1) · Patata caliente (numéricas con ¡Más!/¡Menos!, globo, 2 rondas, rótulo naranja) · Los Pegajosos (muro de velcro, adivinador, empate 3 y 3 y anula la dorada) · Pingüinos matemáticos · Baloncesto en pañales (cinta hacia atrás, roja = 2, gana 3, vaquilla con dedo gigante) · Alicia en el país de las caidillas (plataforma de caramelo, bol, gana 4 / pierde 2, vaquilla enamorada con corazón).
Gráficos: crono con vaquilla y píldora naranja, rótulo de marcador azul/amarillo con insignias que giran como tablillas y la dorada en el centro, REPLAY naranja con marco de puntos azul y cámara lenta, pantalla partida de 5 s para el comodín, gong, silbato al empezar y acabar, metales.

## Construir
- Web pública: `WEB=1 ./build.sh` → dist/ → /preview/. APK: `./build.sh` (con cabecera) y `android/build.sh`.
- APK: `android/build.sh` (com.ikeriano.grandprix, keystore en /workspace/handoff/keystore/grandprix/, copia en el store).
- Voces: `python3 tools/synth.py` (frases en src/lines.js).
- Capturas: `node tools/shot.js out.png "query" ms [js]` (servidor en dist: puerto 8931). URL: `?mode=tv|temporada|train&arg=<id>`, `fast`, `bot`, `q=media|alta|ultra`.
