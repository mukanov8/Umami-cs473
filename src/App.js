import React, { useState, useEffect } from "react";
// import noteService from './services/notes'
// import "./index.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserInfo from "./components/UserInformation";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import AddExercise from "./components/AddExercise";
import AddTrainee from "./components/AddTrainee";
import Feed from "./components/Feed";
import About from "./components/About";
import Notification from "./components/Notification";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Appbar from "./components/Appbar";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const Cont = styled(Container)`
  ${"" /* max-width: 50%;
  width: 50%; */}
  ${"" /* color: palevioletred; */}
  ${"" /* font-color: yellow; */}
  ${"" /* font-size: 5em; */}
  ${"" /* margin: 1em; */}
  ${"" /* padding: 0.25em 1em; */}
  ${"" /* border: 10px solid palevioletred; */}
  ${"" /* border-radius: 3px; */}
`;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  // title: {
  //   flexGrow: 1,
  // },
}));


const App = () => {
  const [user, setUser] = useState();
  const classes = useStyles();
  const padding = {
    padding: 5,
  };

  return (
    <Box style={ {display: 'flex'} }>
    <Box className={classes.root}>
    <Appbar/>
    <Cont>
      <Router>
        <Box style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
          <Link style={padding} to="/">
            Feed
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <Link style={padding} to="/userinfo">
            userinfo
          </Link>
          <Link style={padding} to="/createpost">
            createpost
          </Link>
          <Link style={padding} to="/profile">
            profile
          </Link>
          <Link style={padding} to="/calendar">
            calendar
          </Link>
          <Link style={padding} to="/addexercise">
            addexercise
          </Link>
          <Link style={padding} to="/addtrainee">
            addtrainee
          </Link>
          <Link style={padding} to="/about">
            about
          </Link>
          {user ? (
            <>
              <em>{user.name} logged-in</em>
              <button onClick={() => setUser()}>Log out</button>
              <Notification />
            </>
          ) : (
            <>
              <Link style={padding} to="/login">
                login
              </Link>
              <Link style={padding} to="/signup">
                signup
              </Link>
            </>
          )}
        </Box>
        <Switch>
          <Route path="/users">
            <h2>Users should be here</h2>
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/signup">
            <SignUp setUser={setUser} />
          </Route>
          <Route path="/userinfo">
            {user ? (
              <UserInfo user={user} setUser={setUser} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/profile">
            {user ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/createpost">
            {user ? <CreatePost user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/calendar">
            {user ? <Calendar user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/addexercise">
            {user ? <AddExercise user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/addtrainee">
            {user ? (
              <AddTrainee user={user} setUser={setUser} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">{user ? <Feed /> : <Redirect to="/login" />}</Route>
        </Switch>

        {/* <div>
        <i>Umami, Department of Computer Science 2020</i>
      </div> */}
      </Router>
    </Cont>
    </Box>
    </Box>
  );
};

export default App;
