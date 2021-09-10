export default {
    namespaced: true,
    state: {
        rooms: [{ name: 'room1', host: 'lulu', difficulty: 'easy' }],
    },
    getters: {
        rooms(state) {
            return state.rooms
        },
    },
    actions: {
        async createRoom(context, { name, difficulty, host }) {
            context.state.rooms.push({ name, difficulty, host })
        },
    },
}
