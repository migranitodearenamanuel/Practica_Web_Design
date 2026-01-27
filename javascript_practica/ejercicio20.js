// --- Ejercicio 20 ---

const popularToys = [];
const toys2 = [{ id: 5, name: 'Buzz MyYear', sellCount: 10 }, { id: 11, name: 'Action Woman', sellCount: 24 }, { id: 23, name: 'Barbie Man', sellCount: 15 }, { id: 40, name: 'El gato con Guantes', sellCount: 8 }, { id: 40, name: 'El gato felix', sellCount: 35 }];

// Usa un bucle for...of para recorrer todos los juguetes y añade los que tengan más de 15 ventas (sellCount) al array popularToys.

// Recorro cada juguete de la lista toys2.
for (const toy of toys2) {
    // Si el contador de ventas es mayor que 15...
    if (toy.sellCount > 15) {
        // ...lo añado a la lista de juguetes populares.
        popularToys.push(toy);
    }
}

// Muestro los juguetes populares.
console.log(popularToys);
