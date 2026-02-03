/* --- EJERCICIO 1: Game of Thrones API --- */

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
    <select id="character-list"></select>
    <div>
        <img class="character-image">
    </div>
</body>
</html>
*/

/* ENUNCIADO E INSTRUCCIONES (index.js):
   1. Accederemos a los datos de una API pública de Game Of Thrones, queremos un select con todos los nombres de los personajes para que cuando un usuario seleccione un nombre salga su imagen en el medio de la página.
   
   2. Obtener los datos: Para obtener los datos con los que jugar necesitaremos estudiar la documentación de la API y buscar la url necesaria para los datos que queramos, para este paso os pedimos que de verdad os esforcéis buscándola en la documentación, queremos la url que me traiga los datos de todos los personajes de GOT.
   URL de la documentación (para que indaguéis): https://thronesapi.com/
   
   3. URL de los personajes de GOT: Esta sería la URL final (la que deberéis utilizar para vuestra petición):
   https://thronesapi.com/api/v2/Characters
*/

// ESCRIBE TU CÓDIGO A CONTINUACIÓN:

// Primero, voy a buscar en mi página web el elemento 'select' donde pondré la lista de nombres y lo guardo en una cajita (variable) llamada 'selectCharacters'.
const selectCharacters = document.querySelector("#character-list");

// También busco el elemento 'img' donde mostraré la foto del personaje y lo guardo en otra cajita llamada 'imgCharacter'.
const imgCharacter = document.querySelector(".character-image");

// Ahora creo una función especial (asíncrona) porque va a tardar un poquito en traer los datos de internet. La llamo 'pedirPersonajes'.
const pedirPersonajes = async () => {
    // Aquí pongo un bloque 'try-catch' que es como un "intenta hacer esto, y si sale mal, avísame", para que no se rompa todo si falla internet.
    try {
        // Le digo al ordenador: "Espera (await) a que traiga la información de esta dirección de internet" y guardo la respuesta en 'respuesta'.
        const respuesta = await fetch("https://thronesapi.com/api/v2/Characters");
        
        // La respuesta viene en un formato raro, así que le digo: "Espera a convertir esa respuesta en datos JSON que yo pueda entender" y los guardo en 'personajes'.
        const personajes = await respuesta.json();

        // Ahora voy a recorrer la lista de personajes uno por uno para hacer algo con cada uno de ellos.
        // 'personaje' será la cajita temporal donde guardo la información de cada uno mientras doy la vuelta.
        for (const personaje of personajes) {
            // Creo un nuevo elemento 'option' (una opción del menú) en la memoria del ordenador.
            const option = document.createElement("option");
            
            // Le pongo al texto de la opción el nombre completo del personaje.
            option.textContent = personaje.fullName;
            
            // En el valor oculto de la opción, guardo la dirección de internet de su foto, para usarla luego.
            option.value = personaje.imageUrl;
            
            // Finalmente, meto esta opción dentro de mi menú desplegable (el select que guardé al principio).
            selectCharacters.appendChild(option);
        }

    } catch (error) {
        // Si algo salió mal en el intento (try), entra aquí y me muestra el error en la consola para saber qué pasó.
        console.error("¡Vaya! Hubo un error al traer los personajes:", error);
    }
};

// Llamo a mi función para que empiece a trabajar y traiga los personajes en cuanto se cargue el archivo.
pedirPersonajes();

// Ahora voy a estar atento a cuando cambies la opción del menú.
// Le digo al menú: "Escucha (addEventListener) si hay un cambio ('change')".
selectCharacters.addEventListener("change", (evento) => {
    // Cuando cambie, cojo el valor de la opción seleccionada (que era la URL de la imagen que guardé antes) y se la pongo a la imagen de mi página.
    imgCharacter.src = evento.target.value;
    
    // También voy a ponerle un texto alternativo a la imagen por si no carga, usando el texto de la opción seleccionada.
    // 'evento.target.options[evento.target.selectedIndex].text' es la forma larga de decir "dame el texto de lo que has elegido".
    imgCharacter.alt = "Foto de " + evento.target.options[evento.target.selectedIndex].text;
});
