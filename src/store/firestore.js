import { projectFirestore } from '../firebase/config'

export default {
    namespaced: true,
    state: {},
    actions: {
        async deleteDocument(context, { collection, document }) {
            try {
                await projectFirestore
                    .collection(collection)
                    .doc(document)
                    .delete()
            } catch (err) {
                console.log('error removing document')
            }
        },
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
            try {
                await projectFirestore
                    .collection(collection)
                    .doc(document)
                    .set(newData)
            } catch (err) {
                console.log('failed to create or update doc')
            }
        },
        async updateField(context, { collection, document, field, newData }) {
            try {
                await projectFirestore
                    .collection(collection)
                    .doc(document)
                    .update({ [field]: newData })
            } catch (err) {
                console.log('failed to update field')
            }
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
