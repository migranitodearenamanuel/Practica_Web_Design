// --- Ejercicio 6 ---

// 1.1 Crea un bucle for que vaya desde 0 a 9 y muestralo por consola.
// Creo un bucle que empieza en 0 (i=0), se repite mientras i sea menor que 10, y suma 1 a i en cada vuelta.
for (let i = 0; i < 10; i++) {
    // Enseño el valor de i en cada vuelta (0, 1, 2... hasta 9).
    console.log(i);
}

// 1.2 Crea un bucle for que vaya desde 0 a 9 y muestralo por consola solo cuando el resto del numero dividido entre 2 sea 0.
// Creo un bucle igual, del 0 al 9.
for (let i = 0; i < 10; i++) {
    // Si el resto de dividir el número por 2 es 0 (es par), entonces entro aquí.
    if (i % 2 === 0) {
        // Enseño el número par.
        console.log(i);
    }
}

// 1.3 Crea un bucle para conseguir dormir contando ovejas. Este bucle tiene que dar 10 vueltas, es decir, 10 console.log.
// Muestra por consola un mensaje diciendo 'Intentando dormir 🐑' en cada vuelta del bucle y cambia el mensaje en la décima vuelta a 'Dormido!'.

// Creo un bucle que empieza en 1 y termina en 10 (incluido).
for (let i = 1; i <= 10; i++) {
    // Si estoy en la última vuelta (la 10)...
    if (i === 10) {
        // ...digo que ya estoy dormido.
        console.log("Dormido!");
    } else {
        // En cualquier otra vuelta, sigo contando ovejas.
        console.log("Intentando dormir 🐑");
    }
}
