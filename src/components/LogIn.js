import React, { useState } from 'react'



const App = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) =>{
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) =>{
    setPassword(event.target.value);
  }

  
  const addContact = (event)=>{
    event.preventDefault()

  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={addContact}> 
        <div>
        <input value={email} onChange={handleEmailChange} />
        </div>
        <div>
        <input value={password} onChange={handlePasswordChange} />
        </div>
        <button  type="submit">Log In</button>
      </form>
      <div>
        <p>Frontend - checks email validity, sends email and password to backend</p>
        <p>Backend - checks whether the email and password are correct. If correct sends key(smth) to log in</p>
      </div>
    </div>
  )
}

export default App;
