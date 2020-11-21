import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

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
  const email = useField("text");
  const password = useField("text");

  const onSubmit = (event) => {
    event.preventDefault();
    db.collection("users")
      .where("email", "==", email.value)
      .get()
      .then((users) => {
        users.docs.forEach((user) => {
          if (user.data().password === password.value) {
            console.log(user.data().name);
            setUser({ ...user.data(), id: user.id });
            history.push("/");
            return;
          }
        });
        alert("password or email is incorrect");
      });
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>
        <div>
          Email: <input {...email} />
        </div>
        <div>
          Password: <input {...password} />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
