/* --- EJERCICIO 13 --- */

// Usando la función anterior beneficiate de poder conocer el indice del array 
// para crear una función llamada removeItem que pasandole un array y un texto 
// como parametros (los mismos parametros que en el anterior ejercicio) llame a 
// la función anteriormente creada findArrayIndex y obten el indice para 
// posteriormente usar la función de javascript .splice() para eliminar el 
// elemento del array.
// Finalmente retorna el array.
// De nuevo haz varios ejemplos para practicar y comprueba que funcionan 
// correctamente.

const mainCharacters = [
    "Luke",
    "Leia",
    "Han Solo",
    "Chewbacca",
    "Rey",
    "Anakin",
    "Obi-Wan",
];

// Copio la función del ejercicio anterior para que este archivo funcione solo.
const findArrayIndex = (array, text) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === text) {
            return i;
        }
    }
    return -1;
};

// Defino la función 'removeItem' que borra un texto de la lista.
const removeItem = (array, text) => {
    // Primero uso mi otra función para saber en qué número de posición está el texto.
    const position = findArrayIndex(array, text);

    // Si la posición es mayor que -1, significa que existe.
    if (position > -1) {
        // Uso .splice(posición, 1) para borrar 1 elemento en esa posición.
        array.splice(position, 1);
    }

    // Devuelvo la lista ya modificada.
    return array;
};

// Intento borrar a 'Anakin' de la lista.
console.log('Ejercicio 13 - Borrando Anakin:', removeItem(mainCharacters, "Anakin"));

// Ahora intento borrar a 'R2-D2', que no existe (la lista no cambiará).
console.log('Ejercicio 13 - Borrando R2-D2:', removeItem(mainCharacters, "R2-D2"));
