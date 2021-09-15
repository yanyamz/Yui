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
				let game = games[getGameIndex(host)]
				// if (gameOver(host)) clearInterval(tick)
				if (game.guessingTime <= game.currentSongTime) {
					clearInterval(tick)
				}
				// Update the client by sending the whole game object each second
				io.to(host).emit('updateGame', game)
				incrementSongTime(host)
			}, 1000)
		}, 4000)
	})
	socket.on('startGame', (host) => {
		console.log('startGame')
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
