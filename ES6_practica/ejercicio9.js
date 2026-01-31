/* --- EJERCICIO 9 --- */

// Dado el siguiente javascript usa forof para recorrer el array de películas, 
// genera un nuevo array con las categorías de las películas e imprime por 
// consola el array de categorías. Ten en cuenta que las categorías no deberían 
// repetirse.
// Para filtrar las categorías puedes ayudarte de la función .includes().
const movies2 = [
    { title: "Bracula: Condemor II", duration: 192, categories: ["comedia", "aventura"] },
    { title: "Spider-Man: No Way Home", duration: 122, categories: ["aventura", "acción"] },
    { title: "The Voices", duration: 223, categories: ["comedia", "thriller"] },
    { title: "Shrek", duration: 111, categories: ["comedia", "aventura", "animación"] },
];

// Creo una caja vacía (lista) para ir guardando las categorías que encuentre.
const categories = [];

// Recorro cada película de la lista de películas.
for (const movie of movies2) {
    // Ahora recorro cada categoría de la película que estoy mirando.
    for (const category of movie.categories) {
        // Pregunto: ¿Esta categoría YA está en mi caja 'categories'?
        if (!categories.includes(category)) {
            // Si NO está, la meto en la caja.
            categories.push(category);
        }
    }
}

// Muestro todas las categorías que he encontrado sin repetir.
console.log('Ejercicio 9 - Categorías únicas:', categories);
