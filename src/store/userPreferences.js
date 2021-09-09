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
}
