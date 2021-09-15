//Array of Objects that keeps track of all live game
const games = []

/**
 * Creates a new property in Room OBJ with the host as a key
 * @param {Object} payload
 * @param {string} payload.host
 * @param {number} payload.guessingTime
 * @param {string} payload.difficulty
 * @param {Object} payload.playList
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
 * @returns {number}
 */
const getGameIndex = (host) => games.findIndex((game) => game.host == host)

/**
 * Deletes the room from rooms list at the end of the game
 * or if everyone leaves
 * @param {String} host
 */
const deleteGame = (host) => {
    const index = getGameIndex(host)
    games.splice(index, 1)
}

/**
 * Ticks the currentSongTime property
 * @param {string} host
 */
const incrementSongTime = (host) => {
    let index = getGameIndex(host)
    games[index].currentSongTime++
}

/**
 * Compares user answer to the song title playing
 * @param {Object} payload
 * @param {string} payload.host
 * @param {string} payload.answer
 * @returns {boolean}
 */
const isCorrect = ({ host, answer }) => {
    const game = games[getGameIndex(host)]
    return game.playList[game.currentSongNum].animeTitle.toLowerCase() ===
        answer.toLowerCase()
        ? true
        : false
}

// createGame({
//     host: 'lulu',
//     guessingTime: 30,
//     difficulty: 'easy',
//     playList: [{ animeTitle: 'Boku No Hero' }],
// })
// console.log(getGameIndex('lulu'))
// console.log(isCorrect({ host: 'lulu', answer: 'Boku No Hero' }))
// console.log(incrementSongTime('lulu'))
// console.log(games[getGameIndex('lulu')])

module.exports = {
    games,
    createGame,
    deleteGame,
    getGameIndex,
    incrementSongTime,
    isCorrect,
}
