<template>
    <div class="container">
        <div class="title">Login</div>
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input class="input is-primary" type="email" placeholder="iloveanime@gmail.com" />
            </div>
        </div>
        <div class="field">
            <div class="label">Password</div>
            <div class="control">
                <input class="input is-primary" type="password" />
            </div>
        </div>
        <button class="button is-primary my-2">Login</button>
        <p class="is-size-8">
            Need an account? <span class="has-text-link is-clickable">Signup</span>
        </p>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    .field,
    button {
        width: clamp(22rem, 80%, 100%);
    }
}
</style>
