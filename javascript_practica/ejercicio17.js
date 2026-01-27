// --- Ejercicio 17 ---

const alien = { name: 'Wormuck', race: 'Cucusumusu', planet: 'Eden', weight: '259kg' };

// Usa un for...in para imprimir por consola los datos del alienígena.

// Recorro cada clave (key) dentro del objeto alien.
for (const key in alien) {
    // Muestro la clave (ej. 'name') y su valor (ej. 'Wormuck').
    // Uso alien[key] para acceder al valor.
    console.log(`${key}: ${alien[key]}`);
}
