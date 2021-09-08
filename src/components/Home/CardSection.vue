<template>
    <section class="section is-small">
        <div class="title is-size-2">
            Features
        </div>
        <div class="columns">
            <div class="column is-one-third">
                <div class="card">
                    <div class="card-header">
                        <p
                            class="card-header-title is-centered has-background-primary has-text-white"
                        >
                            Avatars
                        </p>
                    </div>
                    <div class="card-image has-text-centered">
                        <img
                            src="https://avatars.githubusercontent.com/u/89555647?v=4"
                            alt="image"
                        />
                    </div>
                    <p class="card-content has-text-centered">
                        Choose through a variety of avatars
                    </p>
                </div>
            </div>
            <div class="column is-one-third">
                <div class="card">
                    <div class="card-header">
                        <p
                            class="card-header-title is-centered has-background-primary has-text-white"
                        >
                            Rankings
                        </p>
                    </div>
                    <div class="card-image has-text-centered">
                        <img src="@/assets/svg/rankings.svg" alt="image" />
                    </div>
                    <p class="card-content has-text-centered">
                        Rank up as you play, and compete with friends
                    </p>
                </div>
            </div>
            <div class="column is-one-third">
                <div class="card">
                    <div class="card-header">
                        <p
                            class="card-header-title is-centered has-background-primary has-text-white"
                        >
                            Customize
                        </p>
                    </div>
                    <div class="card-image has-text-centered">
                        <img src="@/assets/svg/settings.svg" alt="image" />
                    </div>
                    <p class="card-content has-text-centered">
                        Customize the settings of the quiz just as you'd like
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

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
