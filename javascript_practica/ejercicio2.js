// --- Ejercicio 2 ---

// 1.1 Dado el siguiente objeto, cambia el valor de la propiedad age a 25.
const character = { name: 'Jack Sparrow', age: 10 };

// Cojo el personaje y le cambio la edad, ahora tiene 25 años.
character.age = 25;

// 1.2 Declara 3 variables con los nombres y valores siguientes: firstName = 'Jon'; lastName = 'Snow'; age = 24;
// Muestralos por consola de esta forma: 'Soy Jon Snow, tengo 24 años y me gustan los lobos.'

// Creo una variable para el nombre y guardo 'Jon'.
let firstName = 'Jon';
// Creo una variable para el apellido y guardo 'Snow'.
let lastName = 'Snow';
// Creo una variable para la edad y guardo 24.
let age = 24;

// Muestro por pantalla la frase juntando las variables con el texto, usando comillas mágicas para hacerlo más fácil.
console.log(`Soy ${firstName} ${lastName}, tengo ${age} años y me gustan los lobos.`);

// 1.3 Dado el siguiente código, imprime con un console.log la suma del precio de ambos juguetes.
const toy1 = { name: 'Buss myYear', price: 19 };
const toy2 = { name: 'Rallo mcKing', price: 29 };

// Sumo el precio del primer juguete con el precio del segundo juguete y lo enseño por pantalla.
console.log(toy1.price + toy2.price);

// 1.4 Dado el siguiente código, actualiza el valor de la variable globalBasePrice a 25000 y actualiza la propiedad finalPrice de todos los coches con el valor de su propiedad basePrice más el valor de la variable globalBasePrice.
let globalBasePrice = 10000;
const car1 = { name: 'BMW m&m', basePrice: 50000, finalPrice: 60000 };
const car2 = { name: 'Chevrolet Corbina', basePrice: 70000, finalPrice: 80000 };

// Cambio el precio base de todo el mundo a 25000.
globalBasePrice = 25000;

// Calculo el nuevo precio final del coche 1 sumando su precio base y el nuevo precio base global.
car1.finalPrice = car1.basePrice + globalBasePrice;

// Calculo el nuevo precio final del coche 2 sumando su precio base y el nuevo precio base global.
car2.finalPrice = car2.basePrice + globalBasePrice;
