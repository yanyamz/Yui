export default {
    namespaced: true,
    state() {
        return {
            game: {
                timePerQuestion: 10,
                playList: [],
                playListSize: 10,
            },
        }
    },
    getters: {
        playList(state) {
            return state.playList
        },
    },
    actions: {
        async createGame(context, { host, timePerQuestion, playList }) {
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
                        playList,
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
        async createPlaylist(context) {
            console.log('createPlaylist')
            context.state.game.playList = []

            const data = await fetch(
                `https://api.jsonbin.io/b/613e947e4a82881d6c4dcfe8`
            )
            const database = await data.json()

            const songsChosen = () => {
                const songs = new Set()
                while (songs.size < context.state.game.playListSize) {
                    songs.add(Math.floor(Math.random() * database.length))
                }
                return [...songs]
            }
            for (const songIndex of songsChosen()) {
                context.state.game.playList.push(database[songIndex])
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
