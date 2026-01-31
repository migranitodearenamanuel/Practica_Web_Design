/* --- EJERCICIO 12 --- */

// Crea una función llamada findArrayIndex que reciba como parametros un array de textos y un texto y devuelve la posición del array cuando el valor del array sea igual al valor del texto que enviaste como parametro.
// Haz varios ejemplos y compruebalos.

// Esta es la lista de personajes donde vamos a buscar.
const mainCharacters = [
    "Luke",
    "Leia",
    "Han Solo",
    "Chewbacca",
    "Rey",
    "Anakin",
    "Obi-Wan",
];

// Defino la función 'findArrayIndex' que pide una lista (array) y un texto a buscar.
const findArrayIndex = (array, text) => {
    // Recorro la lista desde el principio hasta el final.
    for (let i = 0; i < array.length; i++) {
        // Miro si el elemento en la posición actual (i) es igual al texto que busco.
        if (array[i] === text) {
            // Si lo encuentro, devuelvo el número de la posición (i) y termino.
            return i;
        }
    }

    // Si llego aquí es porque he recorrido toda la lista y no lo he encontrado, así que devuelvo -1.
    return -1;
};

// Pruebo buscando a 'Han Solo'. Debería decirme su posición.
console.log('Ejercicio 12 - Han Solo está en:', findArrayIndex(mainCharacters, "Han Solo"));

// Pruebo buscando a 'Rey'.
console.log('Ejercicio 12 - Rey está en:', findArrayIndex(mainCharacters, "Rey"));

// Pruebo buscando a 'Yoda', que no está en la lista. Debería dar -1.
console.log('Ejercicio 12 - Yoda está en:', findArrayIndex(mainCharacters, "Yoda"));
