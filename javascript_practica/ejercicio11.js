// --- Ejercicio 11 ---

const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];

function averageWord(param) {
    // Creo una variable para la suma total.
    let sum = 0;

    // Recorro toda la lista de cosas mezcladas.
    for (let i = 0; i < param.length; i++) {
        // Miro qué tipo de cosa es el elemento actual.
        if (typeof param[i] === 'number') {
            // Si es un número, lo sumo tal cual.
            sum += param[i];
        } else if (typeof param[i] === 'string') {
            // Si es una palabra, sumo su longitud (cuántas letras tiene).
            sum += param[i].length;
        }
    }

    // Devuelvo la media total (suma dividida por la cantidad de elementos).
    return sum / param.length;
}
