<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { projectAuth } from '@/firebase/config'

export default {
    async mounted() {
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
