// --- Ejercicio 14 ---

const counterWords = ['code', 'repeat', 'eat', 'sleep', 'code', 'enjoy', 'sleep', 'code', 'enjoy', 'upgrade', 'code'];

function repeatCounter(param) {
    // Creo un objeto vacío para guardar la cuenta de cada palabra.
    const count = {};

    // Recorro la lista de palabras.
    for (let i = 0; i < param.length; i++) {
        // Guardo la palabra actual en una variable para usarla fácil.
        const word = param[i];

        // Si la palabra ya está en mi contador...
        if (count[word]) {
            // ...le sumo 1 a su cuenta.
            count[word] += 1;
        } else {
            // Si no estaba, la añado y pongo que ha salido 1 vez.
            count[word] = 1;
        }
    }

    // Devuelvo el objeto con todas las cuentas.
    return count;
}
