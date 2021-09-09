<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { projectAuth } from '@/firebase/config'

export default {
    mounted() {
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
}
</style>
