/* --- EJERCICIO 6: Find --- */
// 6.1 Dado el siguiente array, usa .find() para econtrar el número 100.
const numbers = [32, 21, 63, 95, 100, 67, 43];

// Busco el número 100 en la lista de números.
const number100 = numbers.find(number => number === 100);

// Muestro el número que he encontrado.
console.log('Ejercicio 6.1 - Encontrado:', number100);


// 6.2 Dado el siguiente array, usa .find() para econtrar la pelicula del año 2010.
const movies = [
    { title: 'Madagascar', stars: 4.5, date: 2015 },
    { title: 'Origen', stars: 5, date: 2010 },
    { title: 'Your Name', stars: 5, date: 2016 }
];

// Busco la película que tenga el año 2010 en su fecha.
const movie2010 = movies.find(movie => movie.date === 2010);

// Muestro la película del año 2010.
console.log('Ejercicio 6.2 - Película 2010:', movie2010);


// 6.3 Dado el siguiente javascript, usa .find() para econtrar el alien de nombre 
// 'Cucushumushu' y la mutación 'Porompompero'. Una vez que los encuentres, usa 
// spread operator para fusionarlos teniendo en cuenta que el objeto de la mutación 
// lo queremos meter en la propiedad .mutation del objeto fusionado.
const aliens = [
    { name: 'Zalamero', planet: 'Eden', age: 4029 },
    { name: 'Paktu', planet: 'Andromeda', age: 32 },
    { name: 'Cucushumushu', planet: 'Marte', age: 503021 }
];
const mutations = [
    { name: 'Porompompero', description: 'Hace que el alien pueda adquirir la habilidad de tocar el tambor' },
    { name: 'Fly me to the moon', description: 'Permite volar, solo y exclusivamente a la luna' },
    { name: 'Andando que es gerundio', description: 'Invoca a un señor mayor como Personal Trainer' }
];

// Busco al alien que se llama Cucushumushu.
const foundAlien = aliens.find(alien => alien.name === 'Cucushumushu');

// Busco la mutación que se llama Porompompero.
const foundMutation = mutations.find(mutation => mutation.name === 'Porompompero');

// Creo un súper alien fusionando el alien encontrado y añadiéndole la mutación dentro de una propiedad llamada 'mutation'.
// Uso ...foundAlien para copiar sus datos (name, planet, age) y luego añado la propiedad mutation.
// Para mutation, uso ...foundMutation si quisiera mezclarlo, pero el enunciado dice "meter en la propiedad .mutation". 
// Literalmente sería: mutation: foundMutation (objeto completo) o mutation: {...foundMutation} (copia).
// Haré una copia para ser seguro.
const superAlien = { ...foundAlien, mutation: { ...foundMutation } };

// Muestro el alien mutado.
console.log('Ejercicio 6.3 - Alien Mutado:', superAlien);
