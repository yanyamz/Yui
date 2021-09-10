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
}
