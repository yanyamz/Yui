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
import getUser from '@/composables/getUser'
import NavbarLoggedIn from '@/components/Layout/NavbarLoggedIn.vue'
import RoomsList from '@/components/Rooms/RoomsList'
import RoomAvatar from '@/components/Rooms/RoomAvatar.vue'
import Footer from '@/components/Layout/Footer'

export default {
    components: { NavbarLoggedIn, RoomAvatar, RoomsList, Footer },
    setup() {
        const { user } = getUser()
        return { user }
    },
}
</script>
