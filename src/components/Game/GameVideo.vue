<template>
	<div class="component container">
		<div class="top">
			<p class="songs-left">
				{{ game.currentSongNum + 1 }} / {{ game.playList.length }}
			</p>
			<p v-show="phase == 'results'" class="title is-size-4 show-name">
				{{ game.playList[game.currentSongNum].animeEnglish }}
			</p>
			<input
				type="range"
				class="form-range is-block is-primary"
				ref="video_volume"
				min="0"
				max="100"
				step="1"
				@input="SetVolume"
				@change="SetVolume"
			/>
		</div>
		<div class="leaderboard">
			<p v-for="key in Object.keys(game.users)" :key="key" class="">
				{{ key }}: {{ game.users[key].points }}
			</p>
		</div>
		<div class="song-info">
			<div class="box">
				<p v-show="phase == 'results'" class="song-type">
					Type: {{ game.playList[game.currentSongNum].type }}
				</p>
				<p v-show="phase == 'results'" class="song-name">
					Song Name: {{ game.playList[game.currentSongNum].songName }}
				</p>
			</div>
		</div>
		<div class="video-player is-loading">
			<h1 class="question-mark" v-show="phase == 'guessing'">?</h1>
			<video
				@loadeddata="NewVideo"
				@canplaythrough.once="CanPlay"
				class="video"
				ref="video"
				disablePictureInPicture
				:key="game.currentSongNum"
				:class="{ 'is-invisible': phase !== 'results' }"
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
				class="input is-primary"
				:class="{
					'is-success': game.users[userPreferences.displayName].isCorrect,
					'is-danger': game.users[userPreferences.displayName].isWrong,
				}"
				v-model.trim="guess"
				type="text"
				placeholder="guess"
				list="datalistOptions"
			/>
			<SearchOptions @updateGuess="updateGuess" :entries="possibleEntries" />
		</div>
		<div class="users grid block">
			<div
				v-for="user in users"
				:key="user.displayName"
				class="user"
				:class="{
					'has-background-success':
						game.users[user.displayName].isCorrect ?? false,
					'has-background-danger':
						game.users[user.displayName].isWrong ?? false,
				}"
			>
				<user-card
					:user="user"
					:host="host"
					:isCorrect="game.users[user.displayName].isCorrect"
					:isWrong="game.users[user.displayName].isWrong"
				></user-card>
			</div>
		</div>
	</div>
</template>

<script>
import helpers from '@/mixins/helpers.js'
import { io } from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'
import SearchOptions from '@/components/Game/SearchOptions'

export default {
	mixins: [helpers],
	props: ['game', 'users', 'host'],
	components: {
		SearchOptions,
	},
	data() {
		return {
			startingTime: 0,
			guess: '',
			submitted: false,
			possibleEntries: [],
			socket: io('https://animeopbackend.herokuapp.com/'),
		}
	},
	computed: {
		...mapGetters('userPreferences', ['userPreferences']),
		progressWidth() {
			const percent =
				((this.game.guessingTime - this.game.currentSongTime) /
					this.game.guessingTime) *
				100
			return percent
		},
		phase() {
			return this.game.phase % 2 === 0 ? 'guessing' : 'results'
		},
	},
	watch: {
		phase() {
			this.$refs.video.currentTime = this.startingTime
			if (this.phase === 'results') {
				this.socket.emit(
					'checkAnswer',
					{
						host: this.game.host,
						user: this.userPreferences.displayName,
						answer: this.guess,
					},
					(error) => {
						if (error) console.log(error)
					}
				)
			} else {
				this.guess = ' '
			}
		},
		async guess(value) {
			if (value.length > 2 && this.submitted == false) {
				this.possibleEntries = await this.filterSearch(this.guess)
			} else {
				this.possibleEntries = []
			}
		},
	},
	methods: {
		...mapActions('game', ['filterSearch']),
		updateGuess(input) {
			this.guess = input
		},
		NewVideo() {
			this.SetVolume()
		},
		CanPlay() {
			this.SetIntervalForVideo()
			this.PlayVideo()
		},
		SetIntervalForVideo() {
			const startTime = Math.abs(
				this.RandomInt(
					0,
					Math.floor(this.$refs.video.duration) - this.game.guessingTime
				)
			)
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
.component {
	margin-top: -2.5rem;
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
	grid-template-areas:
		'. top .'
		'leaderboard videoplayer songinfo'
		'users users users';
	gap: 1rem;

	@media (max-width: 1000px) {
		grid-template-columns: 1fr;
		grid-template-areas:
			'top'
			'songinfo'
			'videoplayer'
			'leaderboard'
			'users';
		gap: 0;
		place-items: center;
	}
}

.top {
	grid-area: top;
}

.leaderboard {
	grid-area: leaderboard;
}

.song-info {
	grid-area: songinfo;
}

.video-player {
	grid-area: videoplayer;
	position: relative;
}

.users {
	grid-area: users;
	display: flex;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
}

.question-mark {
	position: absolute;
	top: 35%;
	left: 50%;
	font-size: 4rem;
}

.user {
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	border-radius: 5px;
	flex: 1 1;
	flex-basis: 30%;
	min-width: 250px;
	max-width: 400px;
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

.grid {
	margin-top: 1rem;
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	overflow: auto;
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
	background: #bccee8;
	margin-top: -5px;
	border-radius: 50%;
}

input[type='range']::-moz-range-thumb {
	height: 15px;
	width: 15px;
	background: #bccee8;
	margin-top: -5px;
	border-radius: 50%;
}
</style>
