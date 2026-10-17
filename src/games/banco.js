// Banco original de preguntas (escrito para este remake). [pregunta, [opciones], índice correcto]
export const PREGUNTAS = [
  ['¿Cuántas patas tiene una araña?', ['Seis', 'Ocho', 'Diez'], 1],
  ['¿Qué río pasa por Sevilla?', ['Ebro', 'Tajo', 'Guadalquivir'], 2],
  ['¿Cuál es la capital de Portugal?', ['Oporto', 'Lisboa', 'Coímbra'], 1],
  ['¿Qué planeta es el más grande del sistema solar?', ['Júpiter', 'Saturno', 'Marte'], 0],
  ['¿En qué estación caen las hojas?', ['Primavera', 'Otoño', 'Verano'], 1],
  ['¿Cuántos minutos tiene una hora?', ['60', '100', '30'], 0],
  ['¿De qué color es la clorofila?', ['Roja', 'Azul', 'Verde'], 2],
  ['¿Qué animal es el más rápido en tierra?', ['Guepardo', 'León', 'Caballo'], 0],
  ['¿Qué se celebra el 6 de enero en España?', ['San Juan', 'Reyes', 'Navidad'], 1],
  ['¿Cuál es el océano más grande?', ['Atlántico', 'Índico', 'Pacífico'], 2],
  ['¿Qué instrumento tiene teclas blancas y negras?', ['Piano', 'Violín', 'Trompeta'], 0],
  ['¿Cuántos lados tiene un hexágono?', ['Cinco', 'Seis', 'Ocho'], 1],
  ['¿De qué fruta se hace el gazpacho principalmente?', ['Tomate', 'Melón', 'Manzana'], 0],
  ['¿Qué gas respiramos para vivir?', ['Helio', 'Oxígeno', 'Nitrógeno'], 1],
  ['¿En qué continente está Egipto?', ['Asia', 'Europa', 'África'], 2],
  ['¿Qué ave no puede volar?', ['Pingüino', 'Gaviota', 'Paloma'], 0],
  ['¿Cuántos jugadores tiene un equipo de fútbol en el campo?', ['Nueve', 'Once', 'Doce'], 1],
  ['¿Cuál es la comunidad con más islas?', ['Galicia', 'Canarias', 'Murcia'], 1],
  ['¿Qué mes tiene 28 o 29 días?', ['Febrero', 'Abril', 'Junio'], 0],
  ['¿Qué metal es líquido a temperatura ambiente?', ['Hierro', 'Mercurio', 'Cobre'], 1],
];
export const DICCIONARIO = [
  ['Botijo', ['Vasija de barro que enfría el agua', 'Zapato de esparto', 'Sombrero de paja'], 0],
  ['Alféizar', ['Tipo de pan', 'Parte baja de la ventana', 'Baile andaluz'], 1],
  ['Zascandil', ['Persona inquieta y enredadora', 'Tipo de pez', 'Herramienta de campo'], 0],
  ['Ababol', ['Juguete de madera', 'Amapola', 'Postre de leche'], 1],
  ['Gañán', ['Mozo de labranza', 'Pájaro cantor', 'Tela fina'], 0],
  ['Sobremesa', ['Mantel grande', 'Tiempo tras la comida charlando', 'Mueble de cocina'], 1],
  ['Cachivache', ['Trasto inútil', 'Cría de vaca', 'Guiso de patata'], 0],
  ['Morriña', ['Nostalgia de la tierra', 'Lluvia fina', 'Queso curado'], 0],
  ['Chiscón', ['Habitación muy pequeña', 'Charco grande', 'Pan dulce'], 0],
  ['Birlar', ['Cantar en voz baja', 'Quitar algo con disimulo', 'Saltar a la pata coja'], 1],
  ['Tarambana', ['Persona alocada', 'Instrumento de cuerda', 'Fruta tropical'], 0],
  ['Pelele', ['Muñeco de paja', 'Piedra pulida', 'Cesta de mimbre'], 0],
];
// Preguntas numéricas para La patata caliente: [pregunta, respuesta, mínimo, máximo] (texto original)
export const NUMERICAS = [
  ['Año en que se descubrió la penicilina', 1928, 1850, 1990], ['Año de la llegada de Colón a América', 1492, 1400, 1600], ['Metros de altura de la Torre Eiffel (sin antenas)', 300, 100, 500],
  ['Número de huesos de un adulto', 206, 100, 300], ['Año del primer hombre en la Luna', 1969, 1940, 2000], ['Kilómetros de un maratón (redondeado)', 42, 10, 100],
  ['Teclas de un piano de cola', 88, 40, 120], ['Grados de un ángulo recto', 90, 10, 180], ['Días de un año bisiesto', 366, 300, 400],
  ['Número de provincias de España', 50, 20, 80], ['Año de inauguración de los Juegos Olímpicos de Barcelona', 1992, 1960, 2010], ['Minutos de un partido de fútbol sin descuento', 90, 30, 150],
  ['Patas de 3 arañas', 24, 6, 40], ['Velocidad del sonido en m/s (redondeada a cientos)', 300, 100, 1000], ['Año de publicación del Quijote (primera parte)', 1605, 1500, 1700],
];
// Frases de Los Pegajosos con la pose de los dos saltadores (ángulos en radianes)
const A = Math.PI;
export const POSES = [
  ['PASEAR AL PERRO', { body: 0, arms: [A * .15, A * .7], legs: [A * .4, A * .6] }, { body: A * .45, arms: [A * .5, A * .55], legs: [A * .5, A * .55], y: .75 }],
  ['SUBIR ESCALERAS', { body: 0, arms: [-A * .3, A * .8], legs: [A * .15, A * .55], y: .7 }, { body: 0, arms: [-A * .3, A * .8], legs: [A * .15, A * .55], y: .4 }],
  ['LEVANTAR PESAS', { body: 0, arms: [-A * .35, -A * .65], legs: [A * .35, A * .65] }, { body: 0, arms: [-A * .35, -A * .65], legs: [A * .35, A * .65] }],
  ['JUGAR AL FÚTBOL', { body: -.2, arms: [A * .1, A * .9], legs: [A * .05, A * .55] }, { body: 0, arms: [-A * .05, -A * .95], legs: [A * .3, A * .7], y: .45 }],
  ['TOCAR LA GUITARRA', { body: 0, arms: [A * .2, A * .05], legs: [A * .45, A * .55] }, { body: 0, arms: [-A * .5, A * .6], legs: [A * .35, A * .65] }],
  ['NADAR A CROL', { body: A * .5, arms: [-A * .1, A * .9], legs: [A * .48, A * .52] }, { body: A * .5, arms: [A * .1, A * 1.1], legs: [A * .46, A * .54], y: .35 }],
  ['BAILAR SEVILLANAS', { body: 0, arms: [-A * .6, -A * .25], legs: [A * .4, A * .5] }, { body: 0, arms: [-A * .75, -A * .4], legs: [A * .5, A * .6] }],
  ['HACER UNA FOTO', { body: 0, arms: [-A * .1, A * 1.1], legs: [A * .4, A * .6] }, { body: 0, arms: [-A * .4, -A * .6], legs: [A * .35, A * .65] }],
];
