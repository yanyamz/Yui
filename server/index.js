const http = require('http')

const express = require('express')
const cors = require('cors')

const {
    games,
    createGame,
    deleteGame,
    getGameIndex,
    incrementSongTime,
    isCorrect,
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
        deleteGame(host)
        createGame({ host, guessingTime, difficulty, playList })
        console.log(games[getGameIndex(host)])
    })
})

server.listen(port, () => {
    console.log(`Server is up on port http://localhost:${port}`)
})
