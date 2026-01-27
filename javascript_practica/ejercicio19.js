// --- Ejercicio 19 ---

const toys = [{ id: 5, name: 'Buzz MyYear' }, { id: 11, name: 'Action Woman' }, { id: 23, name: 'Barbie Man' }, { id: 40, name: 'El gato con Guantes' }, { id: 40, name: 'El gato felix' }];

// Usa un bucle for para recorrer todos los juguetes y elimina los que incluyan la palabra gato. Recuerda que puedes usar la función .includes() para comprobarlo.

// Igual que antes, recorro la lista hacia atrás para poder borrar sin romper nada.
for (let i = toys.length - 1; i >= 0; i--) {
    // Si el nombre del juguete incluye la palabra 'gato'...
    if (toys[i].name.includes('gato')) {
        // ...lo elimino de la lista.
        toys.splice(i, 1);
    }
}

// Muestro la lista final.
console.log(toys);
