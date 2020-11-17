import React, { useState } from 'react'
import {
  useHistory
} from 'react-router-dom'
import {db} from '../firebase'

const Login = ({setUser}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleEmailChange = (event) =>{
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) =>{
    setPassword(event.target.value);
  }

  
  const onSubmit = (event) => {
    event.preventDefault()
    db.collection('users').where('email','==',email).get().then((users)=>{
      users.docs.forEach(user=>{
        if(user.data().password===password){
          console.log(user.data().name)
          setUser({...user.data(),id:user.id})
          history.push('/')
          return
        }
      })
      alert('password or email is incorrect')
    })
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={onSubmit}> 
        <div>
        Email: <input value={email} onChange={handleEmailChange} />
        </div>
        <div>
        Password: <input value={password} onChange={handlePasswordChange} />
        </div>
        <button  type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login;
