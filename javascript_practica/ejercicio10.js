// --- Ejercicio 10 ---

const numbersAvg = [12, 21, 38, 5, 45, 37, 6];

function average(param) {
    // Creo una variable para sumar todos los números, empezando en 0.
    let sum = 0;

    // Recorro la lista de números.
    for (let i = 0; i < param.length; i++) {
        // Añado el número actual a la suma.
        sum += param[i];
    }

    // Calculo la media dividiendo la suma total entre la cantidad de números que hay.
    return sum / param.length;
}
