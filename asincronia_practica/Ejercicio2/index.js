/* --- EJERCICIO 2: PokeAPI --- */

/* CONTEXTO HTML (index.html):
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="index.js" defer></script>
</head>
<body>
    <img class="random-image">
</body>
</html>
*/

/* ENUNCIADO E INSTRUCCIONES (index.js):
   1. Ahora realizaremos una petición a la PokeAPI, queremos mostrar al entrar en la página la imagen de un Pokemon, la magia estará en que cada vez que recargues la página, será un nuevo Pokemon dentro de la primera generación de Pokemon, es decir, del 1 al 151.
   Los Pokemon no solo tienen una imagen, si no que tendrán muchas, hay que hallar la manera de encontrar la que más os guste.
   
   2. HTML y URL: Para ello el HTML será muy sencillo, y la URL esta vez os la aportaremos directamente, aunque os aconsejamos echarle un ojo a la documentación ya que es muy completa.
   Documentación: https://pokeapi.co/
   URL: https://pokeapi.co/api/v2/pokemon/1
   
   Tened en cuenta que esta URL se refiere al pokemon número 1, que es bulbasaur, debemos hallar la manera de con una url similar ir consiguiendo pokemons aleatorios dentro de unos límites.
*/

// ESCRIBE TU CÓDIGO A CONTINUACIÓN:

// Primero, busco en mi HTML la etiqueta de imagen donde voy a pintar al Pokemon y la guardo en la variable 'imgPokemon'.
const imgPokemon = document.querySelector(".random-image");

// Creo la función asíncrona 'obtenerPokemonAleatorio' porque voy a tener que esperar a que internet me responda.
const obtenerPokemonAleatorio = async () => {
    // Uso un bloque 'try-catch' por si acaso internet falla o la API no responde.
    try {
        // Necesito un número al azar entre el 1 y el 151 (los originales).
        // Math.random() da un número tipo 0.123... lo multiplico por 151 y le quito los decimales con Math.floor.
        // Le sumo 1 porque si sale 0 no vale (los pokemon empiezan en el 1).
        const idAleatorio = Math.floor(Math.random() * 151) + 1;

        // Ahora preparo la dirección de internet. Fíjate que al final le pego mi número aleatorio.
        // Uso las comillas invertidas (backticks) para poder meter variables dentro del texto fácilmente.
        const url = `https://pokeapi.co/api/v2/pokemon/${idAleatorio}`;

        // Le digo al navegador: "Ve a esa dirección y tráeme la info". Espero con 'await'.
        const respuesta = await fetch(url);

        // Cuando vuelve la respuesta, le digo: "Traduce eso a JSON para que lo entienda". Espero con 'await'.
        const datos = await respuesta.json();

        // Ahora busco la imagen que más me guste dentro de todos los datos que me ha dado.
        // Voy a entrar en 'sprites', luego en 'other', luego en 'official-artwork' y cojo la 'front_default' que se ve muy bien en HD.
        const imagenChula = datos.sprites.other['official-artwork'].front_default;

        // Y por último, le digo a la etiqueta de imagen de mi HTML que su fuente (src) sea esa dirección de imagen que he encontrado.
        imgPokemon.src = imagenChula;

        // También le pongo el nombre del pokemon en el texto alternativo por si acaso.
        imgPokemon.alt = "Imagen de " + datos.name;

    } catch (error) {
        // Si algo falla en el proceso, me lo chiva por la consola.
        console.error("¡Ups! No he podido atrapar ese Pokemon:", error);
    }
};

// Llamo a la función nada más empezar para que aparezca el Pokemon.
obtenerPokemonAleatorio();
