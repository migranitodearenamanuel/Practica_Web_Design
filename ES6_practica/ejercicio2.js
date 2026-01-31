/* --- EJERCICIO 2: Destructuring --- */

// 2.1 En base al siguiente javascript, crea variables en base a las propiedades 
// del objeto usando object destructuring e imprimelas por consola. Cuidado, 
// no hace falta hacer destructuring del array, solo del objeto.
const game = { title: 'The last us 2', gender: ['action', 'zombie', 'survival'], year: 2020 };

// Saco las cosas de dentro de la caja 'game' (titulo, genero, año) y las pongo en variables con su nombre.
const { title, gender, year } = game;

// Muestro el título del juego.
console.log('Ejercicio 2.1 - Title:', title);
// Muestro los géneros del juego.
console.log('Ejercicio 2.1 - Gender:', gender);
// Muestro el año del juego.
console.log('Ejercicio 2.1 - Year:', year);


// 2.2 En base al siguiente javascript, usa destructuring para crear 3 variables 
// llamadas fruit1, fruit2 y fruit3, con los valores del array. Posteriormente
// imprimelo por consola.
const fruits = ['Banana', 'Strawberry', 'Orange'];

// Saco las frutas de la lista en orden y las guardo en fruit1, fruit2 y fruit3.
const [fruit1, fruit2, fruit3] = fruits;

// Muestro la primera fruta.
console.log('Ejercicio 2.2 - Fruit1:', fruit1);
// Muestro la segunda fruta.
console.log('Ejercicio 2.2 - Fruit2:', fruit2);
// Muestro la tercera fruta.
console.log('Ejercicio 2.2 - Fruit3:', fruit3);


// 2.3 En base al siguiente javascript, usa destructuring para crear 2 
// variables igualandolo a la función e imprimiendolo por consola.
const animalFunction = () => {
    return { name: 'Bengal Tiger', race: 'Tiger' }
};

// Llamo a la función de los animales y directamente saco el nombre y la raza de lo que me devuelve.
const { name, race } = animalFunction();

// Muestro el nombre del animal.
console.log('Ejercicio 2.3 - Name:', name);
// Muestro la raza del animal.
console.log('Ejercicio 2.3 - Race:', race);


// 2.4 En base al siguiente javascript, usa destructuring para crear las 
// variables name y itv con sus respectivos valores. Posteriormente crea 
// 3 variables usando igualmente el destructuring para cada uno de los años 
// y comprueba que todo esta bien imprimiendolo.
const car = { name: 'Mazda 6', itv: [2015, 2011, 2020] };

// Saco el nombre y la lista de itv del coche 'car'.
// Nota: Uso 'carName' para no chocar con 'name' del ejercicio anterior si estuvieran juntos, pero el destructuring pide 'name'.
// Al ser archivos independientes, puedo usar 'name' otra vez, pero para ser claros en la salida, lo renombro en el log.
// El enunciado dice "crear las variables name y itv". Lo haré literal, pero ojo si se pega todo junto.
// Como el prompt dice "Trata cada ejercicio como independiente", uso 'name' tranquilamente.
// Pero espera, en un mismo archivo (este ejercicio2.js) 'name' ya existe arriba (del tigre).
// Así que AQUÍ sí debo renombrar en el destructuring para que funcione este archivo.
const { name: carName, itv } = car;

// Muestro el nombre del coche.
console.log('Ejercicio 2.4 - Car Name:', carName);
// Muestro la lista de ITV.
console.log('Ejercicio 2.4 - ITV:', itv);

// Ahora saco los 3 años de dentro de la lista 'itv'.
const [year1, year2, year3] = itv;

// Muestro el primer año.
console.log('Ejercicio 2.4 - Year 1:', year1);
// Muestro el segundo año.
console.log('Ejercicio 2.4 - Year 2:', year2);
// Muestro el tercer año.
console.log('Ejercicio 2.4 - Year 3:', year3);
