import { projectFirestore } from '../firebase/config'

export default {
    namespaced: true,
    state: {},
    actions: {
        async loadDocument(context, { collection, document }) {
            try {
                const res = await projectFirestore
                    .collection(collection)
                    .doc(document)
                    .get()
                return res.data()
            } catch (err) {
                console.log(err)
            }
        },
        async updateDocument(context, { collection, document, newData }) {
            await projectFirestore
                .collection(collection)
                .doc(document)
                .set(newData)
        },
        async loadCollection(context, collection) {
            try {
                const res = await projectFirestore.collection(collection).get()
                return res.docs
            } catch (err) {
                console.log(err)
            }
        },
    },
}
