/* --- EJERCICIO 7: Reduce --- */

// 7.1 Dado el siguiente array, haz una suma de todos las notas de los examenes de 
// los alumnos usando la función .reduce().
const exams = [
    { name: 'Yuyu Cabeza Crack', score: 5 },
    { name: 'Maria Aranda Jimenez', score: 1 },
    { name: 'Cristóbal Martínez Lorenzo', score: 6 },
    { name: 'Mercedez Regrera Brito', score: 7 },
    { name: 'Pamela Anderson', score: 3 },
    { name: 'Enrique Perez Lijó', score: 6 },
    { name: 'Pedro Benitez Pacheco', score: 8 },
    { name: 'Ayumi Hamasaki', score: 4 },
    { name: 'Robert Kiyosaki', score: 2 },
    { name: 'Keanu Reeves', score: 10 }
];

// Sumo todas las notas empezando desde 0.
const totalScore = exams.reduce((acumulado, examen) => acumulado + examen.score, 0);

// Muestro la suma total.
console.log('Ejercicio 7.1 - Suma Total:', totalScore);


// 7.2 Dado el mismo array, haz una suma de todos las notas de los examenes de los 
// alumnos que esten aprobados usando la función .reduce().

// Sumo las notas solo si el alumno ha aprobado (nota 5 o más).
const approvedScore = exams.reduce((acumulado, examen) => {
    // Si la nota es 5 o más...
    if (examen.score >= 5) {
        // ...la sumo a lo que llevo acumulado.
        return acumulado + examen.score;
    }
    // Si no, devuelvo lo que tenía sin sumar nada.
    return acumulado;
}, 0);

// Muestro la suma de los aprobados.
console.log('Ejercicio 7.2 - Suma Aprobados:', approvedScore);


// 7.3 Dado el mismo array, haz la media de las notas de todos los examenes .reduce().

// Calculo otra vez la suma total.
const totalScoreVideo = exams.reduce((acc, exam) => acc + exam.score, 0);

// Divido la suma total entre el número de exámenes para sacar la media.
const average = totalScoreVideo / exams.length;

// Muestro la nota media.
console.log('Ejercicio 7.3 - Media:', average);
