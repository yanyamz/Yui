import { projectAuth } from '../firebase/config'

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
            if (projectAuth.currentUser.displayName != host) {
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
        async addUserToRoom(context, host) {
            const oldData = await context.dispatch('loadRoom', host)
            const oldUserList = oldData.users
            const newUserList = oldUserList.filter((entry) => {
                if (entry.username != projectAuth.currentUser.displayName) {
                    return entry
                }
            })
            newUserList.push({
                avatar: context.rootGetters['userPreferences/avatarIndex'],
                username: projectAuth.currentUser.displayName,
            })
            await context.dispatch(
                'firestore/updateDocument',
                {
                    collection: 'rooms',
                    document: host,
                    newData: { ...oldData, users: newUserList },
                },
                { root: true }
            )
        },
        async removeUserFromRoom(context, host) {
            const oldData = await context.dispatch('loadRoom', host)
            const oldUserList = oldData.users
            const newUserList = oldUserList.filter((entry) => {
                if (entry.username != projectAuth.currentUser.displayName) {
                    return entry
                }
            })
            if (newUserList.length == 0) {
                context.dispatch('deleteRoom', host)
            }
            await context.dispatch(
                'firestore/updateDocument',
                {
                    collection: 'rooms',
                    document: host,
                    newData: { ...oldData, users: newUserList },
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
                    document: host,
                    newData: {
                        difficulty,
                        name,
                        host,
                        users: [],
                        isInSession: false,
                    },
                },
                { root: true }
            )
        },
    },
}
