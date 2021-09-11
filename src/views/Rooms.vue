<template>
    <NavbarLoggedIn />
    <p class="block">Logged in as: {{ displayName }}</p>
    <div class="columns">
        <RoomsList />
        <RoomAvatar />
    </div>
    <Footer />
</template>

<script>
    import NavbarLoggedIn from '@/components/Layout/NavbarLoggedIn.vue'
    import RoomsList from '@/components/Rooms/RoomsList'
    import RoomAvatar from '@/components/Rooms/RoomAvatar.vue'
    import Footer from '@/components/Layout/Footer'
    import { mapGetters, mapActions, useStore } from 'vuex'
    import { projectFirestore } from '@/firebase/config'
    import { watchEffect } from '@vue/runtime-core'

    export default {
        components: { NavbarLoggedIn, RoomAvatar, RoomsList, Footer },
        async mounted() {
            await this.getUserPreferences()
            await this.loadRooms()
            await this.createUserPreferences()
        },
        created() {
            document.title = 'Yui - Main'
        },
        setup() {
            const store = useStore()

            const unsub = projectFirestore
                .collection('rooms')
                .onSnapshot(() => {
                    console.log('snapshot')
                    store.dispatch('rooms/loadRooms')
                })
            watchEffect((onInvalidate) => {
                onInvalidate(() => unsub())
            })
        },
        computed: {
            ...mapGetters('userPreferences', ['displayName']),
        },
        methods: {
            ...mapActions('userPreferences', [
                'getUserPreferences',
                'createUserPreferences',
            ]),
            ...mapActions('rooms', ['loadRooms']),
        },
    }
</script>
