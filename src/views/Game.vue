<template>
	<div class=" p-3 has-background-white">
		<div class="block is-flex is-justify-content-space-between">
			<router-link @click="checkIfHostLeft" class to="/rooms">
				<div class="button is-danger">Leave</div>
			</router-link>
		</div>
		<div class="game block">
			<GameVideo v-if="Object.entries(game).length !== 0" :game="game" />
			<!-- <input
				class="input is-primary"
				:class="{
					'is-success': isCorrect,
					'is-danger': isWrong,
				}"
				type="text"
				placeholder="Primary input"
			/> -->
		</div>
		<div class="grid block">
			<div
				v-for="user in users"
				:key="user.displayName"
				class="user"
				:class="{
					'has-background-success': isCorrect,
					'has-background-danger': isWrong,
				}"
			>
				<user-card :user="user" :host="host"></user-card>
			</div>
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

		this.socket.emit('startGame', this.host, (error) => {
			if (error) {
				console.log(error)
			}
		})

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
.user {
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	border-radius: 5px;
	flex: 1 1;
	flex-basis: 30%;
	min-width: 250px;
	background: white;
	display: flex;
	align-items: center;
	padding: 1rem;
	&__image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		img {
			object-fit: cover;
			object-position: center;
		}
	}
	&__crown {
		width: 2rem;
	}
	&__name {
		align-self: center;
		margin-left: 1rem;
	}
}
</style>
