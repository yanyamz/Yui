<template>
	<NavbarLoggedIn />
	<p class="block">Logged in as: {{ displayName }}</p>
	<div class="columns">
		<RoomsList />
		<RoomAvatar />
	</div>
	<Footer />
</template>

<script>
import NavbarLoggedIn from '@/components/Layout/NavbarLoggedIn.vue'
import RoomsList from '@/components/Rooms/RoomsList'
import RoomAvatar from '@/components/Rooms/RoomAvatar.vue'
import Footer from '@/components/Layout/Footer'
import { mapGetters, mapActions, useStore } from 'vuex'
import { projectFirestore } from '@/firebase/config'
import { watchEffect } from '@vue/runtime-core'
import { io } from 'socket.io-client'

export default {
	components: { NavbarLoggedIn, RoomAvatar, RoomsList, Footer },
	async mounted() {
		await this.getUserPreferences()
		await this.createUserPreferences()
		this.socket.emit('deleteGame', this.displayName)
	},
	data() {
		return {
			socket: io('http://localhost:3000'),
		}
	},
	created() {
		document.title = 'Yui - Main'
	},

	setup() {
		const store = useStore()
		const unsub = projectFirestore.collection('rooms').onSnapshot(() => {
			store.dispatch('rooms/loadRooms')
		})
		watchEffect((onInvalidate) => {
			onInvalidate(() => unsub())
		})
	},
	computed: {
		...mapGetters('userPreferences', ['displayName']),
	},
	methods: {
		...mapActions('userPreferences', [
			'getUserPreferences',
			'createUserPreferences',
		]),
		...mapActions('rooms', ['loadRooms']),
	},
}
</script>
