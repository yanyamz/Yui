<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a
                @click="toggleMenuState"
                ref="mobileMenu"
                role="button"
                class="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isOpen }">
            <div class="navbar-start"></div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons" :class="{ 'is-justify-content-flex-end': isOpen }">
                        <a @click="handleClick" class="button is-primary">
                            <strong>Logout</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            isOpen: false,
        }
    },
    getters: {
        ...mapGetters('auth', ['error']),
    },
    methods: {
        ...mapActions('auth', ['logout']),
        async toggleMenuState() {
            this.isOpen = !this.isOpen
            this.$refs.mobileMenu.classList.toggle('is-active')
        },
        async handleClick() {
            await this.logout()
            this.$router.push({ name: 'Home' })
            if (!this.error) {
                //
            }
        },
    },
}
</script>

<style></style>
