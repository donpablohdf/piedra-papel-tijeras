import axios from 'axios';
const choices = ['piedra', 'papel', 'tijeras'];

/**
 * Retorna una elección aleatoria para el cliente de la lista de opciones válidas
 */
export async function getComputerChoice() {
    try {
        const response = await axios.post('http://localhost:3001/play');
        const computerChoice = response.data.computerChoice;
        return computerChoice;
    } catch (error) {
        console.error(error);
    }
}

export function getPlayerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

export async function storeScoreAPI(dataHistory) {
    try {
        const response = await axios.post('http://localhost:3001/history', dataHistory);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


/**
 * Retorna el resultado del juego dado la elección del jugador y del ordenador.
 * @param {string} playerChoice - Elección del jugador.
 * @param {string} computerChoice - Elección del ordenador.
 */
export function getGameResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'empate';
    } else if (
        (playerChoice === 'piedra' && computerChoice === 'tijeras') ||
        (playerChoice === 'papel' && computerChoice === 'piedra') ||
        (playerChoice === 'tijeras' && computerChoice === 'papel')
    ) {
        return 'ganas';
    } else {
        return 'pierdes';
    }
}
