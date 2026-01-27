// --- Ejercicio 22 ---

const fruits = ["Strawberry", "Banana", "Orange", "Apple"];
const foodSchedule = [{ name: "Heura", isVegan: true }, { name: "Salmon", isVegan: false }, { name: "Tofu", isVegan: true }, { name: "Burger", isVegan: false }, { name: "Rice", isVegan: true }, { name: "Pasta", isVegan: true }];

// Usa un for para remplazar todas las comidas que no sean veganas con las frutas del array de frutas.

// Necesito saber qué fruta toca usar, así que empiezo por la primera con un contador.
let fruitCounter = 0;

// Recorro la agenda de comidas.
for (let i = 0; i < foodSchedule.length; i++) {
    // Si la comida NO es vegana (! significa NO)...
    if (!foodSchedule[i].isVegan) {
        // ...cambio el nombre de la comida por la fruta que toque.
        foodSchedule[i].name = fruits[fruitCounter];
        // Y además digo que ahora sí es vegana (porque es una fruta).
        foodSchedule[i].isVegan = true;

        // Preparo el contador para la siguiente fruta.
        fruitCounter++;
    }
}

// Muestro cómo ha quedado la lista.
console.log(foodSchedule);
