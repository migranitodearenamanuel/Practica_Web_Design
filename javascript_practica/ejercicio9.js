// --- Ejercicio 9 ---

const numbersSum = [1, 2, 3, 5, 45, 37, 58];

function sumAll(param) {
    // Creo una variable para ir acumulando la suma y empiezo en 0.
    let sum = 0;

    // Recorro toda la lista de números.
    for (let i = 0; i < param.length; i++) {
        // Sumo el número actual a mi caja de suma.
        sum += param[i];
    }

    // Devuelvo el resultado total de la suma.
    return sum;
}
