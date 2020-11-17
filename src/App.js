import React, { useState, useEffect } from 'react'
// import noteService from './services/notes'
import './index.css'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import UserInfo from './components/UserInformation'
import CreatePost from './components/CreatePost'
import Profile from './components/Profile'
import Calendar from './components/Calendar'
import AddExercise from './components/AddExercise'
import AddTrainee from './components/AddTrainee'
import Feed from './components/Feed'


const App = () => {
  const [user, setUser] = useState();

  const padding = {
    padding: 5
  }


  return (
    <Router>
      <div>
      <Link style={padding} to="/">Feed</Link>
      <Link style={padding} to="/users">users</Link>
      <Link style={padding} to="/info">UserInfo</Link>
      <Link style={padding} to="/createpost">createpost</Link>
      <Link style={padding} to="/profile">profile</Link>
      <Link style={padding} to="/calendar">calendar</Link>
      <Link style={padding} to="/addexercise">addexercise</Link>
      <Link style={padding} to="/addtrainee">addTrainee</Link>
      {user
      ? <em>{user.name} logged in</em>
      : <><Link style={padding} to="/login">login</Link>
        <Link style={padding} to="/signup">signup</Link></>
    }
      </div>
      <Switch>
        <Route path="/users">
          <h2>Users should be here</h2>
        </Route>
        <Route path="/login">
        <LogIn setUser={setUser}/>
        </Route>
        <Route path="/signup">
        <SignUp setUser={setUser} />
        </Route>
        <Route path="/info">
        <UserInfo/>
        </Route>
        <Route path="/profile">
        <Profile/>
        </Route>
        <Route path="/createpost">
        <CreatePost/>
        </Route>
        <Route path="/calendar">
        <Calendar/>
        </Route>
        <Route path="/addexercise">
        <AddExercise/>
        </Route>
        <Route path="/addtrainee">
        <AddTrainee user={user}/>
        </Route>
        <Route path="/">
        <Feed/>
        </Route>
      </Switch>

      <div>
        <i>Umami, Department of Computer Science 2020</i>
      </div>
    </Router>
  )
}

export default App