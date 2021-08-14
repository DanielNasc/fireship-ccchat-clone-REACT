import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCEfQmQ-PgBChFrZ3NStp9y-Slsec9xURI",
    authDomain: "fireship-ccchat.firebaseapp.com",
    projectId: "fireship-ccchat",
    storageBucket: "fireship-ccchat.appspot.com",
    messagingSenderId: "1057104563987",
    appId: "1:1057104563987:web:a1e5f964fab6999208d4e6"
  }

if (!firebase.apps.length) firebase.initializeApp(config)
else firebase.app()

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// module.exports = {auth, firestore, firebase}