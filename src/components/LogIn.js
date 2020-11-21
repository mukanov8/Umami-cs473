import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
}))

const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    type,
    value,
    onChange,
  };
};

const Login = ({ setUser }) => {
  const classes = useStyles()
  const history = useHistory();
  const email = useField("email");
  const password = useField("password");

  const onSubmit = (event) => {
    event.preventDefault();
    db.collection("users")
      .where("email", "==", email.value)
      .get()
      .then((users) => {
        console.log("email", users.docs);
        const user = users.docs.find(
          (u) => u.data().password === password.value
        );
        console.log("user", user);
        if (user && user.length !== 0) {
          setUser({ ...user.data(), id: user.id });
          history.push("/");
        } else {
          alert("the password is incorrect");
        }
      });
  };

  return (
    // <div>
    //   <Title>Log In</Title>

    //   <form onSubmit={onSubmit}>
    //     <div>
    //       <TextField label="Email" {...email} />
    //       {/* Email: <input {...email} /> */}
    //     </div>
    //     <div>
    //       <TextField label="Password" {...password} />
    //       {/* // Password: <input {...password} /> */}
    //     </div>
    //     {/* <button type="submit">Log In</button> */}
    //     <Button variant="contained" color="primary" type="submit">
    //       Login
    //     </Button>
    //   </form>
    // </div>
    <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            { 'Log-In' }
          </Typography>
          <form className={classes.form} onSubmit={onSubmit} noValidate>
            <TextField 
              // onInput={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label='Email'
              name="email"
              autoComplete="email"
              autoFocus
              {...email}
            />
            <TextField {...password}
              // onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label='Password'
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {'Log-in'}
            </Button>
          </form>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/password_reset">
              {'forgot password'}?
            </Link>
            <Link to="/signup">
              {'sign up'}
            </Link>
          </div>
        </div>
      </Paper>
  );
};




export default Login;
