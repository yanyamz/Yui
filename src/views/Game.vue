<template>
	<div class=" p-3 has-background-white">
		<div class="block is-flex is-justify-content-space-between">
			<router-link @click="checkIfHostLeft" class to="/rooms">
				<div class="button is-danger">Leave</div>
			</router-link>
		</div>
		<div class="game block">
			<GameVideo
				v-if="Object.entries(game).length !== 0"
				:game="game"
				:users="users"
			/>
			<h2 v-else>Game Loading ...</h2>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { projectFirestore } from '@/firebase/config.js'
import { io } from 'socket.io-client'
import GameVideo from '@/components/Game/GameVideo.vue'

export default {
	components: { GameVideo },
	props: ['id'],
	data() {
		return {
			users: [],
			unsubRoomChanges: null,
			isCorrect: false,
			isWrong: false,
			game: {},
			socket: io('http://localhost:3000'),
		}
	},
	async created() {
		window.addEventListener('beforeunload', (event) => {
			this.checkIfHostLeft()
			event.preventDefault()
			event.returnValue = ''
		})
	},
	async mounted() {
		document.title = 'Yui - Game'

		this.socket.emit(
			'startGame',
			{ host: this.host, user: this.userPreferences.displayName },
			(error) => {
				if (error) console.log(error)
			}
		)

		this.socket.on('updateGame', (game) => {
			this.game = game
		})

		this.unsubRoomChanges = projectFirestore
			.collection('rooms')
			.doc(this.host)
			.onSnapshot(async (snapshot) => {
				const roomData = await snapshot.data()
				if (!roomData) {
					this.$router.push('/rooms')
				}
				if (roomData?.isInSession === true) {
					this.$router.push(`/game/${this.roomName}+${this.host}`)
				}
				this.users = roomData?.users
			})
	},
	async unmounted() {
		this.unsubRoomChanges?.()
	},
	computed: {
		...mapGetters('avatar', ['avatars']),
		...mapGetters('userPreferences', ['avatarIndex', 'userPreferences']),
		...mapGetters('game', ['playList']),
		roomName() {
			return this.id.substring(0, this.id.indexOf('+'))
		},
		host() {
			return this.id.substring(this.id.indexOf('+') + 1, this.id.length)
		},
	},
	methods: {
		...mapActions('rooms', [
			'loadRoom',
			'removeUserFromRoom',
			'deleteRoom',
			'setRoomInSession',
		]),
		async checkIfHostLeft() {
			if (this.host === this.userPreferences.displayName) {
				await this.deleteRoom(this.host)
				this.socket.emit('leaving', this.host, (error) => {
					if (error) {
						console.log(error)
					}
				})
				this.socket.emit('deleteGame', this.host, (error) => {
					if (error) {
						console.log(error)
					}
				})
				return
			}
			this.socket.emit('leaving', this.host, (error) => {
				if (error) {
					console.log(error)
				}
			})
			await this.removeUserFromRoom({
				user: this.userPreferences,
				host: this.host,
			})
		},
		getAvatar(number) {
			return this.avatars[number % this.avatars.length]
		},
	},
}
</script>

<style lang="scss" scoped>
.grid {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	overflow: auto;
	max-height: 10rem;
}
</style>
