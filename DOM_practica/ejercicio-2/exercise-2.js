// 1.1 Inserta dinamicamente en un html un div vacio con javascript.

// Creamos una cajita vacía nueva (un div) que antes no existía
const nuevoDiv = document.createElement('div');
// Ponemos la cajita nueva dentro del cuerpo de la página para que se vea
document.body.appendChild(nuevoDiv);

// 1.2 Inserta dinamicamente en un html un div que contenga una p con javascript.

// Creamos otra cajita nueva (un div)
const divConP = document.createElement('div');
// Creamos un texto pequeño (un párrafo p)
const parrafo = document.createElement('p');
// Metemos el texto dentro de la cajita nueva
divConP.appendChild(parrafo);
// Y ahora ponemos la cajita con su texto dentro de la página
document.body.appendChild(divConP);

// 1.3 Inserta dinamicamente en un html un div que contenga 6 p utilizando un loop con javascript.

// Creamos una cajita grande (un div) para guardar muchos textos
const divLoop = document.createElement('div');
// Vamos a hacer una cosa 6 veces seguidas, contando del 0 al 5
for (let i = 0; i < 6; i++) {
    // Cada vez creamos un texto nuevo (un párrafo)
    const p = document.createElement('p');
    // Metemos ese texto en la cajita grande
    divLoop.appendChild(p);
}
// Al final, ponemos la cajita llena de textos en la página
document.body.appendChild(divLoop);

// 1.4 Inserta dinamicamente con javascript en un html una p con el texto 'Soy dinámico!'.

// Creamos un texto nuevo (un párrafo p)
const pDinamico = document.createElement('p');
// Le escribimos dentro las palabras mágicas "Soy dinámico!"
pDinamico.textContent = 'Soy dinámico!';
// Pegamos este texto en la página
document.body.appendChild(pDinamico);

// 1.5 Inserta en el h2 con la clase .fn-insert-here el texto 'Wubba Lubba dub dub'.

// Buscamos el título h2 que tiene la marca especial "fn-insert-here"
const h2Titulo = document.querySelector('.fn-insert-here');
// Le cambiamos lo que tiene escrito por la frase de Rick "Wubba Lubba dub dub"
h2Titulo.textContent = 'Wubba Lubba dub dub';

// 1.6 Basandote en el siguiente array crea una lista ul > li con los textos del array.
const apps = ['Facebook', 'Netflix', 'Instagram', 'Snapchat', 'Twitter'];

// Creamos una lista desordenada (ul) donde pondremos las aplicaciones
const listaUl = document.createElement('ul');
// Recorremos cada nombre de aplicación que hay en nuestra lista de apps
apps.forEach(app => {
    // Por cada app, creamos un elemento de lista (li)
    const li = document.createElement('li');
    // Escribimos el nombre de la app dentro del elemento de lista
    li.textContent = app;
    // Añadimos el elemento a la lista grande
    listaUl.appendChild(li);
});
// Ponemos la lista completa en la página
document.body.appendChild(listaUl);

// 1.7 Elimina todos los nodos que tengan la clase .fn-remove-me

// Buscamos todas las cosas que tienen la marca "fn-remove-me" para borrarlas
const elementosABorrar = document.querySelectorAll('.fn-remove-me');
// Vamos uno por uno por todos los elementos que encontramos
elementosABorrar.forEach(elemento => {
    // Y le decimos a cada uno que se quite de la página, ¡puf, fuera!
    elemento.remove();
});

// 1.8 Inserta una p con el texto 'Voy en medio!' entre los dos div. Recuerda que no solo puedes insertar elementos con .appendChild.

// Buscamos todos los divs que hay en la página
const todosLosDivs = document.querySelectorAll('div');
// Creamos el párrafo con el texto "Voy en medio!"
const pEnMedio = document.createElement('p');
pEnMedio.textContent = 'Voy en medio!';
// Insertamos el párrafo antes del segundo div que encontramos (que está en la posición 1)
document.body.insertBefore(pEnMedio, todosLosDivs[1]);

// 1.9 Inserta p con el texto 'Voy dentro!', dentro de todos los div con la clase .fn-insert-here

// Buscamos todos los divs que tienen la clase "fn-insert-here"
const divsInsertHere = document.querySelectorAll('div.fn-insert-here');
// Recorremos cada uno de esos divs
divsInsertHere.forEach(div => {
    // Creamos un nuevo párrafo con el texto "Voy dentro!" para cada div
    const pDentro = document.createElement('p');
    pDentro.textContent = 'Voy dentro!';
    // Metemos el párrafo dentro del div
    div.appendChild(pDentro);
});
