export default {
    namespaced: true,
    state: {
        rooms: [],
    },
    getters: {
        rooms(state) {
            return state.rooms
        },
    },
    actions: {
        async loadRooms(context) {
            let rooms = await context.dispatch(
                'firestore/loadCollection',
                'rooms',
                { root: true }
            )
            context.state.rooms = rooms.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        },
        async createRoom(context, { name, difficulty, host }) {
            context.state.rooms.push({ name, difficulty, host })
            await context.dispatch(
                'firestore/updateDocument',
                {
                    collection: 'rooms',
                    document: host,
                    newData: {
                        difficulty,
                        name,
                        host,
                    },
                },
                { root: true }
            )
        },
    },
}
