<template>
    <div class="column">
        <div class="card">
            <table class="table block">
                <thead>
                    <th>Room</th>
                    <th>Host</th>
                    <th>Settings</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="room in rooms" :key="room.id">
                        <th>{{ room.number }}</th>
                        <td>{{ room.host }}</td>
                        <th>{{ room.settings }}</th>
                        <th><a class="has-text-link">Join</a></th>
                    </tr>
                </tbody>
            </table>
            <div class="button is-primary block">Create Room</div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        const rooms = ref([
            { number: 1, host: 'bleh', settings: 'normal' },
            { number: 2, host: 'Ant', settings: 'custom' },
            { number: 3, host: 'Lewlew', settings: 'normal' },
            { number: 4, host: 'bleh', settings: 'normal' },
        ])
        return { rooms }
    },
}
</script>

<style lang="scss" scoped>
.card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
}
</style>
