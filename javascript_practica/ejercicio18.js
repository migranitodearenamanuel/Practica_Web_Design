// --- Ejercicio 18 ---

const placesToTravelObjects = [{ id: 5, name: 'Japan' }, { id: 11, name: 'Venecia' }, { id: 23, name: 'Murcia' }, { id: 40, name: 'Santander' }, { id: 44, name: 'Filipinas' }, { id: 59, name: 'Madagascar' }];

// Usa un bucle for para recorrer todos los destinos del array y elimina los elementos que tengan el id 11 y 40. Imprime en un console log el array.

// Recorro la lista hacia atrás. ¿Por qué? Porque si borrara elementos yendo hacia adelante, los índices cambiarían y me saltaría cosas.
for (let i = placesToTravelObjects.length - 1; i >= 0; i--) {
    // Si el id es 11 o es 40...
    if (placesToTravelObjects[i].id === 11 || placesToTravelObjects[i].id === 40) {
        // ...elimino ese elemento. Splice borra, i es la posición y 1 es cuantos borro.
        placesToTravelObjects.splice(i, 1);
    }
}

// Muestro cómo ha quedado la lista.
console.log(placesToTravelObjects);
