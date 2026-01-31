/* --- EJERCICIO 5: Filter --- */

// 5.1 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
// con los valores que sean mayor que 18
const ages = [22, 14, 24, 55, 65, 21, 12, 13, 90];

// Me guardo en una lista nueva solo los números que sean mayores de 18.
const adults = ages.filter(age => age > 18);

// Muestro los mayores de edad.
console.log('Ejercicio 5.1 - Adultos:', adults);


// 5.2 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
// con los valores que sean par.
const ages2 = [22, 14, 24, 55, 65, 21, 12, 13, 90];

// Me guardo solo los números pares (los que al dividir por 2 da exacto, resto 0).
const evens = ages2.filter(age => age % 2 === 0);

// Muestro los pares.
console.log('Ejercicio 5.2 - Pares:', evens);


// 5.3 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
// con los streamers que tengan el gameMorePlayed = 'League of Legends'.
const streamers = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'}, 
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];

// Filtro la lista para quedarme solo con los que juegan al LoL.
const lolPlayers = streamers.filter(streamer => streamer.gameMorePlayed === 'League of Legends');

// Muestro los loleros.
console.log('Ejercicio 5.3 - LoL Players:', lolPlayers);


// 5.4 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
// con los streamers que incluyan el caracter 'u' en su propiedad .name. Recomendamos 
// usar la funcion .includes() para la comprobación.
const streamers2 = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];

// Filtro los que tienen la letra 'u' en su nombre.
const withU = streamers2.filter(streamer => streamer.name.includes('u'));

// Muestro los que tienen 'u'.
console.log('Ejercicio 5.4 - Tienen U:', withU);


// 5.5 utiliza .filter() para generar un nuevo array con los streamers que incluyan 
// el caracter 'Legends' en su propiedad .gameMorePlayed. Recomendamos usar la funcion 
// .includes() para la comprobación.
// Además, pon el valor de la propiedad .gameMorePlayed a MAYUSCULAS cuando 
// .age sea mayor que 35.

const legendsPlayers = streamers2.filter(streamer => {
    // Miro si juegan a algo con 'Legends'.
    const playsLegends = streamer.gameMorePlayed.includes('Legends');
    
    // Si juegan a Legends, entro al if.
    if (playsLegends) {
        // Aprovecho para mirar si son mayores de 35.
        if (streamer.age > 35) {
            // Si son mayores, les pongo el juego en mayúsculas.
            streamer.gameMorePlayed = streamer.gameMorePlayed.toUpperCase();
        }
        // Devuelvo true para quedármelo en la lista.
        return true;
    }
    // Si no juega a Legends, no lo quiero (devuelvo false).
    return false;
});

// Muestro la lista filtrada y modificada.
console.log('Ejercicio 5.5 - Legends:', legendsPlayers);


// 5.6 Dado el siguiente HTML (recuerda enlazar el js)
/* <!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
</head>
<body>
<input type="text" data-function="toFilterStreamers"/>
</body>
</html>
*/

// Dado el siguiente javascript, utiliza .filter() para mostrar por consola 
// los streamers que incluyan la palabra introducida en el input. De esta forma, si 
// introduzco 'Ru' me deberia de mostrar solo el streamer 'Rubius'. Si
// introduzco 'i', me deberia de mostrar el streamer 'Rubius' e 'Ibai'.
const streamers3 = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];

// Este código solo funcionaría en un navegador, así que lo dejo listo pero comentado o protegido.
// Busco el input en el HTML.
// const input = document.querySelector('input[data-function="toFilterStreamers"]');

// // Si encuentro el input, le pongo una oreja para escuchar cuando escriben.
// if (input) {
//     input.addEventListener('input', (event) => {
//         // Cojo lo que ha escrito el usuario.
//         const text = event.target.value.toLowerCase();
        
//         // Filtro los streamers cuyo nombre incluye el texto escrito (en minúsculas todo).
//         const filtered = streamers3.filter(streamer => 
//             streamer.name.toLowerCase().includes(text)
//         );
        
//         // Muestro por consola los que coinciden.
//         console.log('Ejercicio 5.6 - Streamers filtrados:', filtered);
//     });
// } else {
//     console.log('Ejercicio 5.6: No estoy en un navegador con el HTML correcto');
// }
