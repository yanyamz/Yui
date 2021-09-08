<template>
    <div class="column is-one-quarter">
        <div class="card">
            <div class="card-header">
                <p class="card-header-title is-centered has-background-primary-light">
                    Current Avatar
                </p>
            </div>
            <div class="card-image has-text-centered">
                <img src="https://avatars.githubusercontent.com/u/89555647?v=4" alt="image" />
            </div>
            <div class="card-content has-text-centered">
                <a class="button is-primary">Customize</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
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
