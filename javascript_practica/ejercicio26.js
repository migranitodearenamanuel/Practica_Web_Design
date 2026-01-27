// --- Ejercicio 26 ---

const goodProducts = [];
const badProducts = [];
const products3 = [{ name: "Funko Dr. Strange", sellCount: 10 }, { name: "Mochila de protones: Ghostbusters", sellCount: 302 }, { name: "Sable laser FX", sellCount: 23 }, { name: "Varita de Voldemort", sellCount: 6 }];

// Usa un bucle para recorrer el array de productos y añade al array goodProducts los que tengan más de 20 ventas y al array badProducts los que tengan menos.

// Recorro los productos.
for (const product of products3) {
    // Si tiene más de 20 ventas...
    if (product.sellCount > 20) {
        // ...es un buen producto.
        goodProducts.push(product);
    }
    // Si tiene menos (o igual) a 20 ventas...
    else {
        // ...es un mal producto.
        badProducts.push(product);
    }
}

// Muestro las listas.
console.log("Buenos:", goodProducts);
console.log("Malos:", badProducts);
