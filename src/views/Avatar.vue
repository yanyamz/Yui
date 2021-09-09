<template>
    <div class="container">
        <NavbarLoggedIn />
        <router-link :to="{ name: 'Rooms' }">
            <div class="fas fa-arrow-circle-left p-4 is-size-3 has-text-primary is-clickable"></div>
        </router-link>
        <div class="columns">
            <div class="column is-3">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title is-centered has-background-primary-light">
                            Current Avatar
                        </p>
                    </div>
                    <div class="card-image has-text-centered">
                        <img
                            :src="require(`@/assets/images/avatars/${tempAvatar}_neutral.png`)"
                            alt="image"
                        />
                    </div>
                    <div
                        class="card-content has-text-centered is-flex is-justify-content-space-between"
                    >
                        <i
                            @click="modifyIndex('subtract')"
                            class="fas fa-arrow-left has-text-primary is-pulled-left p-1 is-size-4 is-clickable"
                        ></i>
                        <i
                            @click="modifyIndex('add')"
                            class="fas fa-arrow-right has-text-primary is-pulled-right p-1 is-size-4 is-clickable"
                        ></i>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title is-centered has-background-primary-light">
                            Neutral
                        </p>
                    </div>
                    <div class="card-image has-text-centered">
                        <img
                            :src="require(`@/assets/images/avatars/${tempAvatar}_neutral.png`)"
                            alt="image"
                        />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title is-centered has-background-primary-light">
                            Positive Emotion
                        </p>
                    </div>
                    <div class="card-image has-text-centered">
                        <img
                            :src="require(`@/assets/images/avatars/${tempAvatar}_positive.png`)"
                            alt="image"
                        />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title is-centered has-background-primary-light">
                            Negative Emotion
                        </p>
                    </div>
                    <div class="card-image has-text-centered">
                        <img
                            :src="require(`@/assets/images/avatars/${tempAvatar}_negative.png`)"
                            alt="image"
                        />
                    </div>
                </div>
            </div>
        </div>

        <button
            @click="saveAvatarState(), $router.push({ name: 'Rooms' })"
            class="button is-primary"
        >
            Save and Close
        </button>
    </div>
</template>

<script>
import NavbarLoggedIn from '@/components/Layout/NavbarLoggedIn'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    unmounted() {
        this.resetTempAvatarIndex()
    },
    components: {
        NavbarLoggedIn,
    },
    computed: {
        ...mapGetters('user', ['tempAvatar']),
    },
    methods: {
        ...mapActions('user', ['modifyIndex']),
        ...mapMutations('user', ['resetTempAvatarIndex', 'saveAvatarState']),
    },
}
</script>

<style lang="scss" scoped>
.card {
    &-image {
        height: 12rem;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
        }
    }
}
</style>
