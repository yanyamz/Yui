<template>
    <div class="notification is-primary" ref="notification">
        <button @click="closeNotification" class="delete"></button>
        <slot></slot>
    </div>
</template>

<script>
export default {
    methods: {
        closeNotification() {
            this.$refs.notification.classList.add('is-hidden')
        },
    },
}
</script>
