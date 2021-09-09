const { projectAuth } = require('../firebase/config')

export default {
    namespaced: true,
    state: {
        user: projectAuth.currentUser,
        error: null,
    },
    getters: {
        error(state) {
            return state.error
        },
        user(state) {
            return state.user
        },
    },
    actions: {
        async login(context, { email, password }) {
            context.state.error = null
            try {
                const res = await projectAuth.signInWithEmailAndPassword(email, password)
                context.state.error = null
                return res
            } catch (err) {
                context.state.error = 'Incorrect login credentials'
            }
        },
        async logout(context) {
            context.state.error = null
            try {
                await projectAuth.signOut()
            } catch (err) {
                context.state.error = context.state.message
            }
        },
        async signup(context, { email, password, displayName }) {
            context.state.error = null
            try {
                const res = await projectAuth.createUserWithEmailAndPassword(email, password)
                if (!res) throw new Error('Could not complete the signup')
                await res.user.updateProfile({ displayName })
                context.state.error = null
                return res
            } catch (err) {
                context.state.error = err.message
            }
        },
    },
    mutations: {
        updateUser(state, _user) {
            state.user = _user
        },
    },
}
