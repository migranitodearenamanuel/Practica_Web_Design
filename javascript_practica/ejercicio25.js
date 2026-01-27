// --- Ejercicio 25 ---

const products2 = [{ name: "Funko Dr. Strange", sellCount: 10 }, { name: "Mochila de protones: Ghostbusters", sellCount: 302 }, { name: "Sable laser FX", sellCount: 23 }, { name: "Varita de Voldemort", sellCount: 6 }];

// Usa un bucle para sumar el total de las ventas (sellCount) de todos los productos y mostrar por consola la media de ventas.

// Igual que antes, sumo todas las ventas primero.
let totalSales = 0;

for (const product of products2) {
    totalSales += product.sellCount;
}

// Calculo el promedio: el total dividido entre el número de productos.
const averageSales = totalSales / products2.length;

// Muestro el promedio.
console.log(averageSales);
