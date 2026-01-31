/* --- EJERCICIO 4: Map --- */

// 4.1 Dado el siguiente array, devuelve un array con sus nombres 
// utilizando .map().
const usersMap = [
    { id: 1, name: 'Abel' },
    { id: 2, name: 'Julia' },
    { id: 3, name: 'Pedro' },
    { id: 4, name: 'Amanda' }
];

// Recorro la lista de usuarios y voy guardando solo los nombres en una lista nueva.
const names = usersMap.map(user => user.name);

// Muestro la lista solo con los nombres.
console.log('Ejercicio 4.1 - Nombres:', names);


// 4.2 Dado el siguiente array, devuelve una lista que contenga los valores 
// de la propiedad .name y cambia el nombre a 'Anacleto' en caso de que 
// empiece por 'A'.
const usersMap2 = [
    { id: 1, name: 'Abel' },
    { id: 2, name: 'Julia' },
    { id: 3, name: 'Pedro' },
    { id: 4, name: 'Amanda' }
];

// Recorro la segunda lista de usuarios.
const anacletos = usersMap2.map(user => {
    // Si la primera letra del nombre es 'A'...
    if (user.name.startsWith('A')) {
        // ...lo cambio por 'Anacleto'.
        return 'Anacleto';
    } else {
        // Si no, dejo el nombre como estaba.
        return user.name;
    }
});

// Muestro la lista modificada.
console.log('Ejercicio 4.2 - Anacletos:', anacletos);


// 4.3 Dado el siguiente array, devuelve una lista que contenga los valores 
// de la propiedad .name y añade al valor de .name el string ' (Visitado)' 
// cuando el valor de la propiedad isVisited = true.
const cities = [
    { isVisited: true, name: 'Tokyo' },
    { isVisited: false, name: 'Madagascar' },
    { isVisited: true, name: 'Amsterdam' },
    { isVisited: false, name: 'Seul' }
];

// Recorro la lista de ciudades.
const visitedCities = cities.map(city => {
    // Si la ciudad ha sido visitada (es true)...
    if (city.isVisited === true) {
        // ...le añado la etiqueta '(Visitado)' al final del nombre.
        return `${city.name} (Visitado)`;
    }
    // Si no he ido, devuelvo solo el nombre.
    return city.name;
});

// Muestro la lista de ciudades marcadas.
console.log('Ejercicio 4.3 - Ciudades:', visitedCities);
