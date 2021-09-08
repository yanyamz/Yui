<template>
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
                    <input v-model="password" class="input is-primary" type="password" />
                </div>
            </div>
            <button class="button is-primary my-2">Signup</button>
            <p class="is-size-8">
                Already have an account?
                <span @click="$emit('showLogin')" class="has-text-link is-clickable">Login</span>
            </p>
        </div>
    </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import useSignup from '@/composables/useSignup'

export default {
    emits: ['showLogin'],
    setup(props, context) {
        const { error, signup } = useSignup()
        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            await signup(email.value, password.value, displayName.value)
            if (!error.value) {
                context.emit('signup')
            }
        }

        const errorMessage = computed(() => {
            return error.value == null ? '' : error.value.substring(10, error.length)
        })
        return { email, displayName, password, handleSubmit, errorMessage }
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
