import React, { useState } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
  },
}));

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

const SignUp = ({ setUser }) => {
  const classes = useStyles();
  const name = useField("text");
  const email = useField("text");
  const password = useField("password");
  const password2 = useField("password");
  const history = useHistory();

  const addUser = (event) => {
    event.preventDefault();
    if (password.value !== password2.value) {
      alert("Passwords are not the same");
      return;
    }
    const obj = {
      name: name.value,
      password: password.value,
      email: email.value,
      trainees: [],
      gender: "",
      levelOfExpertise: "",
      exerciseGoal: "",
      preferredExercises: { squats: false, deadlifts: false, pullups: false },
    };
    db.collection("users")
      .add(obj)
      .then((user) => {
        user.get().then((u) => {
          console.log(u.data());
          setUser({ ...u.data(), id: u.id });
          history.push("/");
        });
      });
  };

  return (
    // <div>
    //   <h1>Sign Up</h1>
    //   <form onSubmit={addUser}>
    //     <div>
    //       Name: <input {...name} />
    //     </div>
    //     <div>
    //       Email: <input {...email} />
    //     </div>
    //     <div>
    //       Password: <input {...password} />
    //     </div>
    //     <div>
    //       Repeat Password: <input {...password2} />
    //     </div>
    //     <button type="submit">Sign Up</button>
    //   </form>
    //   <h2> Passowrds should be checked for equality by the UI</h2>
    // </div>

    <Paper className={classes.paper} elevation={6}>
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          {"Sign up"}
        </Typography>
        <form className={classes.form} onSubmit={addUser} noValidate>
          <TextField
            {...name}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={"Username"}
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            {...email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={"E-Mail"}
            name="email"
            autoComplete="email"
          />
          <TextField
            {...password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={"Password"}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            {...password2}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirm"
            label={"Confirm Password"}
            type="password"
            id="password_confirm"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {"Sign up"}
          </Button>
        </form>
      </div>
    </Paper>
  );
};

export default SignUp;
