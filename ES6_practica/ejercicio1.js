/* --- EJERCICIO 1: Arrow Functions --- */
// Crea una arrow function que tenga dos parametros a y b y 
// que por defecto el valor de a = 10 y de b = 5. Haz que la función muestre 
// por consola la suma de los dos parametros.

// Defino la función flecha 'sum' que acepta dos cosas: 'a' (si no me dan nada vale 10) y 'b' (si no me dan nada vale 5).
const sum = (a = 10, b = 5) => {
    // Sumo lo que vale 'a' con lo que vale 'b' y lo muestro en la pantalla.
    console.log('Resultado suma:', a + b);
};

// 1.1 Ejecuta esta función sin pasar ningún parametro
// Llamo a la cajita 'sum' sin darle nada, así que usará el 10 y el 5.
console.log('--- Ejercicio 1.1 ---');
sum();

// 1.2 Ejecuta esta función pasando un solo parametro
// Llamo a la cajita 'sum' dándole solo el primer número (20). El segundo seguirá siendo 5.
console.log('--- Ejercicio 1.2 ---');
sum(20);

// 1.3 Ejecuta esta función pasando dos parametros
// Llamo a la cajita 'sum' dándole los dos números (30 y 40). No usará los que tenía guardados por defecto.
console.log('--- Ejercicio 1.3 ---');
sum(30, 40);
