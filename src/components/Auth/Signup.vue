<template>
    <div class="container">
        <div class="title">Signup</div>

        <div class="field">
            <label class="label">Display Name</label>
            <div class="control">
                <input class="input is-primary" type="text" placeholder="Goku" />
            </div>
        </div>
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
        <button class="button is-primary my-2">Signup</button>
        <p class="is-size-8">
            Already have an account? <span class="has-text-link is-clickable">Login</span>
        </p>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .field,
    button {
        width: clamp(22rem, 80%, 100%);
    }
}
</style>
