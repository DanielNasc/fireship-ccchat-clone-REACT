import firebase from 'firebase/app'
import { useRef, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, firestore} from '../service/firebase'
import {Message} from './Message'

export function Chat(){
    const messagesRef = firestore.collection('messages')
    const query = messagesRef.orderBy('createdAt').limit(25)
  
    const [messages] = useCollectionData(query, {idField: "id"})
  
    const [formValue, SetFormValue] = useState('')
  
    const dummy = useRef()
  
    const sendMessage = async(e)=>{
      e.preventDefault()
  
      const {uid, photoURL} = auth.currentUser
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid, photoURL
      })
  
      SetFormValue('')
      dummy.current.scrollIntoView({behavior: 'smooth'})
    }
  
    return (
      <>
        <main>
          {messages && messages.map(m => <Message key= {m.id} message= {m} />)}
          
          <span ref={dummy}></span>
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