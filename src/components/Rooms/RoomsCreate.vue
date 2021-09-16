<template>
	<div class="card">
		<div class="card-header has-background-light is-size-4">
			<div class="card-header-title">New Room</div>
		</div>
		<div class="card-content">
			<div class="field">
				<div class="control">
					<div class="label">Room Name</div>
					<input
						v-model.trim="roomName"
						id="room-name"
						type="text"
						maxlength="16"
						class="input is-primary block"
					/>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<div class="label">Guessing Time (sec)</div>
					<input
						v-model.number="guessingTime"
						id="room-name"
						type="number"
						max="30"
						min="10"
						class="input is-primary block"
					/>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<div class="label">Difficulty</div>
					<div class="select is-primary">
						<select v-model="difficulty">
							<option value="easy">Easy</option>
						</select>
					</div>
				</div>
			</div>
			<error-message v-if="!isValid">
				Invalid options, please check that you have valid settings.
				<br />
				Guessing time must be between 10-30
			</error-message>
			<div class="buttons">
				<button @click="submitForm" class="button is-primary">
					Create
				</button>
				<button @click="$emit('toggleActive')" class="button is-primary">
					Close
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { io } from 'socket.io-client'

export default {
	emits: ['toggleActive'],
	data() {
		return {
			roomName: '',
			difficulty: null,
			isValid: true,
			guessingTime: 25,
		}
	},
	computed: {
		...mapGetters('userPreferences', ['displayName', 'avatarIndex']),
	},
	methods: {
		...mapActions('rooms', ['createRoom']),
		...mapActions('game', ['createPlaylist']),

		toggleModal() {
			this.$emit('toggleActive')
		},
		async submitForm() {
			if (this.difficulty == null || this.roomName == '') {
				this.isValid = false
			} else if (!this.guessingTime) {
				this.isValid = false
			} else if (isNaN(parseInt(this.guessingTime))) {
				this.isValid = false
			} else if (
				parseInt(this.guessingTime) < 10 &&
				parseInt(this.guessingTime) > 30
			) {
				this.isValid = false
			}
			if (this.isValid) {
				this.toggleModal()
				await this.createRoom({
					name: this.roomName,
					difficulty: this.difficulty,
					guessingTime: this.guessingTime,
					host: {
						displayName: this.displayName,
						avatar: this.avatarIndex,
					},
				})
				this.$router.push(`/lobby/${this.roomName}+${this.displayName}`)

				const playList = await this.createPlaylist(10)
				const socket = io('http://https://yellow-snake-39.loca.lt')

				socket.emit(
					'createGame',
					{
						difficulty: this.difficulty,
						guessingTime: this.guessingTime,
						host: this.displayName,
						playList,
					},
					(error) => {
						if (error) {
							console.log(error)
						}
					}
				)
			}
			setTimeout(() => {
				this.isValid = true
			}, 3000)
		},
	},
}
</script>
