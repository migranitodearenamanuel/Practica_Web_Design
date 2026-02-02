// 1.1 Usa querySelector para mostrar por consola el botón con la clase .showme

// Buscamos el botón que tiene la clase "showme" para poder jugar con él
const botonShowMe = document.querySelector('.showme');
// Mostramos el botón en la cajita de mensajes del ordenador
console.log(botonShowMe);

// 1.2 Usa querySelector para mostrar por consola el h1 con el id #pillado

// Buscamos el título grande que tiene el nombre secreto "pillado"
const tituloPillado = document.querySelector('#pillado');
// Enseñamos ese título en la pantalla de mensajes
console.log(tituloPillado);

// 1.3 Usa querySelector para mostrar por consola todos los p

// Buscamos todos los párrafos de texto que hay en la página
const todosLosParrafos = document.querySelectorAll('p');
// Los mostramos todos juntos en la cajita de mensajes
console.log(todosLosParrafos);

// 1.4 Usa querySelector para mostrar por consola todos los elementos con la clase.pokemon

// Buscamos a todos los pokémon que tienen la etiqueta de grupo "pokemon"
const todosLosPokemon = document.querySelectorAll('.pokemon');
// Enseñamos la lista de todos los pokémon encontrados
console.log(todosLosPokemon);

// 1.5 Usa querySelector para mostrar por consola todos los elementos con el atributo data-function="testMe".

// Buscamos a los superhéroes y personajes que tienen un poder especial llamado "testMe"
const personajesTest = document.querySelectorAll('[data-function="testMe"]');
// Mostramos a todo el equipo de personajes en la consola
console.log(personajesTest);

// 1.6 Usa querySelector para mostrar por consola el 3 personaje con el atributo data-function="testMe".

// Del grupo de personajes especiales que encontramos antes, elegimos al número 3 (que es Rick)
const tercerPersonaje = personajesTest[2];
// Lo mostramos solito en la pantalla de mensajes, ¡aquí está!
console.log(tercerPersonaje);
