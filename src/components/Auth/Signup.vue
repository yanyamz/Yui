<template>
    <error-message v-if="hasError">
        Email is taken or invade. OR Password is less than 6 characters
    </error-message>
    <form @submit.prevent="handleSubmit">
        <div class="container">
            <div class="title">Signup</div>
            <div class="field">
                <label class="label">Display Name</label>
                <div class="control">
                    <input
                        v-model="displayName"
                        class="input is-primary"
                        type="text"
                        placeholder="Goku"
                        ref="displayName"
                        maxlength="16"
                    />
                </div>
            </div>
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
                    <input
                        v-model="password"
                        class="input is-primary"
                        type="password"
                    />
                </div>
            </div>
            <button class="button is-primary my-2">Signup</button>
            <p class="is-size-8">
                Already have an account?
                <span
                    @click="$emit('showLogin')"
                    class="has-text-link is-clickable"
                    >Login</span
                >
            </p>
        </div>
    </form>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        emits: ['showLogin', 'signup'],
        data() {
            return {
                displayName: '',
                email: '',
                password: '',
                hasError: false,
            }
        },
        computed: {
            ...mapGetters('auth', ['error']),
            errorMessage() {
                return this.error == null
                    ? ''
                    : this.error.substring(10, this.error.length)
            },
        },
        methods: {
            ...mapActions('auth', ['signup']),
            ...mapActions(['isUniqueDisplayName']),
            async handleSubmit() {
                const isValid = await this.isUniqueDisplayName(this.displayName)
                if (!isValid) {
                    this.$refs.displayName.classList.add('is-danger')
                    return
                } else {
                    this.$refs.displayName.classList.remove('is-danger')
                }
                await this.signup({
                    email: this.email,
                    password: this.password,
                    displayName: this.displayName,
                })
                if (!this.error) {
                    this.$emit('signup')
                } else {
                    this.hasError = true
                    setTimeout(() => {
                        this.hasError = false
                    }, 4000)
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
