<template>
	<figure class="user__image image">
		<img
			class="is-rounded"
			:src="
				require(`@/assets/images/avatars/${getAvatar(user.avatar) ??
					'yui'}_neutral.png`)
			"
		/>
	</figure>
	<p class="user__name is-size-5">{{ user.displayName }}</p>
	<img
		v-if="user.displayName == host"
		class="user__crown"
		:src="require(`@/assets/svg/crown.png`)"
		alt=""
	/>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	props: ['user', 'host'],
	computed: {
		...mapGetters('avatar', ['avatars']),
	},
	methods: {
		getAvatar(number) {
			return this.avatars[number % this.avatars.length]
		},
	},
}
</script>

<style lang="scss" scoped>
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
