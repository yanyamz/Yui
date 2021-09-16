export default {
	state() {
		return {
			refreshComponent: false,
		}
	},
	methods: {
		RandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min)
		},
		RefreshComponent() {
			this.refreshComponent = true
			// The reason we have setTimeout here is because it'll run after all sync actions have finished
			setTimeout(() => (this.refreshComponent = false), 0)
		},
		async RefreshPage() {
			setTimeout(() => {
				location.reload()
			})
		},
	},
}
