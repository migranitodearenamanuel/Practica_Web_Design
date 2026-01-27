// --- Ejercicio 13 ---

const nameFinder = ['Peter', 'Steve', 'Tony', 'Natasha', 'Clint', 'Logan', 'Xabier', 'Bruce', 'Peggy', 'Jessica', 'Marc'];

function finderName(param, value) {
    // He añadido 'value' como segundo parámetro porque necesito saber QUÉ buscar.
    // Param es la lista donde buscar, value es el nombre a buscar.

    // Recorro la lista de nombres.
    for (let i = 0; i < param.length; i++) {
        // Si el nombre actual es igual al que busco...
        if (param[i] === value) {
            // Devuelvo true (lo encontré) y su posición (i).
            return { found: true, position: i };
        }
    }

    // Si termino el bucle y no lo encontré, devuelvo false.
    return { found: false };
}
