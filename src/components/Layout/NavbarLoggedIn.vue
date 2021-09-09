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
import { useRouter } from 'vue-router'
import useLogout from '@/composables/useLogout'
import { ref } from '@vue/runtime-core'

export default {
    setup() {
        const { logout, error } = useLogout()
        const router = useRouter()
        const handleClick = async () => {
            await logout()
            router.push({ name: 'Home' })
            if (!error.value) {
                // console.log('user logged out')
            }
        }

        const mobileMenu = ref(null)
        const isOpen = ref(false)
        const toggleMenuState = () => {
            isOpen.value = !isOpen.value
            mobileMenu.value.classList.toggle('is-active')
        }
        return { handleClick, mobileMenu, toggleMenuState, isOpen }
    },
}
</script>

<style></style>
