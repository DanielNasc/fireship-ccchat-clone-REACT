import { auth} from '../service/firebase'

export function Message(props)
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