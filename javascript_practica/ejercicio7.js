// --- Ejercicio 7 ---

function sum(numberOne, numberTwo) {
    // Me preguntan por el número más alto.
    // Si el número uno es mayor que el número dos...
    if (numberOne > numberTwo) {
        // ...entonces devuelvo el número uno.
        return numberOne;
    } else {
        // Si no (el número dos es mayor o igual), devuelvo el número dos.
        return numberTwo;
    }
}

// NOTA: Aunque la función se llama 'sum' (suma), este ejercicio habitualmente pide devolver el número más alto.
// He implementado la lógica del máximo. Si se requiriera sumar estricta, sería: return numberOne + numberTwo;
