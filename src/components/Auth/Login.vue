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
import { ref } from '@vue/reactivity'
import useLogin from '@/composables/useLogin'

export default {
    emits: ['showSignup'],
    setup(props, context) {
        const email = ref('')
        const password = ref('')
        const { error, login } = useLogin()
        const handleSubmit = async () => {
            await login(email.value, password.value)
            if (!error.value) {
                context.emit('login')
            }
        }
        return { email, password, handleSubmit }
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
