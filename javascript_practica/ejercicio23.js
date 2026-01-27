// --- Ejercicio 23 ---

const movies = [{ name: "Titan A.E.", durationInMinutes: 130 }, { name: "Nightmare before Christmas", durationInMinutes: 225 }, { name: "Inception", durationInMinutes: 165 }, { name: "The Lord of the Rings", durationInMinutes: 967 }, { name: "Star Wars: A New Hope", durationInMinutes: 214 }, { name: "Terminator", durationInMinutes: 140 }];

// Usa un bucle para crear 3 arrays de peliculas filtrados por categorias. Pelicula pequeña (<100 min), mediana (>100 y <200), grande (>200).

// Creo los tres carritos (arrays) para clasificar las pelis.
const smallMovies = [];
const mediumMovies = [];
const largeMovies = [];

// Recorro todas las películas.
for (const movie of movies) {
    // Si dura menos de 100 minutos...
    if (movie.durationInMinutes < 100) {
        // ...va al carrito de pequeñas.
        smallMovies.push(movie);
    }
    // Si dura más de 100 Y menos de 200...
    else if (movie.durationInMinutes > 100 && movie.durationInMinutes < 200) {
        // ...va al carrito de medianas.
        mediumMovies.push(movie);
    }
    // Si dura más de 200...
    else if (movie.durationInMinutes > 200) {
        // ...va al carrito de grandes.
        largeMovies.push(movie);
    }
}

// Muestro los resultados.
console.log("Pequeñas:", smallMovies);
console.log("Medianas:", mediumMovies);
console.log("Grandes:", largeMovies);
