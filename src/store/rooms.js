import { firebase } from '../firebase/config'

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
        async deleteRoom(context, host) {
            await context.dispatch(
                'firestore/deleteDocument',
                {
                    collection: 'rooms',
                    document: host,
                },
                {
                    root: true,
                }
            )
        },
        async setRoomInSession(context, { host, newData = true }) {
            console.log('setRoomInSession')
            try {
                await context.dispatch(
                    'firestore/updateField',
                    {
                        collection: 'rooms',
                        document: host,
                        field: 'isInSession',
                        newData: newData,
                    },
                    { root: true }
                )
            } catch (err) {
                console.log('failed to set in session')
            }
        },
        async addUserToRoom(context, { user, host }) {
            console.log('addUserToRoom')
            await context.dispatch(
                'firestore/updateField',
                {
                    collection: 'rooms',
                    document: host,
                    field: 'users',
                    newData: firebase.firestore.FieldValue.arrayUnion({
                        avatar: user.avatar,
                        displayName: user.displayName,
                    }),
                },
                { root: true }
            )
        },
        async removeUserFromRoom(context, { user, host }) {
            console.log('removeUserFromRoom')
            await context.dispatch(
                'firestore/updateField',
                {
                    collection: 'rooms',
                    document: host,
                    field: 'users',
                    newData: firebase.firestore.FieldValue.arrayRemove({
                        avatar: user.avatar,
                        displayName: user.displayName,
                    }),
                },
                { root: true }
            )
        },
        async loadRoom(context, host) {
            console.log('loadRoom')
            let room = await context.dispatch(
                'firestore/loadDocument',
                {
                    collection: 'rooms',
                    document: host,
                },
                {
                    root: true,
                }
            )
            return room
        },
        async loadRooms(context) {
            console.log('loadRooms')
            let rooms = await context.dispatch(
                'firestore/loadCollection',
                'rooms',
                { root: true }
            )
            context.state.rooms = rooms.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        },
        async createRoom(context, { name, difficulty, host, guessingTime }) {
            console.log('createRoom')
            context.state.rooms.push({ name, difficulty, host })
            await context.dispatch(
                'firestore/updateDocument',
                {
                    collection: 'rooms',
                    document: host.displayName,
                    newData: {
                        difficulty,
                        name,
                        guessingTime,
                        host: host.displayName,
                        users: [host],
                        isInSession: false,
                    },
                },
                { root: true }
            )
        },
    },
}
