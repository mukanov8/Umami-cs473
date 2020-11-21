import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

// const 
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;

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
    <div>
      <Title>Log In</Title>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="Email" {...email} />
          {/* Email: <input {...email} /> */}
        </div>
        <div>
          <TextField label="Password" {...password} />
          {/* // Password: <input {...password} /> */}
        </div>
        {/* <button type="submit">Log In</button> */}
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
