import { projectAuth } from '../../firebase/config'

export default {
    async login(context, { email, password }) {
        context.state.error = null
        try {
            await projectAuth.signInWithEmailAndPassword(email, password)
            context.state.error = null
            await context.dispatch(
                'userPreferences/getUserPreferences',
                {},
                {
                    root: true,
                }
            )
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
            const res = await projectAuth.createUserWithEmailAndPassword(
                email,
                password
            )
            if (!res) throw new Error('Could not complete the signup')
            await res.user.updateProfile({ displayName })
            context.state.error = null
            return res
        } catch (err) {
            context.state.error = err.message
        }
    },
}
