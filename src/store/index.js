import { createStore } from 'vuex'

import auth from './auth.js'
import avatar from './avatar.js'
import firestore from './firestore.js'
import userPreferences from './userPreferences.js'

export default createStore({
    modules: { auth, avatar, firestore, userPreferences },
})
