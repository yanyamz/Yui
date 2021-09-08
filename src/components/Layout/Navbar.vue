<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a @click="$emit('showSignup')" href="#auth" class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a @click="$emit('showLogin')" href="#auth" class="button is-light">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    emits: ['showLogin', 'showSignup'],
}
</script>

<style></style>
