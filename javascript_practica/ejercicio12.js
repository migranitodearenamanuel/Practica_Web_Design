// --- Ejercicio 12 ---

const duplicates = ['sushi', 'pizza', 'burger', 'potatoe', 'pasta', 'ice-cream', 'pizza', 'chicken', 'onion rings', 'pasta', 'soda'];

function removeDuplicates(param) {
    // Creo una lista vacía para ir guardando los elementos únicos.
    let unique = [];

    // Recorro la lista original con duplicados.
    for (let i = 0; i < param.length; i++) {
        // Pregunto: ¿Está ya este elemento en mi lista de únicos?
        if (!unique.includes(param[i])) {
            // Si NO está, lo añado. Si ya estaba, no hago nada.
            unique.push(param[i]);
        }
    }

    // Imprimo la lista limpia para verla (opcional, pero ayuda).
    console.log(unique);

    // Devuelvo la lista sin duplicados.
    return unique;
}
