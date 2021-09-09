import { ref } from '@vue/runtime-dom'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
    const error = ref(null)

    const addDoc = async (doc) => {
        error.value = null
        try {
            await projectFirestore.collection(collection).add(doc)
        } catch (err) {
            error.value = 'could not save'
        }
    }
    return { error, addDoc }
}

export default useCollection
