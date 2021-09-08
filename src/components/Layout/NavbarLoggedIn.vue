<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <p class="title">{{ user?.displayName }}</p>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
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
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'

export default {
    setup() {
        const { logout, error } = useLogout()
        const { user } = getUser()
        const router = useRouter()
        const handleClick = async () => {
            await logout()
            router.push({ name: 'Home' })
            if (!error.value) {
                console.log('user logged out')
            }
        }
        return { handleClick, user }
    },
}
</script>

<style></style>
