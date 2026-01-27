// --- Ejercicio 4 ---

// 1.1 Consigue el valor "HULK" del array de avengers y muestralo por consola.
const avengers1 = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
// Busco al primer Vengador de la lista, que está en la posición 0, y lo enseño.
console.log(avengers1[0]);

// 1.2 Cambia el primer elemento de avengers a "IRONMAN"
const avengers2 = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
// Cambio al Vengador de la posición 0 por "IRONMAN".
avengers2[0] = "IRONMAN";

// 1.3 console numero de elementos en el array usando la propiedad correcta de Array.
const avengers3 = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
// Cuento cuántos Vengadores hay en la lista y lo enseño.
console.log(avengers3.length);

// 1.4 Añade 2 elementos al array: "Morty" y "Summer". Muestra en consola el último personaje del array
const rickAndMortyCharacters1 = ["Rick", "Beth", "Jerry"];
// Añado a "Morty" al final de la lista.
rickAndMortyCharacters1.push("Morty");
// Añado a "Summer" al final de la lista.
rickAndMortyCharacters1.push("Summer");
// Miro cuál es el último personaje de la lista y lo enseño.
console.log(rickAndMortyCharacters1[rickAndMortyCharacters1.length - 1]);

// 1.5 Elimina el último elemento del array y muestra el primero y el último por consola.
const rickAndMortyCharacters2 = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
// Quito al último personaje de la fila.
rickAndMortyCharacters2.pop();
// Enseño al primer personaje de la lista.
console.log(rickAndMortyCharacters2[0]);
// Enseño al que ahora es el último personaje de la lista.
console.log(rickAndMortyCharacters2[rickAndMortyCharacters2.length - 1]);

// 1.6 Elimina el segundo elemento del array y muestra el array por consola.
const rickAndMortyCharacters3 = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
// Quito 1 personaje que está en la posición 1 (el segundo), es decir, a Beth.
rickAndMortyCharacters3.splice(1, 1);
// Enseño cómo ha quedado la lista de personajes.
console.log(rickAndMortyCharacters3);
