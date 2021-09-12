export default {
    namespaced: true,
    state: {
        game: {
            timePerQuestion: 10,
        },
    },
    actions: {
        async createGame(context, { host, timePerQuestion }) {
            console.log('createGame')
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
            console.log('deleteGame')
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
