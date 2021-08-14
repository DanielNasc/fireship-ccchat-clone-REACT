import React, { useState } from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import './App.css';

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

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Epic ccchat</h1>
        {user? <SignOut/>: null}
      </header>

      <section> 
        {user? <Chat/>:<SignIn/>}
      </section>
    </div>
  );
}

function SignIn(){
  const SignInWithGoogle = ()=> {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={SignInWithGoogle}> Entre com o Google </button>
  )

}

function SignOut(){
  return auth.currentUser && (
    <button onClick={()=>{auth.signOut()}}> Sign Out </button>
  )
}

function Chat(){
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: "id"})

  const [formValue, SetFormValue] = useState('')

  const sendMessage = async(e)=>{
    e.preventDefault()

    const {uid, photoURL} = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid, photoURL
    })

    SetFormValue('')
  }

  return (
    <>
      <main>
        {messages && messages.map(m => <Message key= {m.id} message= {m} />)}
        
      </main>

      <form onSubmit = {sendMessage} >
        <input 
        type="text"
        value = {formValue}
        onChange = {
          e => SetFormValue(e.target.value)
        }
        />
        <button 
        type="submit"
        disabled = {!(formValue.trim().length > 0)}
        >Submit</button>
      </form>
    </>
  )
}


function Message(props)
{
  const {text, uid, photoURL} = props.message

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received"

  return (
    <div className= {`message ${messageClass}`} >
      <img src={photoURL} alt="User Avatar" />
      <p>{text}</p>
    </div>
  )
}

export default App;
