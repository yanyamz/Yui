<template>
    <NavbarLoggedIn />
    <p class="block">Logged in as: {{ user.displayName }}</p>
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
import { mapGetters } from 'vuex'

export default {
    components: { NavbarLoggedIn, RoomAvatar, RoomsList, Footer },
    computed: {
        ...mapGetters('auth', ['user']),
    },
}
</script>
