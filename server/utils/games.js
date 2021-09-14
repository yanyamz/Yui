let games = []

/**
 * Creates a new property in Room OBJ with the host as a key
 * @param {object} param0
 */
const createGame = ({ host, guessingTime, difficulty, playList }) => {
    games.push({
        host,
        guessingTime,
        difficulty,
        currentSongNum: 0,
        currentSongTime: 0,
        phase: 0,
        playList,
    })
}

/**
 * Gets the Object with the appropiate game data
 * @param {string} host
 * @returns game object inside games
 */
const getGame = (host) => games.filter((game) => game.host == host)[0]

/**
 * Deletes the room from rooms list at the end of the game
 * or if everyone leaves
 * @param {String} host
 */
const deleteGame = (host) => {
    games = games.filter((game) => game.host != host)
}

/**
 * Compares user answer to the song title playing
 * @param {object} param0
 * @returns {boolean}
 */
const isCorrect = ({ host, answer }) => {
    const game = getGame(host)
    return game.playList[game.currentSongNum].animeTitle.toLowerCase() ===
        answer.toLowerCase()
        ? true
        : false
}

createGame({
    host: 'lulu',
    guessingTime: 30,
    difficulty: 'easy',
    playList: [{ animeTitle: 'Boku No Hero' }],
})

// console.log(getGame('lulu'))
// console.log(isCorrect({ host: 'lulu', answer: 'Boku No Hero' }))

module.exports = {
    createGame,
    deleteGame,
    getGame,
    isCorrect,
}
