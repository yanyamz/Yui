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

const server = http.createServer(app)
const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:8080',
		methods: ['GET', 'POST'],
		allowedHeaders: ['my-custom-header'],
		credentials: true,
	},
})

const port = process.env.PORT || 3000

io.on('connection', (socket) => {
	socket.on('createGame', ({ host, guessingTime, difficulty, playList }) => {
		console.log('createGame')
		deleteGame(host)
		createGame({ host, guessingTime, difficulty, playList })

		console.log(games[getGameIndex(host)])

		setTimeout(() => {
			const tick = setInterval(() => {
				// Clears the interval once the room is deleted or the game is over
				if (getGameIndex(host) === -1 || gameOver(host)) {
					clearInterval(tick)
				}
				try {
					let game = games[getGameIndex(host)]
					if (game == undefined) {
						clearInterval(tick)
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
				}
			}, 1000)
		}, 4000)
	})
	socket.on('checkAnswer', ({ host, user, answer }) => {
		const game = games[getGameIndex(host)]
		if (isCorrect(answer)) {
			game.users[user].points++
			game.users[user].isCorrect = true
		} else {
			game.users[user].isWrong = true
		}
		setTimeout(() => {
			game.users[user].isCorrect = false
			game.users[user].isWrong = false
		}, 4000)
	})
	socket.on('startGame', ({ host, user }) => {
		console.log('startGame')
		addUserObjectToGame({ host, user })
		socket.join(host)
	})
	socket.on('leaving', (host) => {
		console.log('disconnect')
		socket.leave(host)
	})
	socket.on('deleteGame', (host) => {
		console.log('deleteGame')
		deleteGame(host)
		console.log(games)
	})
})

server.listen(port, () => {
	console.log(`Server is up on port http://localhost:${port}`)
})
