import React, { useState } from 'react'
import {db, storage} from '../firebase'

const useField = (type)=>{
  const val = (type==='bool')?true:''
  const [value,setValue] = useState(val)
  const onChange =(event)=>{
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const CreatePost = () => {
  const videoLink = useField('file');
  const caption = useField('text');
  const exercise = useField('text');
  const blur = useField('bool');
  const publicBool = useField('bool')
  console.log(videoLink.value)

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log("submit")
    storage.ref().child('posts.jpg').put(videoLink.value).then(snapshot =>{
      console.log("it worked", snapshot)
    })
  }

  return (
    <div>
      <h1>Compose</h1>
      <div>
      videoLink: <input {...videoLink} alt="select your video here"/>
      </div>
      <div>
      Write your caption here:<input {...caption} />
      </div>
      <div>
      Choose your exercise: <input {...exercise}/>
      </div>
      <div>
      Blur? <input {...blur}/>
      </div>
      <div>
      Who can see your posts: <input {...publicBool}/>
      </div>
      
      <button onClick={handleSubmit}>Post</button>
    </div>
    
  )
}

export default CreatePost;
