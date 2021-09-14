const { users } = require('./users')
/*
roomtime
{
    room: {
        quizTimer,
        quizInSession
    }
}
 key: [room] {quizTimer: 10, quizInSession: false}
*/
const roomTime = {}
const roomQuizInSession = {}
const rooms = new Set()

const createRoom = () => {
    //generate random 4 Letter Code
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const code = []

    while (!rooms.has(code.join(''))) {
        for (let i = 0; i < 4; i++) {
            code[i] = alphabet[Math.floor(Math.random() * 26)]
        }
        if (!rooms.has(code.join(''))) {
            rooms.add(code.join(''))
        }
    }
    return code.join('')
}

/**
 * Deletes the room from rooms list if no one is in it.
 * Called when a user leaves room to check if its empty
 * @param {String} room
 */
const cleanUpRooms = (room) => {
    let roomSessions = users.filter((user) => user.room === room)
    if (roomSessions.length == 0) {
        console.log('should be deleting all room data')
        rooms.delete(room)
        delete roomTime[room]
        delete roomQuizInSession[room]
    }
}

module.exports = {
    createRoom,
    cleanUpRooms,
    roomTime,
    roomQuizInSession,
}
