export default {
    namespaced: true,
    state: {
        game: {
            timePerQuestion: 10,
        },
    },
    actions: {
        // async StartGame(context) {},
        async createGame(context, { host, timePerQuestion }) {
            console.log('host', host)
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
    },
}
