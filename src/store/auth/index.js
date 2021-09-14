import authGetters from './getters'
import authActions from './actions'
import authMutations from './mutations'

export default {
    namespaced: true,
    state: {
        error: null,
    },
    getters: authGetters,
    actions: authActions,
    mutations: authMutations,
}
