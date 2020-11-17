import React, { useState, useEffect } from 'react'
import {db} from '../firebase'

const AddTrainee = () => {
  const [users, setUsers] = useState();

  useEffect(()=>{
    db.collection('users').get().then(users=>{
      setUsers(users.docs.map(user=>({...user.data(),id:user.id})))
    })
  },[])

  return (
    <div>
      <h1>Add Trainees</h1>
      <ul>
        { users ? users.map(user=>(<li key={user.id}>{user.name}</li>))
                : <></>
        }
      </ul>
      
      </div>
  )
}

export default AddTrainee;
