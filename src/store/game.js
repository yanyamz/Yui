export default {
    namespaced: true,
    state: {
        game: {
            timePerQuestion: 10,
        },
    },
    actions: {
        async StartGame() {
            console.log('starting')
        },
        async createGame(context, { host, timePerQuestion }) {
            context.state.game = {
                timePerQuestion,
            }
            await context.dispatch(
                'firestore/updateDocument',
                {
                    collection: 'games',
                    document: host,
                    newData: {
                        timePerQuestion,
                    },
                },
                { root: true }
            )
        },
        async deleteGame(context, host) {
            await context.dispatch(
                'firestore/deleteDocument',
                {
                    collection: 'games',
                    document: host,
                },
                {
                    root: true,
                }
            )
        },
    },
}
