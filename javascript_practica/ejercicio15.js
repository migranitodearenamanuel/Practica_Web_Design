// --- Ejercicio 15 ---

const products = ['Camiseta de Pokemon', 'Pantalón coquinero', 'Gorra de gansta', 'Camiseta de Basket', 'Cinrurón de Orión', 'AC/DC Camiseta'];

// Haz un bucle y muestra por consola todos aquellos valores del array que incluyan la palabra "Camiseta". Usa la función .includes de javascript.

// Recorro la lista de productos usando un bucle.
for (let i = 0; i < products.length; i++) {
    // Si el producto incluye la palabra "Camiseta"...
    if (products[i].includes('Camiseta')) {
        // ...lo muestro por consola.
        console.log(products[i]);
    }
}
