import React, { useState } from "react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

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
        });
      });

    history.push("/");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={addUser}>
        <div>
          Name: <input {...name} />
        </div>
        <div>
          Email: <input {...email} />
        </div>
        <div>
          Password: <input {...password} />
        </div>
        <div>
          Repeat Password: <input {...password2} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <h2> Passowrds should be checked for equality by the UI</h2>
    </div>
  );
};

export default SignUp;
