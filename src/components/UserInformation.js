import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const UserInformation = ({ user, setUser }) => {
  if (user == null) {
    return <h1> Not logged in</h1>;
  }
  // const [formValue, setFormValue] = useState({ name: "", email: "" });

  const exercises = ["squats", "deadlifts", "pull-ups"];
  const levelOfExpertise = ["Home training", "Sports", "Gym Training"];
  const ExerciseGoal = ["Weight loss", "Weight gain", "Muscle gain"];
  const name = "Mike";
  const email = "Mike@gmail.com";
  const password = "******";

  function onUpdate() {}

  return (
    <div>
      <h1>User Information</h1>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Password: {password}</div>
      <div>
        Date of birth: <input />
      </div>
      <div>
        Gender:
        <div onChange={onUpdate()}>
          <input type="radio" value="MALE" name="gender" /> Male
          <input type="radio" value="FEMALE" name="gender" /> Female
        </div>
      </div>
      <div>
        Level of Expertise:
        {levelOfExpertise.map((exercise) => (
          <div>
            {" "}
            <input type="radio" value={exercise} name="expertise" /> {exercise}
          </div>
        ))}
      </div>
      <div>
        Exercise Goal:
        {ExerciseGoal.map((exercise) => (
          <div>
            {" "}
            <input type="radio" value={exercise} name="exercise-goal" />{" "}
            {exercise}
          </div>
        ))}
      </div>
      <div>
        <div>Preferred Exercise Types:</div>
        {exercises.map((exercise) => (
          <div>
            {" "}
            <input type="checkbox" /> {exercise}
          </div>
        ))}
      </div>
      <button onClick={onUpdate()}>Update</button>
    </div>
  );
};

export default UserInformation;
