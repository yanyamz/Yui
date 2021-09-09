<template>
    <form @submit.prevent="handleSubmit">
        <div class="container">
            <div class="title">Login</div>

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input
                        v-model="email"
                        class="input is-primary"
                        type="email"
                        placeholder="iloveanime@gmail.com"
                    />
                </div>
            </div>
            <div class="field">
                <div class="label">Password</div>
                <div class="control">
                    <input v-model="password" class="input is-primary" type="password" />
                </div>
            </div>
            <button class="button is-primary my-2">Login</button>
            <p class="is-size-8">
                Need an account?
                <span @click="$emit('showSignup')" class="has-text-link is-clickable">Signup</span>
            </p>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    emits: ['showSignup'],

    data() {
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapGetters('auth', ['error']),
    },
    methods: {
        ...mapActions('auth', ['login']),
        async handleSubmit() {
            await this.login({ email: this.email, password: this.password })
            if (!this.error) {
                this.$emit('login')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    .field,
    button {
        width: clamp(22rem, 30%, 100%);
    }
}
</style>
