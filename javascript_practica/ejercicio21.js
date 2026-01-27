// --- Ejercicio 21 ---

const users = [{ name: "Tony", years: 43 }, { name: "Peter", years: 18 }, { name: "Natasha", years: 14 }, { name: "Bruce", years: 32 }, { name: "Khamala", years: 16 }];

// Usa un bucle y dos condiciones para imprimir usuarios menores y mayores de edad.

// Recorro la lista de usuarios.
for (const user of users) {
    // Si tiene menos de 18 años...
    if (user.years < 18) {
        // ...es menor de edad.
        console.log("Usuario menor de edad: " + user.name);
    }
    // Si tiene 18 o más (mayor o igual)...
    else if (user.years >= 18) {
        // ...es mayor de edad.
        console.log("Usuario mayor de edad: " + user.name);
    }
}
