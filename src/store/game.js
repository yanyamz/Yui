export default {
    namespaced: true,
    state: {
        game: {
            timePerQuestion: 10,
            playList: [],
            playListSize: 10,
        },
        database: [],
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
            const data = await fetch('./dbEasy.json')
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
        },
    },
}
