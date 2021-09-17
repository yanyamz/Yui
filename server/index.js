const http = require('http')

const express = require('express')
const cors = require('cors')

const {
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
} = require('./utils/games.js')

const app = express()
app.use(cors())

// enable CORS without external module
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

const server = http.createServer(app)
const io = require('socket.io')

const port = process.env.PORT || 3000

io.on('connection', (socket) => {
	socket.on('createGame', ({ host, guessingTime, difficulty, playList }) => {
		// console.log('createGame')
		deleteGame(host)
		createGame({ host, guessingTime, difficulty, playList })

		setTimeout(() => {
			const tick = setInterval(() => {
				// Clears the interval once the room is deleted or the game is over
				if (getGameIndex(host) === -1 || gameOver(host)) {
					clearInterval(tick)
					io.to(host).emit('sendToRooms')
					deleteGame(host)
					return
				}
				try {
					let game = games[getGameIndex(host)]
					if (game == undefined) {
						clearInterval(tick)
						io.to(host).emit('sendToRooms')
						deleteGame(host)
						return
					}
					// When timer finishes => Progress to next phase
					if (game.guessingTime <= game.currentSongTime) {
						incrementPhase(host)
						if (getPhase(host) === 'results') {
						} else {
							getNextSong(host)
						}
						resetCurrentSongTime(host)
					}
					// Update the client by sending the whole game object each second
					io.to(host).emit('updateGame', game)
					incrementSongTime(host)
				} catch (err) {
					clearInterval(tick)
					io.to(host).emit('sendToRooms')
					deleteGame(host)
					return
				}
			}, 1000)
		}, 4000)
	})
	socket.on('checkAnswer', ({ host, user, answer }) => {
		try {
			if (isCorrect({ host, answer })) {
				games[getGameIndex(host)].users[user].points++
				games[getGameIndex(host)].users[user].isCorrect = true
			} else {
				games[getGameIndex(host)].users[user].isWrong = true
			}
			setTimeout(() => {
				try {
					games[getGameIndex(host)].users[user].isCorrect = false
					games[getGameIndex(host)].users[user].isWrong = false
				} catch (e) {
					return
				}
			}, games[getGameIndex(host)].guessingTime * 1000)
		} catch (e) {
			console.log(e)
		}
	})
	socket.on('startGame', ({ host, user }) => {
		// If game didnt properly delete, delete it now before starting a new game
		if (getGameIndex(host) == -1) {
			deleteGame(host)
			return
		}
		try {
			addUserObjectToGame({ host, user })
			socket.join(host)
		} catch (error) {
			console.log(error)
		}
	})
	socket.on('leaving', (host) => {
		// console.log('disconnect')
		socket.leave(host)
	})
	socket.on('deleteGame', (host) => {
		// console.log('deleteGame')
		deleteGame(host)
		// console.log(games)
	})
})

server.listen(port, () => {
	console.log(`Server is up on port http://localhost:${port}`)
})
