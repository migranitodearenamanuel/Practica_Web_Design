/* --- EJERCICIO 15 --- */

// Crea una función llamada swap que reciba un array y dos parametros que sean 
// indices del array. La función deberá intercambiar la posición de los valores de 
// los indices que hayamos enviado como parametro. Retorna el array resultante.
/*
Sugerencia de array:
const fantasticFour = [
  "La antorcha humana",
  "Mr. Fantástico",
  "La mujer invisible",
  "La cosa",
];
*/

const fantasticFour = [
    "La antorcha humana",
    "Mr. Fantástico",
    "La mujer invisible",
    "La cosa",
];

// Defino la función 'swap' que intercambia dos posiciones en la lista.
const swap = (array, index1, index2) => {
    // Guardo lo que hay en la primera posición en una variable auxiliar para no perderlo al sobreescribir.
    const temp = array[index1];

    // En la primera posición, pongo lo que hay en la segunda.
    array[index1] = array[index2];

    // En la segunda posición, pongo lo que guardé antes (lo de la primera).
    array[index2] = temp;

    // Devuelvo la lista con el cambio hecho.
    return array;
};

// Cambio a "La antorcha humana" (posición 0) por "La mujer invisible" (posición 2).
console.log('Ejercicio 15 - Intercambio:', swap(fantasticFour, 0, 2));
