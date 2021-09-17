export default {
	namespaced: true,
	state() {
		return {
			game: {},
			database: [],
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
			context.state.database = database
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
		async filterSearch(context, input) {
			let entries = context.state.database
			if (!entries) {
				const data = await fetch(
					`https://api.jsonbin.io/b/613e947e4a82881d6c4dcfe8`
				)
				entries = await data.json()
				context.state.database = entries
			}
			const possibleEntries = []
			for (let i = 0; i < entries.length; i++) {
				if (
					entries[i].animeEnglish
						.toLowerCase()
						.indexOf(input.toLowerCase()) != -1 ||
					entries[i].animeRomaji
						.toLowerCase()
						.indexOf(input.toLowerCase()) != -1
				) {
					possibleEntries.push(entries[i].animeEnglish)
					possibleEntries.push(entries[i].animeRomaji)
				}
			}
			return [...new Set(possibleEntries)]
		},
	},
}
