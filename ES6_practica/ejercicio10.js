/* --- EJERCICIO 10 --- */

// Dado el siguiente javascript usa forof y forin para hacer la media del 
// volumen de todos los sonidos favoritos que tienen los usuarios.
const usersSounds = [
    { name: "Alberto", favoritesSounds: { waves: { format: "mp3", volume: 50 }, rain: { format: "ogg", volume: 60 }, firecamp: { format: "mp3", volume: 80 } } },
    { name: "Antonio", favoritesSounds: { waves: { format: "mp3", volume: 30 }, shower: { format: "ogg", volume: 55 }, train: { format: "mp3", volume: 60 } } },
    { name: "Pedro", favoritesSounds: { shower: { format: "mp3", volume: 50 }, train: { format: "ogg", volume: 60 }, firecamp: { format: "mp3", volume: 80 } } },
    { name: "Cristina", favoritesSounds: { waves: { format: "mp3", volume: 67 }, wind: { format: "ogg", volume: 35 }, firecamp: { format: "mp3", volume: 60 } } },
];

// Preparo una variable para sumar todo el volumen.
let totalVolume = 0;
// Preparo otra variable para contar cuántos sonidos hay en total.
let count = 0;

// Recorro cada usuario de la lista.
for (const user of usersSounds) {
    // Dentro de cada usuario, recorro sus sonidos favoritos usando las claves (keys).
    for (const key in user.favoritesSounds) {
        // Saco el sonido concreto (por ejemplo, el objeto de 'waves').
        const sound = user.favoritesSounds[key];

        // Sumo su volumen al total.
        totalVolume += sound.volume;

        // Cuento que he encontrado un sonido más.
        count++;
    }
}

// Calculo la media dividiendo el volumen total entre la cantidad de sonidos.
const averageVolume = totalVolume / count;

// Muestro la media del volumen.
console.log('Ejercicio 10 - Media Volumen:', averageVolume);
