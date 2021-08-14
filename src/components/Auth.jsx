import firebase from 'firebase/app'
import { auth } from '../service/firebase'

export function SignIn(){
    const SignInWithGoogle = ()=> {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
    }
  
    return (
      <button onClick={SignInWithGoogle}> Entre com o Google </button>
    )
  
  }
  
export function SignOut(){
    return auth.currentUser && (
      <button onClick={()=>{auth.signOut()}}> Sign Out </button>
    )
  }