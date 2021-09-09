export default {
    state: {
        avatars: ['yui', 'bunny', 'rumia', 'michi', 'akari', 'jin', 'atarah', 'freya', 'lance'],
        currentAvatarIndex: 0,
        tempAvatarIndex: 0,
    },
    getters: {
        avatar(state) {
            return state.avatars[Math.abs(state.currentAvatarIndex % state.avatars.length)]
        },
        tempAvatar(state) {
            return state.avatars[Math.abs(state.tempAvatarIndex % state.avatars.length)]
        },
    },
    actions: {
        modifyIndex(context, operation) {
            operation == 'subtract'
                ? (context.state.tempAvatarIndex -= 1)
                : (context.state.tempAvatarIndex += 1)
        },
    },
    mutations: {
        resetTempAvatarIndex(state) {
            state.tempAvatarIndex = state.currentAvatarIndex
        },
        saveAvatarState(state) {
            state.currentAvatarIndex = state.tempAvatarIndex
        },
        setAvatarState(state, data) {
            state.currentAvatarIndex = data
        },
    },
}
