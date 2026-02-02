// Utiliza el array para crear dinamicamente una lista ul > li de elementos en el div de html con el atributo data-function="printHere".
const places = ["Gondor", "Mordor", "Rivendel", "La Comarca", "Nümenor"];

// Buscamos la cajita (div) donde nos han pedido que escribamos la lista
const divPrintHere = document.querySelector('[data-function="printHere"]');

// Creamos una nueva lista desordenada (ul)
const listaLugares = document.createElement('ul');

// Recorremos la lista de lugares mágicos uno por uno
places.forEach(lugar => {
    // Para cada lugar, creamos un elemento de lista (li)
    const li = document.createElement('li');
    // Escribimos el nombre del lugar dentro del elemento
    li.textContent = lugar;
    // Añadimos ese lugar a nuestra lista grande
    listaLugares.appendChild(li);
});

// Metemos la lista completa dentro de la cajita que buscamos al principio
divPrintHere.appendChild(listaLugares);
