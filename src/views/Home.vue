<template>
    <div class="container">
        <Navbar @showSignup="showSignup" @showLogin="showLogin" />
        <Hero />
        <CardSection />
        <div id="auth">
            <Login v-if="hasLogin" @showSignup="showSignup" />
            <Signup v-else @showLogin="showLogin" />
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
        return { hasLogin, showLogin, showSignup }
    },
}
</script>

<style lang="scss">
img {
    object-fit: cover;
    object-position: center;
}
</style>
