// --- Ejercicio 24 ---

const products2 = [{ name: "Funko Dr. Strange", sellCount: 10 }, { name: "Mochila de protones: Ghostbusters", sellCount: 302 }, { name: "Sable laser FX", sellCount: 23 }, { name: "Varita de Voldemort", sellCount: 6 }];

// Usa un bucle para sumar el total de las ventas (sellCount).

// Creo una caja para guardar la suma total, empezando en 0.
let totalSales = 0;

// Recorro los productos.
for (const product of products2) {
    // Añado las ventas de cada producto al total.
    totalSales += product.sellCount;
}

// Muestro el total.
console.log(totalSales);
