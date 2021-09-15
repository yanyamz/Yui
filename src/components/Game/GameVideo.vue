<template>
	<input
		type="range"
		class="form-range"
		id="customRange1"
		ref="video_volume"
		min="0"
		max="100"
		step="1"
		@input="SetVolume"
		@change="SetVolume"
	/>
	<div class="container">
		<video
			v-if="!refreshComponent"
			@loadeddata="NewVideo"
			@canplaythrough.once="CanPlay"
			class="video"
			ref="video"
			disablePictureInPicture
		>
			<source
				:src="currentSong.linkWebm"
				ref="video_source"
				disablePictureInPicture
			/>
			Your browser does not support the video tag
		</video>
		<div v-show="!isVisible" class="video__overlay bg-dark">?</div>
	</div>
	<div class="progress">
		<div
			class="progress-bar"
			role="progressbar"
			aria-valuenow="0"
			aria-valuemin="0"
			aria-valuemax="100"
			:style="progressWidth"
		></div>
	</div>

	<div class="btn-group" role="group" aria-label="Basic example">
		<button @click="SkipPhase" type="button" class="btn btn-outline-primary">
			Skip / Check Answer
		</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import helpers from '@/mixins/helpers.js'
export default {
	mixins: [helpers],
	data() {
		return {
			refreshComponent: false,
			isVisible: false,
			isSongOver: false,
			isHelperMode: true,
			startTime: 0,
		}
	},
	watch: {
		phase(phase) {
			switch (phase) {
				case 'done':
					this.NextVideo()
					break
				case 'results':
					this.ShowResults()
					break
				case 'guessing':
					this.HideVideo()
					break
			}
		},
	},
	computed: {
		...mapGetters('game', [
			'playList',
			'currentSong',
			'songTime',
			'currentSongTime',
			'phase',
			'isGameOver',
		]),
		progressWidth() {
			const percent =
				((this.songTime - this.currentSongTime) / this.songTime) * 100
			return { width: `${percent}%` }
		},
	},
	methods: {
		...mapActions('game', [
			'FetchNewSong',
			'StartTimer',
			'SkipPhase',
			'MaxOutCurrentSongTime',
		]),
		NewVideo() {
			this.SetIntervalForVideo()
			this.SetVolume()
		},
		CanPlay() {
			this.PlayVideo()
			this.StartTimer()
		},
		SetIntervalForVideo() {
			this.startTime = Math.abs(
				this.RandomInt(
					0,
					Math.floor(this.$refs.video.duration) - this.songTime
				)
			)
			this.$refs.video.currentTime = this.startTime
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
.form-range {
	max-width: 10rem;
}
.container {
	position: relative;
	max-width: 62rem;
	border-radius: 0.2rem;
	overflow: hidden;
}
.video {
	width: 100%;
	height: 100%;
	border-radius: inherit;
	&__overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: grid;
		place-items: center;
		color: white;
		font-size: 8rem;
		font-weight: 600;
	}
	&__buttons {
		margin: 1rem 0;
		width: 100%;
		// display: flex;
		// justify-content: space-between;
	}
	&__button:not(:first-child) {
		margin-left: 1rem;
	}
}
</style>
