// Grand Prix 3D — datos (etapas, pueblos, personajes). Todo original/virtual.
export const VERSION = '0.1 (fase 1)';

// Personajes virtuales (nombres inventados; ver NOTAS.md)
export const CAST = {
  host:   { name: 'Tomás Rivero', role: 'Presentador', voice: 'host' },
  co1:    { name: 'Lucía Brisa', role: 'Copresentadora', voice: 'co' },
  co2:    { name: 'Nerea Pixel', role: 'Copresentadora (streamer)', voice: 'co' },
  co3:    { name: 'Marisa Copla', role: 'Copresentadora (humor)', voice: 'co' },
  ref1:   { name: 'Julián Ferrer', role: 'Árbitro' },
  ref2:   { name: 'Rocío Paredes', role: 'Árbitra' },
  vaca:   { name: 'Canela', role: 'La vaquilla (botarga)' },
  dino:   { name: 'Trufo', role: 'El dinosaurio' },
  clown:  { name: 'Pipo Volteretas', role: 'Acróbata y payaso' },
  host07: { name: 'Gonzalo Sierra', role: 'Presentador (etapa autonómica)', voice: 'host' },
};

// Etapas. rules: flags que usa el programa.
export const ETAPAS = {
  e1995: { id: 'e1995', name: 'Cuando calienta el sol', years: '1995', emoji: '☀️', towns: 4, colors: ['azul', 'rojo', 'amarillo', 'verde'],
    host: 'host', cos: ['co1'], bullring: true, vaquilla: 'real', prize: '4.000.000 pesetas', title: 'CUANDO CALIENTA EL SOL',
    desc: '4 pueblos de menos de 5.000 habitantes, con sus colores, alcalde y padrino.' },
  e1996: { id: 'e1996', name: 'Grand Prix · La 1', years: '1996-2005', emoji: '🐮', towns: 2, colors: ['azul', 'amarillo'],
    host: 'host', cos: ['co1'], bullring: true, vaquilla: 'real', prize: '6.000.000 pesetas', title: 'GRAND PRIX',
    desc: 'Dos pueblos, azul y amarillo, en la plaza de toros con la vaquilla.' },
  e2007: { id: 'e2007', name: 'Grand Prix · Autonómicas', years: '2007-2009', emoji: '📺', towns: 2, colors: ['azul', 'amarillo'],
    host: 'host07', cos: ['co3'], bullring: true, vaquilla: 'real', prize: '30.000 €', title: 'GRAND PRIX',
    desc: 'La etapa de las cadenas autonómicas, con otro presentador.' },
  e2023: { id: 'e2023', name: 'Grand Prix 2023', years: '2023', emoji: '🦸', towns: 2, colors: ['azul', 'amarillo'],
    host: 'host', cos: ['co1', 'co2'], bullring: false, vaquilla: 'botarga', comodin: 'supervaquilla', dino: true, clown: true, prize: '30.000 €', title: 'GRAND PRIX',
    desc: 'Vuelve el Grand Prix. La vaquilla es una botarga y el alcalde la usa como comodín.' },
  e2024: { id: 'e2024', name: 'Grand Prix 2024', years: '2024', emoji: '🔔', towns: 2, colors: ['azul', 'amarillo'],
    host: 'host', cos: ['co1', 'co2'], bullring: false, vaquilla: 'botarga', comodin: 'campana', dino: true, clown: true, prize: '30.000 €', title: 'GRAND PRIX',
    desc: 'Suena la campana y la vaquilla entra 30 segundos en la prueba.' },
  e2025: { id: 'e2025', name: 'Grand Prix 2025', years: '2025', emoji: '🥇', towns: 2, colors: ['azul', 'amarillo'],
    host: 'host', cos: ['co2', 'co3'], bullring: false, vaquilla: 'botarga', comodin: 'dorada2', dino: true, clown: true, prize: '30.000 €', title: 'GRAND PRIX',
    desc: 'Cada pueblo tiene su Vaquilla dorada: si gana la prueba donde la usa, +2 puntos.' },
  e2026: { id: 'e2026', name: 'Grand Prix 2026', years: '2026', emoji: '🏆', towns: 2, colors: ['azul', 'amarillo'],
    host: 'host', cos: ['co3'], bullring: false, vaquilla: 'botarga', comodin: 'dorada1', dino: true, clown: true, prize: '30.000 €', title: 'GRAND PRIX',
    desc: 'Solo hay una Vaquilla dorada y se gana en «Pasión de capitanes».' },
  navidad: { id: 'navidad', name: 'Grand Prix de la Navidad', years: '2024', emoji: '🎄', towns: 2, colors: ['azul', 'amarillo'],
    host: 'host', cos: ['co2'], bullring: false, vaquilla: 'botarga', comodin: 'cajas', dino: true, clown: true, prize: 'Trofeo de Navidad', title: 'GRAND PRIX', navidad: true,
    desc: 'Especial de Navidad: los padrinos eligen cajas con comodines.' },
};
export const ETAPA_DEF = 'e2026';

export const COLORS = { azul: '#1f6fe0', amarillo: '#ffd21a', rojo: '#e23a2a', verde: '#2fb84a' };

// Pueblos ganadores reales (lista del historial que mandó Iker)
export const GANADORES = [
  ['Cudillero', 1995], ['Guijuelo', 1996], ['Murchante', 1997], ['Tordera', 1998], ['El Bonillo', 1999], ['Suances', 2000],
  ['Nuevo Baztán', 2001], ['Griñón', 2002], ['Los Molinos', 2003], ['Falces', 2004], ['Carrión de los Condes', 2005],
  ['Ricote', 2007], ['Ador', 2008], ['Renedo de Esgueva', 2009], ['Alfacar', 2023], ['Olvera', 2024],
  ['Aguilar de Campoo', '2024 Navidad'], ['San Sebastián de la Gomera', 2025], ['Quintanar del Rey', 2026],
];
// Rivales: pueblos ganadores + otros pueblos genéricos inventados
export const RIVALES = GANADORES.map((g) => g[0]).concat(['Villarrubia del Monte', 'Castrillo de la Ribera', 'Fuentesauco del Valle', 'San Martín de la Sierra', 'Peñalba de Arriba', 'Navalcuervo']);

// Alcaldes y padrinos ficticios (genéricos)
export const ALCALDES = ['Pilar Ortega', 'Andrés Molina', 'Carmen Vidal', 'Félix Navarro', 'Rosa Benítez', 'Ignacio Lara', 'Maite Serrano', 'Luis Campos'];
export const PADRINOS = ['Toni Estrella', 'Vera Lumen', 'Dani Saeta', 'Olga Ribera', 'Rafa Montes', 'Sara Vega', 'Quique Flash', 'Ana Sol'];

export const SPECIALS = [
  { id: 'normal', emoji: '⭐', name: 'Normal' },
  { id: 'peques', emoji: '🧒', name: 'Especial peques' },
  { id: 'aniversario', emoji: '🎂', name: '10.º aniversario' },
  { id: 'portugal', emoji: '🇵🇹', name: 'España-Portugal' },
  { id: 'navidad', emoji: '🎄', name: 'Navidad' },
  { id: 'campeones', emoji: '🏆', name: 'Campeones' },
  { id: 'noche', emoji: '🌙', name: 'Noche de verano' },
];
