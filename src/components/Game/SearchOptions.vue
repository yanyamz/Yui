<template>
	<ul v-show="isVisible">
		<li
			@click="$emit('updateGuess', entry), (isVisible = false)"
			class="entry"
			v-for="entry in entries"
			:key="entry"
		>
			{{ entry }}
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		entries: {
			type: Array,
			required: true,
		},
	},
	emits: ['updateGuess'],
	data() {
		return {
			isVisible: true,
		}
	},
	watch: {
		entries() {
			console.log('TRUE')
			this.isVisible = true
		},
	},
}
</script>

<style lang="scss" scoped>
.entry {
	cursor: pointer;
	background: #313159;
	color: white;
	&:hover {
		background: black;
		color: white;
	}
}
</style>
