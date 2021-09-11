import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDY1WHI3yvov2Nrzz9cJAzR8hnm7Q0PNrE',
    authDomain: 'anime-openings-c9315.firebaseapp.com',
    projectId: 'anime-openings-c9315',
    storageBucket: 'anime-openings-c9315.appspot.com',
    messagingSenderId: '984741438932',
    appId: '1:984741438932:web:37959989e5e331572be241',
    measurementId: 'G-640LZCJRE6',
}

firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp, firebase }
