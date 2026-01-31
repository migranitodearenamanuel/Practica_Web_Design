/* --- EJERCICIO 3: Spread Operator --- */

// 3.1 Dado el siguiente array, crea una copia usando spread operators.
const pointsList = [32, 54, 21, 64, 75, 43];

// Creo una lista nuevecita y le vuelco dentro todos los puntos de la lista anterior.
const pointsListCopy = [...pointsList];

// Muestro la copia.
console.log('Ejercicio 3.1 - Copia:', pointsListCopy);


// 3.2 Dado el siguiente objeto, crea una copia usando spread operators.
const toy = { name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor' };

// Creo un juguete nuevo y le copio todas las características del juguete 'toy'.
const toyCopy = { ...toy };

// Muestro la copia del juguete.
console.log('Ejercicio 3.2 - Copia Juguete:', toyCopy);


// 3.3 Dado los siguientes arrays, crea un nuevo array juntandolos usando 
// spread operatos.
const pointsList3 = [32, 54, 21, 64, 75, 43];
const pointsLis2 = [54, 87, 99, 65, 32];

// Creo una lista grande 'allPoints' vaciando primero la lista 3 y luego la lista 2 dentro.
const allPoints = [...pointsList3, ...pointsLis2];

// Muestro la lista fusionada.
console.log('Ejercicio 3.3 - Fusión Arrays:', allPoints);


// 3.4 Dado los siguientes objetos. Crea un nuevo objeto fusionando los dos 
// con spread operators.
const toy2 = { name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor' };
const toyUpdate = { lights: 'rgb', power: ['Volar like a dragon', 'MoonWalk'] };

// Creo un súper juguete mezclando las cosas del juguete original y las mejoras del update.
const superToy = { ...toy2, ...toyUpdate };

// Muestro el juguete definitivo.
console.log('Ejercicio 3.4 - Fusión Objetos:', superToy);


// 3.5 Dado el siguiente array. Crear una copia de él eliminando la posición 2 
// pero sin editar el array inicial. De nuevo, usando spread operatos.
const colors = ['rojo', 'azul', 'amarillo', 'verde', 'naranja'];

// La posición 2 es 'amarillo' (0, 1, 2).
// Cojo los colores desde el principio hasta el amarillo (sin incluirlo) -> ['rojo', 'azul'].
// Cojo los colores desde después del amarillo hasta el final -> ['verde', 'naranja'].
// Los junto todos en una nueva lista.
const colorsWithoutYellow = [...colors.slice(0, 2), ...colors.slice(3)];

// Muestro los colores sin el amarillo.
console.log('Ejercicio 3.5 - Sin amarillo:', colorsWithoutYellow);
