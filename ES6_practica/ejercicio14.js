/* --- EJERCICIO 14 --- */

// Crea una función llamada rollDice() que reciba como parametro el numero de caras 
// que queramos que tenga el dado que deberá simular el codigo dentro de la función. 
// Como hemos dicho, que la función use el parametro para simular una tirada de dado 
// y retornar el resultado. Si no se te ocurre como hacer un numero aleatorio no te 
// preocupes! Busca información sobre la función de javascript Math.random()

// Defino la función 'rollDice' que acepta el número de caras 'numFaces'.
const rollDice = (numFaces) => {
    // Genero un número aleatorio decimal entre 0 y 1.
    // Lo multiplico por 'numFaces'.
    // Uso Math.floor para quitarle los decimales (redondear abajo).
    // Le sumo 1 porque si no, me daría un número del 0 al (caras-1), y yo quiero del 1 al caras.
    const result = Math.floor(Math.random() * numFaces) + 1;

    // Devuelvo el resultado del dado.
    return result;
};

// Tiro un dado de 6 caras.
console.log('Ejercicio 14 - Dado 6 caras:', rollDice(6));

// Tiro un dado de 20 caras (rolero).
console.log('Ejercicio 14 - Dado 20 caras:', rollDice(20));

// Tiro un dado de 100 caras.
console.log('Ejercicio 14 - Dado 100 caras:', rollDice(100));
