<template>
    <div class="card">
        <div class="card-header has-background-light is-size-4">
            <div class="card-header-title">New Room</div>
        </div>
        <div class="card-content">
            <div class="field">
                <div class="control">
                    <div class="label">Room Name</div>
                    <input
                        v-model.trim="roomName"
                        id="room-name"
                        type="text"
                        maxlength="16"
                        class="input is-primary block"
                    />
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <div class="label">Difficulty</div>
                    <div class="select is-primary">
                        <select v-model="difficulty">
                            <option value="easy">Easy</option>
                        </select>
                    </div>
                </div>
            </div>
            <error-message v-if="!isValid">
                Invalid options, please check that you have valid settings.
            </error-message>
            <div class="buttons">
                <button @click="validate" class="button is-primary">
                    Create
                </button>
                <button
                    @click="$emit('toggleActive')"
                    class="button is-primary"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    emits: ['toggleActive'],
    data() {
        return {
            roomName: '',
            difficulty: null,
            isValid: true,
        }
    },
    computed: {
        ...mapGetters('userPreferences', ['displayName']),
    },
    methods: {
        ...mapActions('rooms', ['createRoom']),
        async validate() {
            if (this.difficulty == null || this.roomName == '') {
                this.isValid = false
            }
            if (this.isValid) {
                this.$emit('toggleActive')
                this.createRoom({
                    name: this.roomName,
                    difficulty: this.difficulty,
                    host: this.displayName,
                })
            }
            setTimeout(() => {
                this.isValid = true
            }, 3000)
        },
    },
}
</script>
