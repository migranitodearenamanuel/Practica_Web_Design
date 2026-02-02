// Basandote en el array siguiente, crea una lista ul > li dinámicamente en el html que imprima cada uno de los albums.
const albums = [
    "De Mysteriis Dom Sathanas",
    "Reign of Blood",
    "Ride the Lightning",
    "Painkiller",
    "Iron Fist",
];

// Creamos un contenedor de lista desordenada (ul) para poner los discos
const listaAlbums = document.createElement('ul');

// Vamos a revisar uno por uno cada nombre de los discos de la lista
albums.forEach(album => {
    // Para cada disco, creamos una línea de la lista (li)
    const li = document.createElement('li');
    // Escribimos el nombre del disco dentro de la línea
    li.textContent = album;
    // Metemos la línea con el nombre en el contenedor de la lista principal
    listaAlbums.appendChild(li);
});

// Finalmente, ponemos la lista completa en la página para que se vea
document.body.appendChild(listaAlbums);
