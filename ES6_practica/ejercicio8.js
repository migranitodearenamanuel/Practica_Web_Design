/* --- EJERCICIO 8: Bonus --- */

// 8.1 Dado el siguiente javascript filtra los videojuegos por gender = 'RPG' usando 
// .filter() y usa .reduce() para conseguir la media de sus .score. 
// La función .find() también podría ayudarte para el contrar el genero 'RPG' en el 
// array .gender.
const videogames = [
    { name: 'Final Fantasy VII', genders: ['RPG'], score: 9.5 },
    { name: 'Assasins Creed Valhala', genders: ['Aventura', 'RPG'], score: 4.5 },
    { name: 'The last of Us 2', genders: ['Acción', 'Aventura'], score: 9.8 },
    { name: 'Super Mario Bros', genders: ['Plataforma'], score: 8.5 },
    { name: 'Genshin Impact', genders: ['RPG', 'Aventura'], score: 7.5 },
    { name: 'Legend of Zelda: Breath of the wild', genders: ['RPG'], score: 10 },
];

// Primero busco los juegos que sean RPG.
const rpgGames = videogames.filter(game => {
    // Miro dentro de la lista de géneros si está 'RPG'.
    return game.genders.includes('RPG');
});

// Ahora sumo las puntuaciones de esos juegos RPG.
const totalScoreRPG = rpgGames.reduce((acc, game) => acc + game.score, 0);

// Calculo la media dividiendo la suma por la cantidad de juegos RPG.
const averageRPG = totalScoreRPG / rpgGames.length;

// Muestro la media de los RPG.
console.log('Ejercicio 8.1 - Media RPG:', averageRPG);
