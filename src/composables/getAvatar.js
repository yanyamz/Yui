import { ref } from 'vue'

const avatars = ref(['yui', 'bunny', 'rumia', 'michi', 'akari'])
const currentIndex = ref(0)

const getAvatar = () => {
    return { avatar: avatars.value[Math.abs(currentIndex.value % avatars.value.length)] }
}

const modifyIndex = (operation) => {
    return operation == 'subtract' ? --currentIndex.value : ++currentIndex.value
}

export default { getAvatar, modifyIndex }
