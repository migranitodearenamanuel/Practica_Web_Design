// 1.1 Añade un botón a tu html con el id btnToClick y en tu javascript añade el evento click que ejecute un console log con la información del evento del click

// Primero creamos un botón nuevo usando código
const nuevoBoton = document.createElement('button');
// Le ponemos el carnet de identidad (id) que nos han pedido
nuevoBoton.id = 'btnToClick';
// Le ponemos un texto para poder verlo y hacer clic
nuevoBoton.textContent = 'haz clic aquí';
// Añadimos el botón a la página
document.body.appendChild(nuevoBoton);

// Ahora le ponemos una oreja al botón para escuchar cuando alguien le hace "clic"
nuevoBoton.addEventListener('click', (evento) => {
    // Cuando hacen clic, mostramos toda la información de ese "toque" en la consola
    console.log(evento);
});

// 1.2 Añade un evento 'focus' que ejecute un console.log con el valor del input.

// Buscamos la cajita de escribir (input) que tiene la clase "focus"
const inputFocus = document.querySelector('.focus');
// Le ponemos una oreja para escuchar cuando entramos dentro de la cajita (focus)
inputFocus.addEventListener('focus', (evento) => {
    // Escribimos en la consola lo que hay escrito en la cajita
    console.log(evento.target.value);
});

// 1.3 Añade un evento 'input' que ejecute un console.log con el valor del input.

// Buscamos la cajita de escribir que tiene la clase "value"
const inputValue = document.querySelector('.value');
// Le ponemos una oreja para escuchar cada vez que escribimos una letra nueva (input)
inputValue.addEventListener('input', (evento) => {
    // Mostramos en la consola lo que se va escribiendo en tiempo real
    console.log(evento.target.value);
});
