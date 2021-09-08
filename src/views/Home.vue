<template>
    <div class="container">
        <Navbar @showSignup="showSignup" @showLogin="showLogin" />
        <Hero />
        <CardSection />
        <div id="auth">
            <Login v-if="hasLogin" @login="enterRooms" @showSignup="showSignup" />
            <Signup v-else @signup="enterRooms" @showLogin="showLogin" />
        </div>
        <Footer />
    </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import Hero from '@/components/Home/Hero'
import Login from '@/components/Auth/Login'
import CardSection from '@/components/Home/CardSection'
import Signup from '@/components/Auth/Signup'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
    components: {
        Hero,
        CardSection,
        Login,
        Signup,
        Navbar,
        Footer,
    },
    setup() {
        const hasLogin = ref(true)
        const showLogin = () => (hasLogin.value = true)
        const showSignup = () => (hasLogin.value = false)

        const router = useRouter()
        const enterRooms = () => {
            router.push({ name: 'Rooms' })
        }
        return { hasLogin, showLogin, showSignup, enterRooms }
    },
}
</script>

<style lang="scss">
img {
    object-fit: cover;
    object-position: center;
}
</style>
