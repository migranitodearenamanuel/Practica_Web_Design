// 1.1 Basandote en el array siguiente, crea una lista ul > li dinámicamente en el html que imprima cada uno de los paises.
const countries = ['Japón', 'Nicaragua', 'Suiza', 'Australia', 'Venezuela'];

// Creamos la lista donde vamos a poner los países
const listaPaises = document.createElement('ul');
// Vamos uno por uno por los nombres de los países del grupo
countries.forEach(pais => {
    // Para cada país, creamos un puntito de la lista (li)
    const li = document.createElement('li');
    // Escribimos el nombre del país dentro
    li.textContent = pais;
    // Ponemos el puntito en la lista
    listaPaises.appendChild(li);
});
// Ponemos la lista completa en la página web
document.body.appendChild(listaPaises);

// 1.2 Elimina el elemento que tenga la clase .fn-remove-me.

// Buscamos el elemento que tiene la marca para borrarse con la clase "fn-remove-me"
const elementoBorrar = document.querySelector('.fn-remove-me');
// Si lo encontramos, lo borramos de la página. ¡Adiós!
if (elementoBorrar) {
    elementoBorrar.remove();
}

// 1.3 Utiliza el array para crear dinamicamente una lista ul > li de elementos en el div de html con el atributo data-function="printHere".
const cars = ['Mazda 6', 'Ford fiesta', 'Audi A4', 'Toyota corola'];

// Buscamos la cajita (div) específica donde nos dijeron que imprimiéramos cosas
const divPrintHere = document.querySelector('[data-function="printHere"]');
// Creamos una nueva lista para los coches
const listaCoches = document.createElement('ul');
// Recorremos la lista de nombres de coches
cars.forEach(coche => {
    // Creamos un elemento de lista por cada coche
    const li = document.createElement('li');
    // Escribimos el modelo del coche dentro
    li.textContent = coche;
    // Añadimos el coche a la lista
    listaCoches.appendChild(li);
});
// Metemos la lista de coches dentro de la cajita especial que buscamos antes
divPrintHere.appendChild(listaCoches);

// 1.4 Crea dinamicamente en el html una serie de divs que contenga un elemento h4 para el titulo y otro elemento img para la imagen.
const countries2 = [
    { title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=1' },
    { title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=2' },
    { title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=3' },
    { title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=4' },
    { title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=5' }
];

// Vamos a recorrer la lista de países con fotos (countries2)
countries2.forEach(country => {
    // Creamos una cajita (div) para cada uno
    const div = document.createElement('div');
    // Le ponemos una clase para poder encontrarlos luego fácilmente (esto ayuda en el 1.5)
    div.className = 'country-item';

    // Creamos el título h4
    const h4 = document.createElement('h4');
    h4.textContent = country.title;

    // Creamos la imagen img
    const img = document.createElement('img');
    img.src = country.imgUrl;

    // Metemos el título y la imagen dentro de la cajita del país
    div.appendChild(h4);
    div.appendChild(img);

    // Y finalmente ponemos la cajita en la página
    document.body.appendChild(div);
});

// 1.5 Basandote en el ejercicio anterior. Crea un botón que elimine el último elemento de la serie de divs.

// Creamos un botón nuevo
const botonEliminarUltimo = document.createElement('button');
// Le ponemos texto al botón para saber qué hace
botonEliminarUltimo.textContent = 'Eliminar el último';
// Cuando hagamos clic en el botón, pasará algo especial
botonEliminarUltimo.addEventListener('click', () => {
    // Buscamos todas las cajitas de países que creamos antes
    const todosLosDivsPaises = document.querySelectorAll('.country-item');
    // Si hay alguna cajita en la lista...
    if (todosLosDivsPaises.length > 0) {
        // ...cogemos la última de la lista (la longitud - 1) y la borramos
        todosLosDivsPaises[todosLosDivsPaises.length - 1].remove();
    }
});
// Ponemos el botón en la página
document.body.appendChild(botonEliminarUltimo);

// 1.6 Basandote en el ejercicio anterior. Crea un botón para cada uno de los divs que elimine ese mismo elemento del html.

// Volvemos a buscar todas las cajitas de países que creamos
const todosLosDivsPaises2 = document.querySelectorAll('.country-item');

// Vamos una por una por todas las cajitas
todosLosDivsPaises2.forEach(div => {
    // Creamos un botón pequeño para borrar ESTA cajita
    const botonBorrarEste = document.createElement('button');
    botonBorrarEste.textContent = 'Borrarme';

    // Le decimos que cuando le hagan clic...
    botonBorrarEste.addEventListener('click', () => {
        // ...se borre la cajita donde está este botón
        div.remove();
    });

    // Metemos el botón dentro de la cajita del país
    div.appendChild(botonBorrarEste);
});
