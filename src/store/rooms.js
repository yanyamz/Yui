import { projectAuth, firebase } from '../firebase/config'

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
            if (projectAuth.currentUser.displayName !== host) {
                return
            }
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
        async setRoomInSession(context, host) {
            try {
                await context.dispatch(
                    'firestore/updateField',
                    {
                        collection: 'rooms',
                        document: host.displayName,
                        field: 'isInSession',
                        newData: true,
                    },
                    { root: true }
                )
            } catch (err) {
                console.log('failed to set in session')
            }
        },
        async addUserToRoom(context, { user, host }) {
            console.log(user, host)
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
                    document: host.displayName,
                    newData: {
                        difficulty,
                        name,
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
