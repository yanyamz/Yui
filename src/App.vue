<template>
    <div class="container">
        <Navbar />
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'

export default {
    components: {
        Navbar,
        Footer,
    },
}
</script>

<style>
#app {
    padding: 0 1rem;
}
</style>
