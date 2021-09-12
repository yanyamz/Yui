<template>
    <h1>Game</h1>
    <div class="card p-3 has-background-white">
        <div class="block is-flex is-justify-content-space-between">
            <router-link @click="checkIfHost" class to="/rooms">
                <div class="button is-danger">Leave</div>
            </router-link>
        </div>
        <h3 class="block">{{ time }}</h3>
        <div class="buttons">
            <button class="button">start</button>
            <button class="button">stop</button>
        </div>
        <div class="game block">
            <input type="range" class="game__volume is-primary" />
            <div class="game__videoplayer block">
                <h1>blah</h1>
            </div>
            <input
                class="input is-primary"
                :class="{
                    'is-success': isCorrect,
                    'is-danger': isWrong,
                }"
                type="text"
                placeholder="Primary input"
            />
        </div>
        <div class="grid block">
            <div
                v-for="user in users"
                :key="user.displayName"
                class="user"
                :class="{
                    'has-background-success': isCorrect,
                    'has-background-danger': isWrong,
                }"
            >
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
                <p class="user__name is-size-5">{{ user.displayName }}</p>
                <img
                    v-if="user.displayName == host"
                    class="user__crown"
                    :src="require(`@/assets/svg/crown.png`)"
                    alt=""
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { projectFirestore } from '@/firebase/config.js'

export default {
    props: ['id'],
    data() {
        return {
            users: [],
            unsubRoomChanges: null,
            time: 0,
            isCorrect: false,
            isWrong: false,
        }
    },
    async created() {
        window.addEventListener('beforeunload', (event) => {
            // Cancel the event as stated by the standard.
            this.checkIfHost()
            event.preventDefault()
            // Chrome requires returnValue to be set.
            event.returnValue = ''
        })
    },
    async mounted() {
        document.title = 'Yui - Game'

        this.unsubRoomChanges = projectFirestore
            .collection('rooms')
            .doc(this.host)
            .onSnapshot(async (snapshot) => {
                this.roomData = await snapshot.data()
                if (!this.roomData) {
                    this.$router.push('/rooms')
                }
                if (this.roomData.isInSession === true) {
                    this.$router.push(`/game/${this.roomName}+${this.host}`)
                }
                this.users = this.roomData.users
            })
    },
    async unmounted() {
        this.unsubRoomChanges?.()
    },
    computed: {
        ...mapGetters('avatar', ['avatars']),
        ...mapGetters('userPreferences', ['avatarIndex', 'userPreferences']),
        roomName() {
            return this.id.substring(0, this.id.indexOf('+'))
        },
        host() {
            return this.id.substring(this.id.indexOf('+') + 1, this.id.length)
        },
    },
    methods: {
        ...mapActions('rooms', [
            'loadRoom',
            'removeUserFromRoom',
            'deleteRoom',
            'setRoomInSession',
        ]),
        getAvatar(number) {
            return this.avatars[number % this.avatars.length]
        },
        async checkIfHost() {
            if (this.host === this.userPreferences.displayName) {
                await this.deleteRoom(this.host)
                return
            }
            await this.removeUserFromRoom({
                user: this.userPreferences,
                host: this.host,
            })
        },
        answerCorrect() {},
    },
}
</script>

<style lang="scss" scoped>
.game {
    &__videoplayer {
        width: 100%;
        height: 25rem;
        background: grey;
    }
}

.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    overflow: auto;
    max-height: 10rem;
}
.user {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
    &__crown {
        width: 2rem;
    }
    &__name {
        align-self: center;
        margin-left: 1rem;
    }
}
</style>
