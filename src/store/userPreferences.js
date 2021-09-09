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
        displayName(state) {
            return state.userPreferences.displayName
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
            console.log(context.state.userPreferences)
        },
    },
}
