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
        async setDatabase(context) {
            console.log('setDatabase')
            const data = await fetch(
                `https://api.jsonbin.io/b/613e947e4a82881d6c4dcfe8`
            )
            const res = await data.json()
            context.state.database = res
        },
        async createPlaylist(context) {
            console.log('createPlaylist')
            context.state.game.playList = []
            const songsChosen = () => {
                const songs = new Set()
                while (songs.size < context.state.game.playListSize) {
                    songs.add(
                        Math.floor(
                            Math.random() * context.state.database.length
                        )
                    )
                }
                return [...songs]
            }
            for (const songIndex of songsChosen()) {
                context.state.game.playList.push(
                    context.state.database[songIndex]
                )
            }
            return context.state.game.playList
        },
        async getGameInfo(context, host) {
            console.log('getGameInfo')
            const gameInfo = await context.dispatch(
                'firestore/loadDocument',
                {
                    collection: 'games',
                    document: host,
                },
                { root: true }
            )
            context.state.game = gameInfo
            console.log(context.state.game)
        },
    },
}
