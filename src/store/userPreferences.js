import { projectAuth } from '../firebase/config'

export default {
    namespaced: true,
    state: {
        userPreferences: {
            displayName: '',
            avatar: null,
        },
    },
    getters: {
        userPreferences(state) {
            return state.userPreferences
        },
        displayName(state) {
            return state.userPreferences.displayName
        },
        avatarIndex(state) {
            return state.userPreferences.avatar
        },
    },
    actions: {
        async createUserPreferences(context) {
            if (context.state.userPreferences.displayName != '') return
            await context.dispatch(
                'firestore/updateDocument',
                {
                    collection: 'user_preferences',
                    document: projectAuth.currentUser.displayName,
                    newData: {
                        avatar: Math.floor(Math.random() * 15 + 1),
                        displayName: projectAuth.currentUser.displayName,
                    },
                },
                { root: true }
            )
        },
        async getUserPreferences(context) {
            const data = await context.dispatch(
                'firestore/loadDocument',
                {
                    collection: 'user_preferences',
                    document: projectAuth.currentUser.displayName,
                },
                { root: true }
            )
            if (!data) {
                return
            }
            context.state.userPreferences.displayName =
                projectAuth.currentUser.displayName
            context.state.userPreferences.avatar = data.avatar
        },
    },
    mutations: {
        wipeUserPreferences(state) {
            state.userPreferences = {
                displayName: '',
                avatar: null,
            }
        },
    },
}
