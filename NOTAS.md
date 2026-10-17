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

## Música
⚠️ PROVISIONAL: tema de verano sintetizado en `src/audio.js`. La cabecera tiene que ser IDÉNTICA a la del vídeo de Iker; cuando la mande se sustituye. Aviso: si es audio original, no publicarlo en dist/APK públicos.

## Pruebas (src/games/pruebas.js) — añadir más con `prueba({...})`
Con vaquilla: La vaca pichichi, Los regadores, Huevos fritos · Físicas: La rampa, Rompepuertas, Los superbolos (balón de playa en cuerda contra bolos hinchables, como en las fotos), Tiro al pingüi-pato · Piscina: Los troncos locos (también prueba final), ¡Salta!, Los recoge-cocos, Tomatazos · Yincana: La sandía · Conocimiento: La patata caliente, El diccionario · Especial: Pasión de capitanes.

## Construir
- Web: `./build.sh` → dist/ (se publica en /preview/ del repo ikeriano/grand-prix-3d).
- APK: `android/build.sh` (com.ikeriano.grandprix, keystore en /workspace/handoff/keystore/grandprix/, copia en el store).
- Voces: `python3 tools/synth.py` (frases en src/lines.js).
- Capturas: `node tools/shot.js out.png "query" ms [js]` (servidor en dist: puerto 8931). URL: `?mode=tv|temporada|train&arg=<id>`, `fast`, `bot`, `q=media|alta|ultra`.
