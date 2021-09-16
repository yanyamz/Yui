<template>
	<div class="container">
		<h1>{{ game?.guessingTime - game?.currentSongTime ?? 30 }}</h1>
		<div class="leaderboard">
			<p v-for="key in Object.keys(game.users)" :key="key" class="user">
				{{ key }}: {{ game.users[key].points }}
			</p>
		</div>
		<div class="video-player is-loading">
			<input
				type="range"
				class="form-range is-block is-primary"
				id="customRange1"
				ref="video_volume"
				min="0"
				max="100"
				step="1"
				@input="SetVolume"
				@change="SetVolume"
			/>

			<video
				v-if="!refreshComponent"
				@loadeddata="NewVideo"
				@canplaythrough.once="CanPlay"
				class="video"
				ref="video"
				disablePictureInPicture
				:key="game.currentSongNum"
			>
				<source
					:src="game.playList[game.currentSongNum].linkWebm"
					ref="video_source"
					disablePictureInPicture
				/>
				Your browser does not support the video tag
			</video>
			<progress
				class="progress is-small is-primary"
				:value="progressWidth"
				max="100"
				>{{ progressWidth }}%</progress
			>
			<input
				v-model="guess"
				type="text"
				class="is-primary"
				placeholder="guess"
			/>
		</div>
	</div>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import { io } from 'socket.io-client'

export default {
	mixins: [helpers],
	props: ['game'],
	data() {
		return {
			startingTime: 0,
			guess: '',
			socket: io('http://localhost:3000'),
		}
	},
	computed: {
		progressWidth() {
			const percent =
				((this.game.guessingTime - this.game.currentSongTime) /
					this.game.guessingTime) *
				100
			return percent
		},
		phase() {
			// return phase % 2 === 0 ? 'guessing' : 'results'
			return this.phase
		},
	},
	watch: {
		phase() {
			this.$refs.video.currentTime = this.startingTime
			// this.socket.emit(
			// 	'startGame',
			// 	{ host: this.host, user: this.userPreferences.displayName },
			// 	(error) => {
			// 		if (error) console.log(error)
			// 	}
			// )
		},
	},
	methods: {
		NewVideo() {
			this.SetVolume()
		},
		CanPlay() {
			this.SetIntervalForVideo()
			this.PlayVideo()
		},
		SetIntervalForVideo() {
			console.log(this.$refs.video.duration, this.game.guessingTime)
			const startTime = Math.abs(
				this.RandomInt(
					0,
					Math.floor(this.$refs.video.duration) - this.game.guessingTime
				)
			)
			console.log('startTime', startTime)
			this.$refs.video.currentTime = startTime
			this.startingTime = startTime
		},
		SetVolume() {
			this.$refs.video.volume = this.$refs.video_volume.value / 100
		},
		ShowVideo() {
			this.isVisible = true
		},
		HideVideo() {
			this.isVisible = false
		},
		PlayVideo() {
			this.$refs.video.play()
		},
		PauseVideo() {
			this.$refs.video.pause()
		},
		RestartVideo() {
			this.$refs.video.currentTime = 0
		},
		NextVideo() {
			this.FetchNewSong()
			this.PauseVideo()
			this.RefreshComponent()
		},
		ShowResults() {
			this.ShowVideo()
			this.StartTimer()
			this.$refs.video.currentTime = this.startTime
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	margin: 0 auto;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	// background: blue;
}

.video-player {
	max-width: 40rem;
	position: relative;
	// background: red;
}

.video {
	width: 100%;
	margin: 0 auto;
	height: auto;
	border: 1px solid #313159;
	border-radius: 0.5rem;
}

input[type='range'] {
	margin-bottom: 0.5rem;
	-webkit-appearance: none;
}

input[type='range']:focus {
	outline: none;
}

input[type='range']::-webkit-slider-runnable-track {
	background: #313159;
	height: 5px;
}

input[type='range']::-moz-range-track {
	background: #313159;
	height: 5px;
}

input[type='range']::-webkit-slider-thumb {
	-webkit-appearance: none;
	height: 15px;
	width: 15px;
	background: white;
	margin-top: -5px;
	border-radius: 50%;
}

input[type='range']::-moz-range-thumb {
	height: 15px;
	width: 15px;
	background: white;
	margin-top: -5px;
	border-radius: 50%;
}
</style>
