<template>
    <div class="card p-3 has-background-white">
        <div class="block is-flex is-justify-content-space-between">
            <router-link
                @click="removeUserFromRoom(host), deleteRoom(host)"
                class
                to="/rooms"
            >
                <div class="button is-danger">Leave</div>
            </router-link>
            <p class="title">{{ roomName }}</p>
        </div>

        <div class="grid block">
            <div v-for="user in users" :key="user.username" class="user">
                <figure class="user__image image">
                    <img
                        class="is-rounded"
                        :src="
                            require(`@/assets/images/avatars/${getAvatar(
                                user.avatar
                            ) ?? 'yui'}_neutral.png`)
                        "
                    />
                </figure>
                <p class="user__name is-size-5">{{ user.username }}</p>
            </div>
        </div>
        <button class="block my-button button is-centered is-success">
            Start Game
        </button>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { projectFirestore } from '@/firebase/config'

    export default {
        props: ['id'],
        async mounted() {
            await this.addUserToRoom(this.host)
            this.roomData = await this.loadRoom(this.host)
            this.users = this.roomData.users
            projectFirestore.collection('rooms').onSnapshot(async () => {
                console.log('snapshot 2')
                this.roomData = await this.loadRoom(this.host)
                this.users = this.roomData.users
            })
        },
        data() {
            return {
                roomData: [],
                users: [],
            }
        },
        computed: {
            ...mapGetters('avatar', ['avatars']),
            ...mapGetters('userPreferences', ['avatarIndex']),
            roomName() {
                return this.id.substring(0, this.id.indexOf('+'))
            },
            host() {
                return this.id.substring(
                    this.id.indexOf('+') + 1,
                    this.id.length
                )
            },
        },
        methods: {
            ...mapActions('rooms', [
                'loadRoom',
                'addUserToRoom',
                'removeUserFromRoom',
                'deleteRoom',
            ]),
            getAvatar(number) {
                return this.avatars[number % this.avatars.length]
            },
        },
    }
</script>

<style lang="scss" scoped>
    .grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .user {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px 0 rgba(0, 0, 0, 0.06);
        border-radius: 5px;
        flex: 1 1;
        flex-basis: 30%;
        min-width: 250px;
        background: white;
        display: flex;
        align-items: center;
        padding: 1rem;
        &__image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            img {
                object-fit: cover;
                object-position: center;
            }
        }
        &__name {
            align-self: center;
            margin-left: 1rem;
        }
    }
</style>
