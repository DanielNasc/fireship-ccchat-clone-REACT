import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import {auth} from './service/firebase'
import { SignIn, SignOut } from './components/Auth'
import { Chat } from './components/Chat'


import './App.css';

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



export default App;
