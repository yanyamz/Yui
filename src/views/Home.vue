<template>
    <div class="container">
        <Hero />
        <CardSection />
        <!-- <Login /> -->
        <Signup />
    </div>
</template>

<script>
import Hero from '@/components/Home/Hero'
// import Login from '@/components/Auth/Login'
import CardSection from '@/components/Home/CardSection'
import Signup from '@/components/Auth/Signup'

export default {
    components: {
        Hero,
        // Login,
        CardSection,
        Signup,
    },
    setup() {},
}
</script>

<style lang="scss">
img {
    object-fit: cover;
    object-position: center;
}
</style>
