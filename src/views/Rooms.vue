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
    import { mapGetters, mapActions } from 'vuex'
    import { projectFirestore } from '@/firebase/config'

    export default {
        components: { NavbarLoggedIn, RoomAvatar, RoomsList, Footer },
        async mounted() {
            await this.getUserPreferences()
            await this.loadRooms()
            await this.createUserPreferences()

            projectFirestore.collection('rooms').onSnapshot(() => {
                this.loadRooms()
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
