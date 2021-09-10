import { createStore } from 'vuex'

import auth from './auth.js'
import avatar from './avatar.js'
import firestore from './firestore.js'
import userPreferences from './userPreferences.js'
import rooms from './rooms.js'

export default createStore({
    modules: { auth, avatar, firestore, userPreferences, rooms },
    actions: {
        async isUniqueDisplayName(context, displayName) {
            const data = await context.dispatch(
                'firestore/loadCollection',
                'user_preferences',
                { root: true }
            )
            if (!data) {
                return
            }
            const displayNames = data.map((doc) => {
                return doc.data().displayName
            })
            let isValid = displayNames.indexOf(displayName) == -1 ? true : false
            console.log(isValid)
            return isValid
        },
    },
})
