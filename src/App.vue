<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { projectAuth } from '@/firebase/config'

export default {
    async mounted() {
        this.setDatabase()
        projectAuth.onAuthStateChanged((_user) => {
            this.updateUser(_user)
        })
    },
    async unmounted() {
        projectAuth.onAuthStateChanged((_user) => {
            this.updateUser(_user)
        })
    },
    methods: {
        ...mapMutations('auth', ['updateUser']),
        ...mapActions('game', ['setDatabase']),
    },
}
</script>

<style>
#app {
    padding: 0 1rem;
}

* {
    scroll-behavior: smooth;
    box-sizing: border-box;
}
</style>
