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
		endPhase: playList.length * 2 - 1,
		playList,
		isCorrect: false,
		isWrong: false,
		answers: [],
		users: {},
	})
}

/**
 * Gets the Object with the appropiate game data
 * @param {string} host
 * @returns {number}
 */
const getGameIndex = (host) => games.findIndex((game) => game.host == host)

/**
 *
 * @param {string} host
 * @returns {string} phase
 */
const getPhase = (host) => {
	const phase = games[getGameIndex(host)].phase
	if (phase % 2 == 0) {
		return 'guessing'
	}
	return 'results'
}

/**
 * Adds user object with multiple property
 * @param {Object} payload
 * @param {string} payload.host
 * @param {string} payload.user
 */
const addUserObjectToGame = ({ host, user }) => {
	games[getGameIndex(host)].users[user] = {
		answer: '',
		isCorrect: false,
		isWrong: false,
		points: 0,
	}
}

/**
 * Gives the user a point if they had the correct answer
 * @param {object} payload
 * @param {string} payload.host
 * @param {string} payload.user
 */
const giveUserPoint = ({ host, user }) => {
	games[getGameIndex(host)].leaderboard[user]++
}

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
 * Targets the next song on the playlist object
 * @param {string} host
 */
const getNextSong = (host) => {
	games[getGameIndex(host)].currentSongNum++
}

/**
 * Increments phase when the guessingTime = currentTime
 * @param {string} host
 */
const incrementPhase = (host) => {
	let index = getGameIndex(host)
	games[index].phase++
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

/**
 *
 * @param {string} host
 */
const resetCurrentSongTime = (host) => {
	games[getGameIndex(host)].currentSongTime = 0
}

/**
 * Checks whether the last phase has been reached
 * @param {string} host
 * @returns {boolean}
 */
const gameOver = (host) => {
	const game = games[getGameIndex(host)]
	return game.endPhase === game.phase ? true : false
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
	gameOver,
	getGameIndex,
	incrementSongTime,
	isCorrect,
	incrementPhase,
	getNextSong,
	resetCurrentSongTime,
	giveUserPoint,
	getPhase,
	addUserObjectToGame,
}
