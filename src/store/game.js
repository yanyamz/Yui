// import { projectFirestore } from '../firebase/config'

export default {
    namespaced: true,
    state: {
        game: {
            timePerQuestion: 10,
        },
    },
    actions: {
        async createGame(context, { host, timePerQuestion }) {
            console.log('creating game')
            context.state.game = {
                timePerQuestion,
            }
            await context.dispatch(
                'firestore/updateDocument',
                {
                    collection: 'games',
                    document: host.displayName,
                    newData: {
                        timePerQuestion,
                    },
                },
                { root: true }
            )
        },
    },
}
