// Elimina el elemento que tenga la clase .fn-remove-me.

// Buscamos en la página el elemento que tiene la etiqueta "fn-remove-me"
const elementoParaBorrar = document.querySelector('.fn-remove-me');

// Comprobamos si hemos encontrado algo (por si acaso no existe)
if (elementoParaBorrar) {
    // Si existe, lo borramos de la página. ¡Zas, desaparecido!
    elementoParaBorrar.remove();
}
