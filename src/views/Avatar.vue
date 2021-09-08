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
                            src="https://avatars.githubusercontent.com/u/89555647?v=4"
                            alt="image"
                        />
                    </div>
                    <div
                        class="card-content has-text-centered is-flex is-justify-content-space-between"
                    >
                        <i
                            class="fas fa-arrow-left has-text-primary is-pulled-left p-1 is-size-4 is-clickable"
                        ></i>
                        <i
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
                            src="https://avatars.githubusercontent.com/u/89555647?v=4"
                            alt="image"
                        />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title is-centered has-background-primary-light">
                            Happy
                        </p>
                    </div>
                    <div class="card-image has-text-centered">
                        <img
                            src="https://avatars.githubusercontent.com/u/89555647?v=4"
                            alt="image"
                        />
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title is-centered has-background-primary-light">
                            Sad
                        </p>
                    </div>
                    <div class="card-image has-text-centered">
                        <img
                            src="https://avatars.githubusercontent.com/u/89555647?v=4"
                            alt="image"
                        />
                    </div>
                </div>
            </div>
        </div>
        <button class="button is-primary">Save and Close</button>
    </div>
</template>

<script>
import NavbarLoggedIn from '@/components/Layout/NavbarLoggedIn'

export default {
    components: {
        NavbarLoggedIn,
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
