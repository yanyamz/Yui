<template>
	<div class="container">
		<h1>{{ game.guessingTime - game.currentSongTime }}</h1>

		<div class="video-player">
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
				controls
			>
				<source
					src="https://files.catbox.moe/6oq8tl.mp4"
					ref="video_source"
					disablePictureInPicture
				/>
				Your browser does not support the video tag
			</video>
			<progress class="progress is-small is-link" value="20" max="100"
				>20%</progress
			>
		</div>
	</div>
</template>

<script>
export default {
	props: ['game'],
	methods: {
		SetVolume() {
			this.$refs.video.volume = this.$refs.video_volume.value / 100
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
.form-range {
	// position: absolute;
	// top: 0;
	// right: 0;
	// max-width: 10rem;
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
	border: 1px solid black;
}
</style>
