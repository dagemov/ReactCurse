import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCUDiCWOk66LdJTDitvZOi6ojjrSAKpWIo",
    authDomain: "crud-ef97b.firebaseapp.com",
    projectId: "crud-ef97b",
    storageBucket: "crud-ef97b.appspot.com",
    messagingSenderId: "176738347423",
    appId: "1:176738347423:web:96796c5b93f4fcc27175aa"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
  