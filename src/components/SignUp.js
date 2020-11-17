import React, { useState } from 'react'
import {db} from '../firebase'
import {
  useHistory
} from "react-router-dom"


const SignUp = ({setUser}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const history = useHistory();
  const handleNameChange = (event) =>{
    setName(event.target.value);
  }
  const handleEmailChange = (event) =>{
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) =>{
    setPassword(event.target.value);
  }
  const handlePasswordChange2 = (event) =>{
    setPassword2(event.target.value);
  }

  
  const addUser = (event)=>{
    event.preventDefault()
    if (password!==password2){
      alert("Passwords are not the same");
      return
    }
    db.collection('users').add({name,password,email}).then(user=>{
      user.get().then(u=>{
        console.log(u.data())
        setUser({...u.data(),id:u.id})
      })
    });
    
    history.push('/login');
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={addUser}> 
        <div>
        Name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
        Email: <input value={email} onChange={handleEmailChange} />
        </div>
        <div>
        Password: <input value={password} onChange={handlePasswordChange} />
        </div>
        <div>
        Repeat Password: <input value={password2} onChange={handlePasswordChange2} />
        </div>
        <button  type="submit">Sign Up</button>
      </form>
      <h2>Needs to show that the registration was successful</h2>
      <h2> Passowrds should be checked for equality by the UI</h2>
    </div>
  )
}

export default SignUp;
