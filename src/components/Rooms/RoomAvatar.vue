<template>
    <div class="column is-one-quarter">
        <div class="card">
            <div class="card-header">
                <p class="card-header-title is-centered has-background-primary-light">
                    Current Avatar
                </p>
            </div>
            <div class="card-image has-text-centered">
                <img :src="require(`@/assets/images/avatars/${avatar}_neutral.png`)" alt="image" />
            </div>
            <div class="card-content has-text-centered">
                <router-link :to="{ name: 'Avatar' }">
                    <a class="button is-primary">Customize</a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['avatar']),
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
