<template>
    <teleport to="#app">
        <div class="modal" :class="{ 'is-active': isActive }">
            <div @click="toggleIsActive" class="modal-background"></div>
            <div class="modal-content">
                <RoomsCreate @toggleActive="toggleIsActive" />
            </div>
            <button
                @click="toggleIsActive"
                class="modal-close is-large"
                aria-label="close"
            ></button>
        </div>
    </teleport>
    <div class="column">
        <div class="card">
            <table class="table block">
                <thead>
                    <th>Room</th>
                    <th>Host</th>
                    <th>Difficulty</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="room in rooms" :key="room.id">
                        <td>{{ room.name }}</td>
                        <td>{{ room.host.displayName }}</td>
                        <td>{{ room.difficulty }}</td>
                        <th>
                            <router-link
                                :to="`/lobby/${room.name}+${room.host}`"
                                class="has-text-link"
                                >Join</router-link
                            >
                        </th>
                    </tr>
                </tbody>
            </table>
            <div @click="toggleIsActive" class="button is-primary block">
                Create Room
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import RoomsCreate from '@/components/Rooms/RoomsCreate'

    export default {
        components: {
            RoomsCreate,
        },
        data() {
            return {
                isActive: false,
            }
        },
        computed: {
            ...mapGetters('rooms', ['rooms']),
        },
        methods: {
            toggleIsActive() {
                this.isActive = !this.isActive
            },
        },
    }
</script>

<style lang="scss" scoped>
    .column {
        .card {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1.5rem;
        }
    }

    .delete {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
</style>
