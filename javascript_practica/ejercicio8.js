// --- Ejercicio 8 ---

const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];

function findLongestWord(param) {
    // Creo una variable para guardar la palabra más larga y empiezo con la primera de la lista.
    let longestWord = param[0];

    // Recorro toda la lista de palabras desde la segunda posición (índice 1).
    for (let i = 1; i < param.length; i++) {
        // Si la palabra actual es más larga que la que tengo guardada...
        if (param[i].length > longestWord.length) {
            // ...entonces la guardo como la nueva palabra más larga.
            longestWord = param[i];
        }
    }

    // Devuelvo la palabra más larga que encontré.
    return longestWord;
}
