export default {
    namespaced: true,
    state() {
        return {
            game: {},
        }
    },
    actions: {
        async createPlaylist(context, playlistSize) {
            console.log('createPlaylist')
            const playlist = []
            const data = await fetch(
                `https://api.jsonbin.io/b/613e947e4a82881d6c4dcfe8`
            )
            const database = await data.json()

            const songsChosen = () => {
                const songs = new Set()
                while (songs.size < playlistSize) {
                    songs.add(Math.floor(Math.random() * database.length))
                }
                return [...songs]
            }
            for (const songIndex of songsChosen()) {
                playlist.push(database[songIndex])
            }
            return playlist
        },
    },
}
