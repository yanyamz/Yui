<template>
	<div class="card p-3 has-background-white">
		<div class="block is-flex is-justify-content-space-between">
			<router-link @click="removeUserFromFirebase" class to="/rooms">
				<div class="button is-danger">Leave</div>
			</router-link>
			<p class="title">{{ roomName }}</p>
		</div>

		<div class="grid block">
			<div v-for="user in users" :key="user.displayName" class="user">
				<user-card :user="user" :host="host"></user-card>
			</div>
		</div>
		<button
			v-if="userPreferences.displayName == host"
			@click="startGame"
			class="block my-button button is-centered is-success"
		>
			Start Game
		</button>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { projectFirestore } from '@/firebase/config'

export default {
	props: ['id'],
	data() {
		return {
			roomData: ['nothing to see here man'],
			users: [],
			unsubRoomChanges: null,
		}
	},
	async created() {
		document.title = 'Yui - Lobby'

		window.addEventListener('beforeunload', (event) => {
			this.removeUserFromFirebase()
			event.preventDefault()
			event.returnValue = ''
		})
	},
	async mounted() {
		await this.addUserToRoom({
			user: this.userPreferences,
			host: this.host,
		})
		this.unsubRoomChanges = projectFirestore
			.collection('rooms')
			.doc(this.host)
			.onSnapshot(async (snapshot) => {
				this.roomData = await snapshot.data()
				if (!this.roomData) {
					this.$router.push('/rooms')
				}
				if (this.roomData?.isInSession === true) {
					this.$router.push(`/game/${this.roomName}+${this.host}`)
				}
				this.users = this.roomData?.users
			})
	},
	async unmounted() {
		this.unsubRoomChanges?.()
	},
	computed: {
		...mapGetters('avatar', ['avatars']),
		...mapGetters('userPreferences', ['avatarIndex', 'userPreferences']),
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
			'addUserToRoom',
			'removeUserFromRoom',
			'deleteRoom',
			'setRoomInSession',
		]),
		...mapActions('game', ['createGame', 'createPlaylist']),
		getAvatar(number) {
			return this.avatars[number % this.avatars.length]
		},
		async startGame() {
			await this.setRoomInSession({ host: this.host, newData: true })
		},
		async removeUserFromFirebase() {
			if (this.host === this.userPreferences.displayName) {
				await this.deleteRoom(this.host)
				return
			}
			await this.removeUserFromRoom({
				user: this.userPreferences,
				host: this.host,
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.grid {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
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
