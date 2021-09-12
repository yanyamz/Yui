import { projectAuth } from '../firebase/config'

export default {
    namespaced: true,
    state: {
        avatars: [
            'yui',
            'bunny',
            'rumia',
            'michi',
            'akari',
            'jin',
            'atarah',
            'freya',
            'lance',
            'lauren',
            'roselyn',
        ],
        tempAvatarIndex: 0,
    },
    getters: {
        tempAvatar(state) {
            return state.avatars[
                Math.abs(state.tempAvatarIndex % state.avatars.length)
            ]
        },
        avatars(state) {
            return state.avatars
        },
    },
    actions: {
        modifyIndex(context, operation) {
            operation == 'subtract'
                ? (context.state.tempAvatarIndex -= 1)
                : (context.state.tempAvatarIndex += 1)
        },
        async saveAvatarState(context) {
            await context.dispatch(
                'firestore/updateDocument',
                {
                    collection: 'user_preferences',
                    document: projectAuth.currentUser.displayName,
                    newData: {
                        ...context.rootGetters[
                            'userPreferences/userPreferences'
                        ],
                        avatar: context.state.tempAvatarIndex,
                    },
                },
                { root: true }
            )
        },
        resetTempAvatarIndex(context) {
            context.state.tempAvatarIndex =
                context.rootGetters['userPreferences/avatarIndex']
        },
    },
}
