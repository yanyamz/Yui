<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
<<<<<<< HEAD
import { mapMutations } from 'vuex'
=======
import { mapMutations, mapActions } from 'vuex'
>>>>>>> b539a38761ad68005150b3e7f08dcbfc527f666f
import { projectAuth } from '@/firebase/config'

export default {
    async mounted() {
<<<<<<< HEAD
=======
        this.setDatabase()
>>>>>>> b539a38761ad68005150b3e7f08dcbfc527f666f
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
<<<<<<< HEAD
=======
        ...mapActions('game', ['setDatabase']),
>>>>>>> b539a38761ad68005150b3e7f08dcbfc527f666f
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
